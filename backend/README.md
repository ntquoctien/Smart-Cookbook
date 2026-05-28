# Smart Cookbook AI Backend

FastAPI backend for Phase 3 YOLO ingredient detection.

## Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Place the trained model at:

```text
ai-models/yolo/ingredients/yolov8n.pt
```

From the project root, inspect model classes:

```bash
python backend/scripts/inspect_yolo_classes.py --model ai-models/yolo/ingredients/yolov8n.pt
```

## Run

```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Health checks:

```bash
curl http://127.0.0.1:8000/health
curl http://127.0.0.1:8000/api/vision/health
```

## Test Detection

Single image:

```bash
curl -X POST http://127.0.0.1:8000/api/vision/detect-ingredients ^
  -F "image=@path/to/photo.jpg"
```

Batch:

```bash
curl -X POST http://127.0.0.1:8000/api/vision/detect-ingredients/batch ^
  -F "images=@path/to/photo-1.jpg" ^
  -F "images=@path/to/photo-2.jpg"
```

Default responses are user-facing and include only ingredient `name`, `quantity`, and `unit`. Confidence scores, bounding boxes, class IDs, and raw detections are returned only inside `debug` when `VISION_DEBUG=true`.
