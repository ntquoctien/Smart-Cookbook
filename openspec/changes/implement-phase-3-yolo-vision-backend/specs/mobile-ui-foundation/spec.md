## MODIFIED Requirements

### Requirement: Mobile app foundation SHALL be Expo and React Native compatible
The Smart Cookbook mobile client SHALL run from `mobile-app/` as an Expo-compatible React Native TypeScript project, and it MUST avoid direct use of web-only primitives, HTML markup, CSS files, or unsupported DOM-based component patterns from the Figma export. The foundation SHALL also support the device-facing integrations, native packages, shared client state, local persistence, and backend API configuration required for the current SDK baseline and Phase 3 vision integration.

#### Scenario: Existing mobile app needs interactive native and backend capabilities
- **WHEN** the implementation extends the Phase 2 client with backend vision API calls and related configuration
- **THEN** the project adds or updates Expo-compatible mobile code without breaking the existing React Native TypeScript setup

#### Scenario: Figma export contains web-specific code
- **WHEN** the implementation analyzes `figma-reference/` and identifies React web, HTML/CSS, Tailwind, or other web-only patterns
- **THEN** the implementation rewrites those patterns into React Native-compatible components instead of copying them directly

### Requirement: The app SHALL include mock-first data models and documentation
The mobile client SHALL include typed mock data, shared state models, service-facing domain models, backend response models, and markdown reports under `docs/` that document the Figma analysis, UI foundation, implementation summary, review results, Phase 2 client interaction work, and Phase 3 YOLO vision backend integration.

#### Scenario: Feature screens need local content or service-backed state
- **WHEN** a screen needs recipes, ingredients, chat messages, cooking steps, selected images, backend-detected ingredients, or persisted user data during Phase 3
- **THEN** it reads them through typed local models, shared state, API services, or mock services rather than hardcoded screen-local values

#### Scenario: Stakeholders need traceability for Phase 3 decisions
- **WHEN** the implementation is complete
- **THEN** the repository contains the required Phase 3 YOLO vision backend report in `docs/` alongside the existing Phase 1 and Phase 2 reports

## ADDED Requirements

### Requirement: The project SHALL document backend and model setup
The project SHALL document how to place or reference `best.pt`, configure backend environment variables, run the FastAPI backend, test the vision endpoints, and connect the mobile app to the backend API base URL.

#### Scenario: Developer runs the Phase 3 backend locally
- **WHEN** a developer follows the project README or backend README
- **THEN** they can configure `YOLO_MODEL_PATH`, `YOLO_LABELS_PATH`, `YOLO_CONFIDENCE_THRESHOLD`, `VISION_DEBUG`, and `UPLOAD_DIR`, start the backend, and test the health and vision endpoints

#### Scenario: Developer connects mobile to backend
- **WHEN** a developer configures the mobile API base URL for their emulator, simulator, or physical device
- **THEN** the scan flow can call the FastAPI backend while retaining mock fallback behavior if the backend is unavailable
