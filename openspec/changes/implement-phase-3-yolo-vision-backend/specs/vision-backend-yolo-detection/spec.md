## ADDED Requirements

### Requirement: The backend SHALL manage YOLO ingredient model assets
The project SHALL store or clearly reference trained YOLO ingredient model assets under `ai-models/yolo/ingredients/`, including `best.pt`, a generated `labels.json` based on actual model class names, and a README documenting model placement and label mapping assumptions.

#### Scenario: Model assets are prepared
- **WHEN** the Phase 3 implementation prepares the YOLO model folder
- **THEN** the project contains or documents the expected `ai-models/yolo/ingredients/best.pt` location, `labels.json`, and model README

#### Scenario: Labels are generated from the trained model
- **WHEN** `labels.json` is created or updated
- **THEN** every label key matches a class name from `model.names` exactly and uncertain mappings use the original class name with unit `"cái"`

### Requirement: The backend SHALL load the YOLO model once through configuration
The FastAPI backend SHALL load the Ultralytics YOLO model from `YOLO_MODEL_PATH` through backend configuration, expose a reusable model accessor, inspect class names, and provide clear errors when the model is missing or cannot be loaded.

#### Scenario: Backend initializes the model
- **WHEN** the backend needs to run ingredient detection
- **THEN** it loads the YOLO model once and reuses that model instance for subsequent detection requests

#### Scenario: Model file is unavailable
- **WHEN** `YOLO_MODEL_PATH` does not point to an existing model file or model loading fails
- **THEN** the backend returns or logs a clear technical error without attempting to process detections

### Requirement: The backend SHALL expose image ingredient detection endpoints
The FastAPI backend SHALL expose `/api/vision/detect-ingredients` for one uploaded image and `/api/vision/detect-ingredients/batch` for multiple uploaded images using multipart form upload fields `image` and `images` respectively.

#### Scenario: User uploads one image
- **WHEN** a client posts a valid image file to `/api/vision/detect-ingredients` using multipart field `image`
- **THEN** the backend validates the file, runs YOLO detection, counts filtered detections by ingredient class, maps labels, and returns a successful ingredient response

#### Scenario: User uploads multiple images
- **WHEN** a client posts multiple valid image files to `/api/vision/detect-ingredients/batch` using multipart field `images`
- **THEN** the backend merges detection counts across all images and returns one consolidated ingredient list

### Requirement: The backend SHALL return a clean mobile-facing ingredient response
The normal backend response SHALL expose only user-facing ingredient data with `name`, `quantity`, and `unit`, plus success status and optional user-facing message, and SHALL NOT expose confidence score, bounding boxes, class IDs, raw model labels, or raw detections when `VISION_DEBUG=false`.

#### Scenario: Detections are found
- **WHEN** the backend detects ingredient objects above the configured confidence threshold
- **THEN** it returns `success: true` and an `ingredients` array where each item contains only `name`, `quantity`, and `unit`

#### Scenario: No ingredients are detected
- **WHEN** the backend completes inference but finds no detections above the configured threshold
- **THEN** it returns `success: true`, an empty `ingredients` array, and the message `No ingredients detected. Please try another photo or add ingredients manually.`

#### Scenario: Debug mode is disabled
- **WHEN** `VISION_DEBUG=false`
- **THEN** the backend response excludes debug data, raw detections, confidence scores, bounding boxes, and class IDs

### Requirement: The backend SHALL keep technical detection details debug-only
The backend SHALL keep confidence scores, bounding boxes, raw detections, class IDs, processing timing, and image count available only in backend logs or an optional `debug` response object when `VISION_DEBUG=true`.

#### Scenario: Debug mode is enabled
- **WHEN** `VISION_DEBUG=true` and a detection request is processed
- **THEN** the backend may include a `debug` object containing raw detections, processing time, image count, and related technical details

#### Scenario: Backend handles invalid input
- **WHEN** a request has no image, an invalid image, an unsupported image format, or an inference failure
- **THEN** the backend returns a clean error response with a user-safe message and retains technical details only in logs or debug output

### Requirement: The backend SHALL provide YOLO class inspection tooling
The backend SHALL include `backend/scripts/inspect_yolo_classes.py` to print all class names from the configured YOLO model and support verification of `labels.json`.

#### Scenario: Developer inspects model classes
- **WHEN** a developer runs the inspection script against the configured YOLO model
- **THEN** the script prints the model class IDs and class names so `labels.json` and the Phase 3 report can be verified

### Requirement: The backend SHALL document setup and validation
The backend SHALL include dependency, environment, run, endpoint testing, model placement, and validation documentation for the Phase 3 YOLO vision integration.

#### Scenario: Developer sets up the backend
- **WHEN** a developer follows the backend README and `.env.example`
- **THEN** they can install dependencies, configure model and label paths, start the FastAPI server, test health, and test vision endpoints

#### Scenario: Phase 3 report is created
- **WHEN** Phase 3 implementation is complete
- **THEN** `docs/PHASE_3_YOLO_VISION_BACKEND_REPORT.md` documents folder structure, model location, actual class names, label mappings, endpoints, response schema, mobile updates, validation results, known issues, and next recommended phase
