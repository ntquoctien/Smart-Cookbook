## Context

Phase 2 introduced a real mobile scan session, image capture/gallery selection, shared state, persistence, and mock services. The current vision step still calls `visionMockService`, and `IngredientConfirmationScreen` currently exposes confidence in the UI. Phase 3 introduces a local FastAPI service that loads a trained YOLO model once, accepts uploaded food/ingredient images, counts detected ingredient objects, maps model class names into user-facing Vietnamese labels and units, and returns a clean response to the mobile app.

The trained model file is expected to be `yolov8n.pt`. The implementation MUST inspect `model.names` before generating `labels.json`; labels MUST be based on actual model classes, not invented from examples. Technical detection fields such as confidence, class IDs, bounding boxes, and raw detections are useful for debugging, but they are not part of the normal mobile-facing response and MUST NOT be shown in the user-facing mobile UI.

## Goals / Non-Goals

**Goals:**
- Establish `ai-models/yolo/ingredients/` as the project location for trained YOLO ingredient models, generated label mapping, and model notes.
- Add a `backend/` FastAPI application with configuration, health, vision routes, YOLO singleton loading, label mapping, request/response schemas, upload handling, and clear error behavior.
- Add one-image and batch-image ingredient detection endpoints under `/api/vision`.
- Load YOLO once at backend startup or first model access, never once per request.
- Inspect actual model class names and generate `labels.json` from those names, using known Vietnamese/unit mappings where obvious and documenting uncertain labels.
- Return mobile-facing ingredient items as only `name`, `quantity`, and `unit`, plus optional `message` for no detections.
- Include debug detection details only when `VISION_DEBUG=true`.
- Update the mobile service layer so the scan flow calls the backend vision API first and falls back to the mock service when the backend is unavailable or disabled.
- Remove confidence score display from the Ingredient Confirmation UI.
- Document Phase 3 setup, class names, mappings, endpoints, validation, and known issues.

**Non-Goals:**
- Real recipe recommendation backend integration.
- Cloud deployment, authentication, user accounts, or server-side persistence.
- Weight, volume, nutrition, or serving-size estimation.
- Drawing bounding boxes in the mobile UI.
- Permanently storing uploaded images unless debug mode is enabled.
- Replacing the existing mobile UI design or navigation structure.

## Decisions

### Use a separate FastAPI backend under `backend/`
The YOLO runtime depends on Python and Ultralytics, so the project SHALL add a dedicated backend folder instead of embedding model inference into the Expo app. This keeps native mobile dependencies small and lets Phase 4 or later replace the local backend with a deployed API without rewriting the screen flow.

Alternatives considered:
- Run inference in the mobile app: rejected because Ultralytics/PyTorch is not a practical Expo dependency.
- Keep only the mock service: rejected because Phase 3 specifically requires trained model integration.

### Load the YOLO model through a singleton module
`backend/app/modules/vision/yolo_model.py` SHALL read `YOLO_MODEL_PATH` from config, validate that the file exists, load the Ultralytics `YOLO` object once, expose `get_model()`, and expose a helper for class-name inspection. This avoids high request latency and repeated memory allocation.

Alternatives considered:
- Load the model inside each endpoint call: rejected because repeated model loading is slow and violates the Phase 3 requirement.
- Store the model object globally inside `router.py`: rejected because model loading, error handling, and inspection belong behind a service boundary.

### Generate label mapping from actual `model.names`
Before creating `labels.json`, the implementation SHALL run or reuse `backend/scripts/inspect_yolo_classes.py` to inspect actual classes from `yolov8n.pt`. Each class key in `labels.json` SHALL match the original class name exactly. Obvious mappings can use Vietnamese display names and units; uncertain mappings SHALL use the original class name as `name_vi`, use `"cái"` as the unit, and be documented in the Phase 3 report.

Alternatives considered:
- Use the example egg/tomato/garlic/green_onion map without inspection: rejected because it may not match the trained model classes.
- Normalize class keys aggressively: rejected because mismatched keys would break mapping and hide model output.

### Keep API responses user-facing by default
The backend SHALL return a stable response where each ingredient contains only `name`, `quantity`, and `unit`. Debug information SHALL be included only when `VISION_DEBUG=true`, and mobile UI code SHALL ignore or avoid rendering debug fields even if they exist.

Alternatives considered:
- Return confidence for every ingredient and let mobile hide it: rejected because the API contract should prevent accidental user exposure.
- Create separate debug endpoints immediately: deferred because `VISION_DEBUG` is enough for local Phase 3 validation.

### Count objects by class name, not by estimated weight
The service SHALL count filtered YOLO boxes per class and merge results across batch images. It SHALL NOT estimate weight, volume, or ingredient amounts beyond object count in this phase.

Alternatives considered:
- Estimate grams from box size: rejected because this requires calibration and would create misleading output.
- Return one row per detection: rejected because the mobile confirmation UI needs consolidated ingredients.

### Preserve the mock fallback in mobile
`visionApiService` SHALL upload selected image URIs to the backend when configured, convert the response into app ingredient state, and fall back to `visionMockService` on backend unavailable, timeout, or invalid response cases. The user SHALL see a friendly message and still be able to manually add/edit ingredients.

Alternatives considered:
- Remove the mock service: rejected because local mobile development often happens without the backend running.
- Block the scan flow when the backend is unavailable: rejected because manual ingredient entry remains a supported user path.

## Risks / Trade-offs

- [Model file is missing or stored somewhere unexpected] -> Validate `YOLO_MODEL_PATH`, document expected placement, and provide a clear backend startup/load error.
- [Actual model class names differ from the examples] -> Generate `labels.json` only after inspecting `model.names`, and document unmapped/uncertain labels.
- [Ultralytics/PyTorch install is slow or platform-sensitive] -> Keep dependencies isolated in `backend/requirements.txt` and document backend setup separately from mobile setup.
- [Uploaded images accumulate on disk] -> Save to temporary upload paths and delete after inference unless debug mode is enabled.
- [Mobile cannot reach localhost from a device/emulator] -> Add API base URL config and document emulator/device host behavior in the backend/mobile README.
- [Backend debug data leaks to users] -> Exclude debug by default, hide confidence in the mobile UI, and keep technical details in logs/debug response/report only.
- [YOLO produces duplicate or noisy detections] -> Apply `YOLO_CONFIDENCE_THRESHOLD`, count by class, and allow users to edit ingredients manually before recommendations.

## Migration Plan

1. Add the backend and model directory scaffold.
2. Place or reference `yolov8n.pt` under `ai-models/yolo/ingredients/`.
3. Add the class inspection script, load the model, inspect `model.names`, and generate `labels.json` from actual classes.
4. Implement FastAPI config, app startup, health route, vision schemas, label mapper, YOLO model loader, detection service, and one/batch routes.
5. Implement upload validation, temporary-file cleanup, confidence filtering, class counting, label mapping, no-detection response, and debug-only raw detection output.
6. Update the mobile vision API service, scan flow call site, response conversion, timeout/unavailable fallback, and Ingredient Confirmation UI.
7. Add Phase 3 documentation and README updates.
8. Validate backend install/server/model load/endpoints and mobile typecheck/compile behavior.

Rollback strategy:
- Disable backend use through mobile API config and keep `visionMockService` as fallback.
- Revert the backend folder and Phase 3 mobile service wiring if the YOLO runtime cannot be supported in the current environment.

## Open Questions

- The actual YOLO class names are unknown until `yolov8n.pt` is inspected.
- The final mobile API base URL depends on whether testing is done with web, Android emulator, iOS simulator, or a physical device.
- Sample ingredient images may not exist in the repository; endpoint validation may need to use an available local image or document that sample-image testing was not performed.
