## MODIFIED Requirements

### Requirement: The app SHALL support the primary cooking journey
The mobile client SHALL allow a user to complete the Phase 2 cooking journey from splash to onboarding, authentication, home, ingredient scan, image preview, AI scanning, ingredient confirmation, preference selection, recipe recommendations, recipe detail, cooking assistant, cooking completion, and back to home using real local scan-session state instead of static placeholder-only transitions.

#### Scenario: User starts a scan with camera or gallery images
- **WHEN** the user captures or selects one or multiple images in the scan entry flow
- **THEN** the selected images are stored in a shared scan session and carried through preview, AI scanning, ingredient confirmation, recommendation, and recipe selection steps

#### Scenario: User completes the recipe discovery and cooking flow
- **WHEN** the user follows the flow from image selection through ingredient confirmation, preference selection, recipe choice, cooking, and completion
- **THEN** the app navigates through each screen using shared session state and reaches a cooking completion surface that can write local outcomes

### Requirement: The app SHALL present recipe discovery and cooking details
Recipe recommendation, recipe detail, and cooking assistant screens SHALL display recipe metadata, ingredient availability, missing ingredients, cooking difficulty, timing, step guidance, and assistant chat behavior using shared state and mock service outputs rather than static screen-local recipe selection.

#### Scenario: User reviews recommendation results after confirming preferences
- **WHEN** the user opens the recommendation screen after ingredient confirmation and preference selection
- **THEN** the app uses the recipe mock service to rank recipes by best match and fewest missing ingredients based on the confirmed ingredient set and selected preferences

#### Scenario: User interacts with the cooking assistant
- **WHEN** the user starts cooking from a recipe detail screen
- **THEN** the app creates a current cooking session, supports previous/next step navigation, accepts mock user questions, and appends mock assistant replies using the cooking mock service

### Requirement: The app SHALL keep screens mobile-friendly and visually aligned
The cooking-flow screens SHALL use React Native primitives, safe-area-aware layouts, touch-friendly controls, and a warm cooking-oriented visual system that stays close to the Figma reference while remaining responsive on common phone sizes, even when rendering real selected images, permission states, loading states, and empty or no-result outcomes.

#### Scenario: A screen needs a layout derived from the Figma export with real client data
- **WHEN** the implementation translates a Figma-inspired layout into the mobile client while showing selected images, detected ingredients, recommendation results, or chat updates
- **THEN** it uses mobile-compatible composition instead of fixed web positioning where possible

#### Scenario: A user encounters a scan or recommendation edge case
- **WHEN** camera permission is denied, no image is selected, AI scanning is still in progress, or no recipes match the chosen inputs
- **THEN** the app presents clear loading, empty, or error states without breaking the main flow

## ADDED Requirements

### Requirement: The app SHALL integrate device image capture and selection
The mobile client SHALL support Expo Camera capture and Expo Image Picker gallery selection for one or multiple images within the scan flow.

#### Scenario: User captures images with the camera
- **WHEN** the user grants camera permission and captures one or more images
- **THEN** the app stores the captured images in the active scan session and shows them on the preview screen

#### Scenario: User selects images from the gallery
- **WHEN** the user opens the gallery picker and selects one or multiple images
- **THEN** the app stores the selected images in the active scan session and shows them on the preview screen
