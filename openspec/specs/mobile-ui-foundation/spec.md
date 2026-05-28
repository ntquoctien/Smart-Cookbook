## Purpose

Define the Expo and React Native foundation, shared UI primitives, typed local data, and implementation documentation baseline for the Smart Cookbook mobile client.

## Requirements

### Requirement: Mobile app foundation SHALL be Expo and React Native compatible
The Smart Cookbook mobile client SHALL run from `mobile-app/` as an Expo-compatible React Native TypeScript project, and it MUST avoid direct use of web-only primitives, HTML markup, CSS files, or unsupported DOM-based component patterns from the Figma export. The foundation SHALL also support the device-facing integrations and native packages required for local camera capture, gallery selection, shared client state, and local persistence in the current SDK baseline.

#### Scenario: Existing mobile app needs interactive native capabilities
- **WHEN** the implementation extends the Phase 1 shell with camera, image picker, shared state, and persistence features
- **THEN** the project adds and configures Expo-compatible native dependencies without breaking the existing React Native TypeScript setup

#### Scenario: Figma export contains web-specific code
- **WHEN** the implementation analyzes `figma-reference/` and identifies React web, HTML/CSS, Tailwind, or other web-only patterns
- **THEN** the implementation rewrites those patterns into React Native-compatible components instead of copying them directly

### Requirement: The app SHALL define reusable UI foundations
The mobile client SHALL provide shared design tokens, reusable UI components, and consistent loading/error presentation for common layout, input, button, card, chip, loading, and empty-state patterns so that Phase 2 interactive screens preserve the Phase 1 visual language while handling real local state and device-permission outcomes.

#### Scenario: Shared visual patterns are needed across interactive screens
- **WHEN** multiple screens require the same colors, spacing, typography, card styles, input/button affordances, or feedback states
- **THEN** the implementation stores them in shared token and component modules rather than duplicating hardcoded values per screen

#### Scenario: A screen needs a standard loading or error treatment
- **WHEN** a screen handles permission denial, mock-service delay, empty results, or missing content
- **THEN** it uses shared foundational components or patterns aligned with the app shell

### Requirement: The app SHALL include mock-first data models and documentation
The mobile client SHALL include typed mock data, shared state models, service-facing domain models, and markdown reports under `docs/` that document the Figma analysis, UI foundation, implementation summary, review results, and the Phase 2 client interaction work.

#### Scenario: Feature screens need local content or service-backed state
- **WHEN** a screen needs recipes, ingredients, chat messages, cooking steps, selected images, or persisted user data during Phase 2
- **THEN** it reads them through typed local models, shared state, or mock services rather than backend services

#### Scenario: Stakeholders need traceability for Phase 2 decisions
- **WHEN** the implementation is complete
- **THEN** the repository contains the required Phase 2 client interaction report in `docs/` alongside the existing Phase 1 reports
