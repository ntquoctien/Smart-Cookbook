from typing import Any

from pydantic import BaseModel, Field


class IngredientResult(BaseModel):
    name: str
    quantity: int = Field(ge=0)
    unit: str


class DebugDetection(BaseModel):
    class_id: int
    class_name: str
    confidence: float
    bbox: list[float]
    source_image: str | None = None


class VisionDebug(BaseModel):
    raw_detections: list[DebugDetection]
    processing_time_ms: int
    image_count: int
    class_counts: dict[str, int] | None = None
    unmapped_labels: list[str] | None = None


class IngredientDetectionResponse(BaseModel):
    success: bool
    ingredients: list[IngredientResult]
    message: str | None = None
    debug: VisionDebug | None = None


class HealthResponse(BaseModel):
    status: str
    model_path: str
    labels_path: str
    model_available: bool
    labels_available: bool
    class_names: dict[int, str] | None = None
    error: str | None = None


class ErrorResponse(BaseModel):
    success: bool = False
    ingredients: list[IngredientResult] = Field(default_factory=list)
    message: str
    debug: dict[str, Any] | None = None
