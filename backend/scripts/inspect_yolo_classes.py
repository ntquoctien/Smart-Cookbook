from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


def default_model_path() -> Path:
    return (Path(__file__).resolve().parents[2] / "ai-models" / "yolo" / "ingredients" / "yolov8n.pt").resolve()


def load_names(model_path: Path) -> dict[int, str]:
    if not model_path.exists():
        raise FileNotFoundError(f"YOLO model file not found: {model_path}")

    try:
        from ultralytics import YOLO
    except ImportError as exc:
        raise RuntimeError("Install backend requirements first: pip install -r backend/requirements.txt") from exc

    model = YOLO(str(model_path))
    names = getattr(model, "names", None)
    if names is None and hasattr(model, "model"):
        names = getattr(model.model, "names", None)

    if isinstance(names, dict):
        return {int(key): str(value) for key, value in names.items()}
    if isinstance(names, list):
        return {index: str(value) for index, value in enumerate(names)}
    raise RuntimeError("Could not read model.names from the YOLO model.")


def main() -> int:
    parser = argparse.ArgumentParser(description="Print YOLO class names from a trained model.")
    parser.add_argument("--model", type=Path, default=default_model_path(), help="Path to yolov8n.pt")
    parser.add_argument("--json", action="store_true", help="Print JSON instead of text")
    args = parser.parse_args()

    names = load_names(args.model.resolve())
    if args.json:
        print(json.dumps(names, ensure_ascii=False, indent=2))
    else:
        for class_id, class_name in sorted(names.items()):
            print(f"{class_id}: {class_name}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        raise SystemExit(1)
