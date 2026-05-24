## ADDED Requirements

### Requirement: The app SHALL provide supporting library screens
The mobile client SHALL include favorite recipes and cooking history screens that are reachable from the main tab navigation and can render populated or empty states using local mock data.

#### Scenario: User views favorite recipes
- **WHEN** the user opens the favorites tab
- **THEN** the app shows saved recipe cards or an empty-state experience if no favorites are available

#### Scenario: User views cooking history
- **WHEN** the user opens the history tab
- **THEN** the app shows previously cooked recipes with date and rating information when mock history is present

### Requirement: The app SHALL provide a profile surface for Phase 1
The mobile client SHALL include a profile screen that presents a user avatar placeholder, basic preference information, cooking level, settings-style actions, and a logout control suitable for mock navigation.

#### Scenario: User opens profile information
- **WHEN** the user opens the profile tab
- **THEN** the app shows mock account and preference details in a mobile-friendly profile layout

#### Scenario: User selects logout
- **WHEN** the user taps the logout control on the profile screen
- **THEN** the app performs a mock sign-out navigation or placeholder action without requiring a live auth backend
