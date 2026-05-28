import json
from pathlib import Path
from typing import TypedDict


class LabelInfo(TypedDict):
    name_vi: str
    unit: str


class LabelMapper:
    def __init__(self, labels_path: Path) -> None:
        self.labels_path = labels_path
        self._labels = self._load_labels(labels_path)

    @staticmethod
    def _load_labels(labels_path: Path) -> dict[str, LabelInfo]:
        if not labels_path.exists():
            return {}

        with labels_path.open("r", encoding="utf-8") as file:
            data = json.load(file)

        labels: dict[str, LabelInfo] = {}
        for class_name, value in data.items():
            if not isinstance(value, dict):
                continue
            labels[class_name] = {
                "name_vi": str(value.get("name_vi") or class_name),
                "unit": str(value.get("unit") or "cái"),
            }
        return labels

    def map_label(self, class_name: str) -> LabelInfo:
        return self._labels.get(class_name, {"name_vi": class_name, "unit": "cái"})

    def unmapped_labels(self, class_names: list[str]) -> list[str]:
        return sorted({name for name in class_names if name not in self._labels})
