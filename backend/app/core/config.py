from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    yolo_model_path: Path = Field(default=Path("../ai-models/yolo/ingredients/best.pt"))
    yolo_labels_path: Path = Field(default=Path("../ai-models/yolo/ingredients/labels.json"))
    yolo_confidence_threshold: float = Field(default=0.35, ge=0, le=1)
    vision_debug: bool = False
    upload_dir: Path = Field(default=Path("uploads/vision"))

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    def resolve_path(self, value: Path) -> Path:
        if value.is_absolute():
            return value
        return (Path.cwd() / value).resolve()

    @property
    def resolved_model_path(self) -> Path:
        return self.resolve_path(self.yolo_model_path)

    @property
    def resolved_labels_path(self) -> Path:
        return self.resolve_path(self.yolo_labels_path)

    @property
    def resolved_upload_dir(self) -> Path:
        return self.resolve_path(self.upload_dir)


@lru_cache
def get_settings() -> Settings:
    return Settings()
