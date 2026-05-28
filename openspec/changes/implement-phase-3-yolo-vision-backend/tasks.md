## 1. Prepare model assets and backend scaffold

- [x] 1.1 Create `ai-models/yolo/ingredients/` with `README.md` and verify whether `yolov8n.pt` already exists in the repository before moving or documenting the expected model location.
- [x] 1.2 Create `backend/` with `app/main.py`, `app/core/config.py`, `app/modules/vision/`, `uploads/vision/.gitkeep`, `requirements.txt`, `.env.example`, `README.md`, and `scripts/inspect_yolo_classes.py`.
- [x] 1.3 Add backend dependencies for FastAPI, Uvicorn, python-multipart, Ultralytics, Pillow, and pydantic-settings if configuration uses it.
- [x] 1.4 Add `.env.example` values for `YOLO_MODEL_PATH`, `YOLO_LABELS_PATH`, `YOLO_CONFIDENCE_THRESHOLD`, `VISION_DEBUG`, and `UPLOAD_DIR`.

## 2. Inspect YOLO model classes and create label mapping

- [x] 2.1 Implement `backend/scripts/inspect_yolo_classes.py` so it loads the configured YOLO model and prints class IDs and class names from `model.names`.
- [x] 2.2 Run the class inspection script against `yolov8n.pt` and record the actual class names for the Phase 3 report.
- [x] 2.3 Generate `ai-models/yolo/ingredients/labels.json` using only the actual class names from `model.names` as keys.
- [x] 2.4 Add Vietnamese display names and units for obvious labels; for uncertain labels, use the original class name as `name_vi`, use unit `"cái"`, and record those labels as uncertain in the Phase 3 report.

## 3. Implement backend configuration and YOLO loading

- [x] 3.1 Implement backend settings in `backend/app/core/config.py` with model path, labels path, confidence threshold, debug flag, and upload directory.
- [x] 3.2 Implement `backend/app/modules/vision/yolo_model.py` with missing-file validation, YOLO singleton loading, `get_model()`, and class-name inspection helpers.
- [x] 3.3 Implement `backend/app/modules/vision/label_mapper.py` to load `labels.json`, map class names to `name`, `unit`, and fallback values, and expose unmapped/uncertain behavior clearly.
- [x] 3.4 Add backend startup or health behavior that can verify configuration and surface model load errors cleanly.

## 4. Implement vision detection API

- [x] 4.1 Implement Pydantic schemas in `backend/app/modules/vision/schemas.py` for user-facing ingredient responses and optional debug payloads.
- [x] 4.2 Implement image validation, temporary upload saving, and cleanup behavior that does not permanently store uploaded images unless debug mode is enabled.
- [x] 4.3 Implement YOLO inference in `backend/app/modules/vision/service.py`, including confidence filtering, class name extraction, bounding box/debug collection, and detection counting by class.
- [x] 4.4 Implement `/api/vision/detect-ingredients` in `router.py` for multipart field `image`.
- [x] 4.5 Implement `/api/vision/detect-ingredients/batch` in `router.py` for multipart field `images` and merge counts across all images.
- [x] 4.6 Ensure normal responses include only `success`, `ingredients`, and optional user-facing `message`, with ingredient items limited to `name`, `quantity`, and `unit`.
- [x] 4.7 Include raw detections, confidence scores, bounding boxes, class IDs, processing time, and image count only in logs or `debug` response when `VISION_DEBUG=true`.
- [x] 4.8 Handle missing images, invalid images, unsupported formats, model errors, inference failures, and no-detection results with clean user-safe responses.

## 5. Wire mobile scan flow to backend vision service

- [x] 5.1 Create or update `mobile-app/src/services/visionApiService.ts` to upload one or multiple selected image URIs to the FastAPI backend using multipart form data.
- [x] 5.2 Add mobile API base URL configuration suitable for local development, emulator/simulator testing, and physical-device overrides.
- [x] 5.3 Update `AIScanningScreen` or the existing scan-flow service call to use `visionApiService` before falling back to `visionMockService`.
- [x] 5.4 Convert backend response items into the app's detected and confirmed ingredient state using ingredient name, quantity/count, and unit.
- [x] 5.5 Preserve mock fallback or development-mode behavior when the backend is unavailable, times out, or returns an invalid response.
- [x] 5.6 Show a friendly scan error or no-detection state and keep manual ingredient entry available when backend detection fails or returns no ingredients.

## 6. Remove technical details from user-facing mobile UI

- [x] 6.1 Update `IngredientConfirmationScreen` to display ingredient name, quantity/count, and unit only.
- [x] 6.2 Remove user-facing confidence score rendering and ensure bounding boxes, class IDs, raw model labels, and debug JSON are never shown in the scan confirmation UI.
- [x] 6.3 Keep existing layout, navigation, and edit/remove/add ingredient behavior without redesigning the screen.
- [x] 6.4 Verify existing recipe recommendation flow still consumes confirmed ingredients after backend detection or fallback detection.

## 7. Document Phase 3

- [x] 7.1 Create `docs/PHASE_3_YOLO_VISION_BACKEND_REPORT.md` covering folder structure, model location, actual class names, labels mapping, backend dependencies, endpoints, response schema, mobile updates, validation results, known issues, and next recommended phase.
- [x] 7.2 Update backend README with model placement, environment setup, install command, server startup, health check, endpoint test examples, and debug-mode behavior.
- [x] 7.3 Update project README or relevant docs with how the mobile app connects to the backend and how to configure the API base URL.
- [x] 7.4 Document any unmapped or uncertain YOLO class labels and the fallback `name_vi`/unit decisions.

## 8. Validate backend and mobile integration

- [x] 8.1 Install backend dependencies in a Python environment and record the command/results.
- [x] 8.2 Start the FastAPI server and test the health endpoint.
- [x] 8.3 Verify YOLO model loading and class-name inspection through the script or backend startup.
- [x] 8.4 Test `/api/vision/detect-ingredients` with a sample image if available and verify the normal response excludes confidence and debug fields when `VISION_DEBUG=false`.
- [x] 8.5 Test `/api/vision/detect-ingredients/batch` with multiple images if available and verify merged counts.
- [x] 8.6 Run mobile typecheck or the available TypeScript validation command.
- [x] 8.7 Verify the app compiles and the Ingredient Confirmation UI does not display confidence scores or other technical detection details.
- [x] 8.8 Verify mock fallback still works when the backend is unavailable.
