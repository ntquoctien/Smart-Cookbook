## MODIFIED Requirements

### Requirement: The app SHALL support the primary cooking journey
The mobile client SHALL allow a user to complete the Phase 3 cooking journey from splash to onboarding, authentication, home, ingredient scan, image preview, AI scanning, ingredient confirmation, preference selection, recipe recommendations, recipe detail, cooking assistant, cooking completion, and back to home using real local scan-session state and backend-powered ingredient detection when available.

#### Scenario: User starts a scan with camera or gallery images
- **WHEN** the user captures or selects one or multiple images in the scan entry flow
- **THEN** the selected images are stored in a shared scan session and carried through preview, backend AI scanning, ingredient confirmation, recommendation, and recipe selection steps

#### Scenario: User completes the recipe discovery and cooking flow
- **WHEN** the user follows the flow from image selection through ingredient confirmation, preference selection, recipe choice, cooking, and completion
- **THEN** the app navigates through each screen using shared session state and reaches a cooking completion surface that can write local outcomes

### Requirement: The app SHALL keep screens mobile-friendly and visually aligned
The cooking-flow screens SHALL use React Native primitives, safe-area-aware layouts, touch-friendly controls, and a warm cooking-oriented visual system that stays close to the Figma reference while remaining responsive on common phone sizes, even when rendering real selected images, backend scanning states, permission states, loading states, and empty or no-result outcomes.

#### Scenario: A screen needs a layout derived from the Figma export with real client data
- **WHEN** the implementation translates a Figma-inspired layout into the mobile client while showing selected images, detected ingredients, recommendation results, or chat updates
- **THEN** it uses mobile-compatible composition instead of fixed web positioning where possible

#### Scenario: A user encounters a scan or recommendation edge case
- **WHEN** camera permission is denied, no image is selected, backend scanning is unavailable, AI scanning is still in progress, no ingredients are detected, or no recipes match the chosen inputs
- **THEN** the app presents clear loading, empty, or error states without breaking the main flow

## ADDED Requirements

### Requirement: The app SHALL hide technical detection details from ingredient confirmation
The Ingredient Confirmation UI SHALL display only ingredient name, quantity/count, and unit for detected ingredients and SHALL NOT display confidence score, bounding boxes, class IDs, raw model labels, or debug JSON.

#### Scenario: User reviews backend-detected ingredients
- **WHEN** the user opens Ingredient Confirmation after backend detection succeeds
- **THEN** each detected ingredient is presented as editable user-facing ingredient information such as `Trứng gà — 3 quả`

#### Scenario: Backend debug data exists
- **WHEN** backend debug mode returns technical detection details
- **THEN** the mobile UI does not render confidence scores, bounding boxes, class IDs, raw labels, or debug JSON to the user
