## ADDED Requirements

### Requirement: The app SHALL support the primary cooking journey
The mobile client SHALL allow a user to manually navigate the Phase 1 cooking journey from splash to onboarding, authentication, home, ingredient scan, image preview, AI scanning, ingredient confirmation, preference selection, recipe recommendations, recipe detail, cooking assistant, cooking completion, and back to home.

#### Scenario: User starts the app and enters the main flow
- **WHEN** the user opens the app and proceeds through splash, onboarding, and authentication surfaces
- **THEN** the app provides a navigable path into the home experience without requiring live backend services

#### Scenario: User completes the recipe discovery and cooking flow
- **WHEN** the user follows the mock flow from home through scanning, confirming ingredients, selecting preferences, choosing a recipe, and starting cooking
- **THEN** the app navigates through each screen in sequence and reaches a cooking completion surface

### Requirement: The app SHALL present recipe discovery and cooking details
Recipe recommendation, recipe detail, and cooking assistant screens SHALL display recipe metadata, ingredient availability, missing ingredients, cooking difficulty, timing, step guidance, and AI assistant chat placeholders using locally defined mock content.

#### Scenario: User reviews recipe recommendations
- **WHEN** the user opens the recommendation screen after confirming preferences
- **THEN** the app shows recipe cards with match score, cooking time, difficulty, available ingredients, and missing ingredients

#### Scenario: User enters the cooking assistant
- **WHEN** the user starts cooking from a recipe detail screen
- **THEN** the app shows the current step, timer surface, navigation controls, and mock AI chat messages for the active cooking session

### Requirement: The app SHALL keep screens mobile-friendly and visually aligned
The cooking-flow screens SHALL use React Native primitives, safe-area-aware layouts, touch-friendly controls, and a warm cooking-oriented visual system that stays close to the Figma reference while remaining responsive on common phone sizes.

#### Scenario: A screen requires a layout derived from the Figma export
- **WHEN** the implementation translates a Figma-inspired layout into the mobile client
- **THEN** it uses mobile-compatible composition instead of fixed web positioning where possible

#### Scenario: A user interacts with the app using one hand on a phone
- **WHEN** the user moves through key actions such as scanning, confirming, continuing, and starting cooking
- **THEN** the app presents clear primary actions and accessible touch targets appropriate for handheld use
