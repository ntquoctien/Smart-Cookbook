## ADDED Requirements

### Requirement: Mobile app foundation SHALL be Expo and React Native compatible
The Phase 1 mobile client SHALL run from `mobile-app/` as an Expo-compatible React Native TypeScript project, and it MUST avoid direct use of web-only primitives, HTML markup, CSS files, or unsupported DOM-based component patterns from the Figma export.

#### Scenario: Existing mobile app is incomplete or not initialized
- **WHEN** the implementation inspects `mobile-app/` and finds that the project is missing the minimum Expo + React Native + TypeScript structure
- **THEN** the implementation creates or adapts the project so it can run as an Expo-compatible TypeScript mobile app

#### Scenario: Figma export contains web-specific code
- **WHEN** the implementation analyzes `figma-reference/` and identifies React web, HTML/CSS, Tailwind, or other web-only patterns
- **THEN** the implementation rewrites those patterns into React Native-compatible components instead of copying them directly

### Requirement: The app SHALL define reusable UI foundations
The mobile client SHALL provide shared design tokens and reusable UI components for common layout, input, button, card, chip, and loading patterns so that Phase 1 screens use consistent spacing, color, typography, radius, and shadow behavior.

#### Scenario: Shared visual patterns are needed across screens
- **WHEN** multiple screens require the same colors, spacing, typography, card styles, or input/button affordances
- **THEN** the implementation stores them in shared token and component modules rather than duplicating hardcoded values per screen

#### Scenario: A screen needs a standard container or empty/loading state
- **WHEN** a screen requires base structure, feedback, or common UI controls
- **THEN** it uses the shared foundational components created for the app shell

### Requirement: The app SHALL include mock-first data models and documentation
The mobile client SHALL include typed mock data for ingredients, recipes, cooking sessions, and AI chat messages, and it SHALL create markdown reports under `docs/` that document the Figma analysis, UI foundation, implementation summary, and review results.

#### Scenario: Feature screens need local content without backend integration
- **WHEN** a screen needs recipes, ingredients, chat messages, or cooking steps during Phase 1
- **THEN** it reads typed mock data from local source modules instead of backend services

#### Scenario: Stakeholders need traceability for Phase 1 decisions
- **WHEN** the implementation is complete
- **THEN** the repository contains the required Phase 1 markdown reports in `docs/`
