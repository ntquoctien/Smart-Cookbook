from fastapi import APIRouter, File, UploadFile

from app.modules.vision.schemas import HealthResponse, IngredientDetectionResponse
from app.modules.vision.service import detect_ingredients, get_vision_health

router = APIRouter(prefix="/api/vision", tags=["vision"])


@router.get("/health", response_model=HealthResponse)
def health() -> dict[str, object]:
    return get_vision_health()


@router.post(
    "/detect-ingredients",
    response_model=IngredientDetectionResponse,
    response_model_exclude_none=True,
)
async def detect_single_ingredient_image(image: UploadFile | None = File(None)) -> IngredientDetectionResponse:
    return await detect_ingredients([image] if image is not None else [])


@router.post(
    "/detect-ingredients/batch",
    response_model=IngredientDetectionResponse,
    response_model_exclude_none=True,
)
async def detect_multiple_ingredient_images(images: list[UploadFile] | None = File(None)) -> IngredientDetectionResponse:
    return await detect_ingredients(images or [])
