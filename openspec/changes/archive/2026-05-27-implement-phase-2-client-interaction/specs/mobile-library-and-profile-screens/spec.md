## MODIFIED Requirements

### Requirement: The app SHALL provide supporting library screens
The mobile client SHALL include favorite recipes and cooking history screens that are reachable from the main tab navigation and can render populated or empty states using locally persisted data instead of static mock-only screen content.

#### Scenario: User views favorite recipes
- **WHEN** the user opens the favorites tab
- **THEN** the app shows locally persisted saved recipe cards or an empty-state experience if no favorites are available

#### Scenario: User views cooking history
- **WHEN** the user opens the history tab
- **THEN** the app shows locally persisted completed recipes with date and rating information when history is present

### Requirement: The app SHALL provide a profile surface for Phase 1
The mobile client SHALL include a profile screen that presents user identity, diet preference information, cooking level, settings-style actions, and a logout control using locally stored profile/preferences data, and it SHALL support basic local updates where the current UI exposes editable preference fields.

#### Scenario: User opens profile information
- **WHEN** the user opens the profile tab
- **THEN** the app shows locally persisted account and preference details in a mobile-friendly profile layout

#### Scenario: User updates or uses profile actions
- **WHEN** the user changes supported local preferences or taps the logout control
- **THEN** the app updates local state and persistence or performs the expected mock sign-out navigation without requiring a live auth backend

## ADDED Requirements

### Requirement: The app SHALL save cooking outcomes to local libraries
The mobile client SHALL allow a completed cooking flow to record ratings, save recipes to favorites, and append completed entries to local cooking history through the local persistence layer.

#### Scenario: User completes a recipe and rates it
- **WHEN** the user finishes cooking and submits a rating on the completion screen
- **THEN** the app stores the rating in local cooking history for the completed recipe

#### Scenario: User chooses to save a recipe as favorite
- **WHEN** the user saves a recipe from the completion flow or another supported entry point
- **THEN** the app writes that recipe into persisted favorites and reflects it on the favorites screen
