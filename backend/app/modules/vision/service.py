import shutil
import time
from collections import Counter
from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status
from PIL import Image, UnidentifiedImageError

from app.core.config import Settings, get_settings
from app.modules.vision.label_mapper import LabelMapper
from app.modules.vision.schemas import (
    DebugDetection,
    IngredientDetectionResponse,
    IngredientResult,
    VisionDebug,
)
from app.modules.vision.yolo_model import ModelLoadError, get_model, inspect_class_names

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp", "image/bmp"}
NO_DETECTIONS_GUIDANCE = "No ingredients detected. Please try another photo or add ingredients manually."


def _completed_message(image_count: int, ingredient_count: int) -> str:
    image_label = "image" if image_count == 1 else "images"
    ingredient_label = "ingredient" if ingredient_count == 1 else "ingredients"
    return f"Scan completed. Scanned {image_count} {image_label} and detected {ingredient_count} {ingredient_label}."


def _no_detections_message(image_count: int) -> str:
    image_label = "image" if image_count == 1 else "images"
    return f"Scan completed. Scanned {image_count} {image_label}. {NO_DETECTIONS_GUIDANCE}"


def _extension_for_upload(file: UploadFile) -> str:
    suffix = Path(file.filename or "").suffix.lower()
    return suffix if suffix in {".jpg", ".jpeg", ".png", ".webp", ".bmp"} else ".jpg"


def _validate_upload(file: UploadFile) -> None:
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing image file.",
        )

    if file.content_type and file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported image format. Please upload JPEG, PNG, WebP, or BMP.",
        )


def _save_upload(file: UploadFile, settings: Settings) -> Path:
    _validate_upload(file)
    upload_dir = settings.resolved_upload_dir
    upload_dir.mkdir(parents=True, exist_ok=True)

    target = upload_dir / f"{uuid4().hex}{_extension_for_upload(file)}"
    with target.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        with Image.open(target) as image:
            image.verify()
    except (UnidentifiedImageError, OSError) as exc:
        target.unlink(missing_ok=True)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid image file. Please upload a clear ingredient photo.",
        ) from exc

    return target


def _extract_detections(result: object, source_image: str, threshold: float) -> list[DebugDetection]:
    detections: list[DebugDetection] = []
    boxes = getattr(result, "boxes", None)
    names = getattr(result, "names", None) or {}
    if boxes is None:
        return detections

    for box in boxes:
        confidence = float(box.conf[0].item()) if hasattr(box.conf[0], "item") else float(box.conf[0])
        if confidence < threshold:
            continue

        class_id = int(box.cls[0].item()) if hasattr(box.cls[0], "item") else int(box.cls[0])
        class_name = str(names.get(class_id, class_id))
        xyxy = box.xyxy[0].tolist() if hasattr(box.xyxy[0], "tolist") else list(box.xyxy[0])
        detections.append(
            DebugDetection(
                class_id=class_id,
                class_name=class_name,
                confidence=confidence,
                bbox=[float(value) for value in xyxy],
                source_image=source_image,
            )
        )

    return detections


def _build_response(
    detections: list[DebugDetection],
    elapsed_ms: int,
    image_count: int,
    settings: Settings,
) -> IngredientDetectionResponse:
    class_counts = Counter(item.class_name for item in detections)
    mapper = LabelMapper(settings.resolved_labels_path)

    ingredients = [
        IngredientResult(
            name=mapped["name_vi"],
            quantity=count,
            unit=mapped["unit"],
        )
        for class_name, count in sorted(class_counts.items())
        for mapped in [mapper.map_label(class_name)]
    ]

    message = _completed_message(image_count, len(ingredients)) if ingredients else _no_detections_message(image_count)
    debug = None
    if settings.vision_debug:
        debug = VisionDebug(
            raw_detections=detections,
            processing_time_ms=elapsed_ms,
            image_count=image_count,
            class_counts=dict(class_counts),
            unmapped_labels=mapper.unmapped_labels(list(class_counts.keys())),
        )

    return IngredientDetectionResponse(
        success=True,
        ingredients=ingredients,
        message=message,
        debug=debug,
    )


async def detect_ingredients(files: list[UploadFile]) -> IngredientDetectionResponse:
    settings = get_settings()
    if not files:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing image file.")

    saved_paths: list[Path] = []
    started_at = time.perf_counter()

    try:
        for file in files:
            saved_paths.append(_save_upload(file, settings))

        try:
            model = get_model()
        except ModelLoadError as exc:
            raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc)) from exc

        raw_results = model.predict(
            source=[str(path) for path in saved_paths],
            conf=settings.yolo_confidence_threshold,
            verbose=False,
        )

        detections: list[DebugDetection] = []
        for path, result in zip(saved_paths, raw_results):
            detections.extend(_extract_detections(result, path.name, settings.yolo_confidence_threshold))

        elapsed_ms = int((time.perf_counter() - started_at) * 1000)
        return _build_response(detections, elapsed_ms, len(saved_paths), settings)
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ingredient detection failed. Please try another photo or add ingredients manually.",
        ) from exc
    finally:
        if not settings.vision_debug:
            for path in saved_paths:
                path.unlink(missing_ok=True)


def get_vision_health() -> dict[str, object]:
    settings = get_settings()
    error = None
    class_names = None
    try:
        class_names = inspect_class_names()
    except Exception as exc:
        error = str(exc)

    return {
        "status": "ok" if error is None else "degraded",
        "model_path": str(settings.resolved_model_path),
        "labels_path": str(settings.resolved_labels_path),
        "model_available": settings.resolved_model_path.exists(),
        "labels_available": settings.resolved_labels_path.exists(),
        "class_names": class_names,
        "error": error,
    }
