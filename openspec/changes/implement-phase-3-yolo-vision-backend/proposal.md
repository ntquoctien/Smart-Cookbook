## Why

Phase 2 made the mobile scan flow interactive, but ingredient detection still depends on a mock vision service. Phase 3 is needed to connect the app to a real YOLO-backed vision API while keeping user-facing ingredient output simple and preserving a mock fallback for development or backend outages.

## What Changes

- Add a dedicated AI model storage convention under `ai-models/yolo/ingredients/` for the trained `yolov8n.pt` model, generated `labels.json`, and model README.
- Add a FastAPI backend under `backend/` with health/config structure, a vision router, YOLO model singleton loading, label mapping, request/response schemas, upload handling, and validation.
- Add `/api/vision/detect-ingredients` for one uploaded image and `/api/vision/detect-ingredients/batch` for multiple uploaded images.
- Count YOLO detections by model class name, map each class to a Vietnamese display name and unit when available, and return only `name`, `quantity`, and `unit` to the mobile-facing response.
- Keep confidence scores, bounding boxes, class IDs, raw detections, and processing diagnostics internal to backend logs or an optional debug response when `VISION_DEBUG=true`.
- Add `backend/scripts/inspect_yolo_classes.py` so maintainers can inspect `model.names` and verify `labels.json`.
- Update the mobile scan service layer to call the FastAPI vision API for one or multiple image URIs, convert backend ingredient results into detected ingredient state, and retain the mock vision service as a fallback when the backend is unavailable.
- Ensure Ingredient Confirmation UI does not expose confidence scores, bounding boxes, raw model labels, class IDs, or debug JSON.
- Add Phase 3 documentation covering model location, actual class names, label mapping, backend setup, endpoints, mobile integration, validation, known issues, and next recommended phase.

## Capabilities

### New Capabilities
- `vision-backend-yolo-detection`: FastAPI backend, YOLO model loading, label mapping, image upload detection endpoints, clean ingredient response contract, debug-only technical detection details, and backend validation/documentation.

### Modified Capabilities
- `mobile-client-state-and-services`: Replace mock-only vision detection with a backend vision API service path while preserving mock fallback and normalized app state.
- `mobile-core-cooking-flow`: Update the scan and AI scanning flow so detected ingredients can come from the YOLO backend and Ingredient Confirmation displays only user-facing ingredient name, quantity, and unit.
- `mobile-ui-foundation`: Extend project foundation and documentation expectations to include backend setup, AI model storage, backend run instructions, endpoint testing, and Phase 3 reporting.

## Impact

- Affected backend code: new `backend/app/` FastAPI application, vision module, upload directory, scripts, requirements, env example, and backend README.
- Affected model assets: `ai-models/yolo/ingredients/yolov8n.pt`, generated `labels.json`, and model README.
- Affected mobile code: `mobile-app/src/services/visionApiService.ts`, existing mock vision service integration, scan flow screens, app config, and detected ingredient types/state where needed.
- Affected docs: new `docs/PHASE_3_YOLO_VISION_BACKEND_REPORT.md` and README updates for model placement, backend startup, endpoint testing, and mobile API configuration.
- New dependencies: FastAPI, Uvicorn, python-multipart, Ultralytics, Pillow, and optionally pydantic-settings.
- User-facing behavior: confidence scores and technical detection details must remain hidden from the mobile UI.
