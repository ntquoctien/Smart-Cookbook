from pathlib import Path
from threading import Lock
from typing import Any

from app.core.config import get_settings

_model: Any | None = None
_model_lock = Lock()


class ModelLoadError(RuntimeError):
    pass


def _load_yolo(model_path: Path) -> Any:
    if not model_path.exists():
        raise ModelLoadError(f"YOLO model file not found: {model_path}")

    try:
        from ultralytics import YOLO
    except ImportError as exc:
        raise ModelLoadError("The ultralytics package is not installed.") from exc

    try:
        return YOLO(str(model_path))
    except Exception as exc:
        raise ModelLoadError(f"Failed to load YOLO model from {model_path}: {exc}") from exc


def get_model() -> Any:
    global _model
    if _model is not None:
        return _model

    with _model_lock:
        if _model is None:
            settings = get_settings()
            _model = _load_yolo(settings.resolved_model_path)
    return _model


def inspect_class_names(model: Any | None = None) -> dict[int, str]:
    yolo_model = model or get_model()
    names = getattr(yolo_model, "names", None)
    if names is None and hasattr(yolo_model, "model"):
        names = getattr(yolo_model.model, "names", None)

    if isinstance(names, dict):
        return {int(key): str(value) for key, value in names.items()}
    if isinstance(names, list):
        return {index: str(value) for index, value in enumerate(names)}
    return {}
