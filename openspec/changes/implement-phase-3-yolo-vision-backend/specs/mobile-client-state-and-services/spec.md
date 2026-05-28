## MODIFIED Requirements

### Requirement: The app SHALL expose replaceable mock service boundaries
The mobile client SHALL provide dedicated service boundaries for ingredient detection, recipe recommendation, cooking session actions, and local persistence so that screens and stores do not depend directly on hardcoded arrays, storage primitives, or backend transport details. The ingredient detection boundary SHALL call the Phase 3 backend vision API when configured and available, while retaining the mock vision service as a fallback or development-mode option.

#### Scenario: Scan flow requests ingredient detection
- **WHEN** the user proceeds from selected images into AI scanning
- **THEN** the app invokes the backend vision API service for one or more selected image URIs and normalizes the returned ingredient results into shared client state

#### Scenario: Backend vision API is unavailable
- **WHEN** the backend vision API times out, cannot be reached, or returns an invalid response
- **THEN** the app shows a friendly scan error or fallback state and can still use the mock vision service or manual ingredient entry without breaking the scan flow

#### Scenario: Cooking assistant requests a follow-up response
- **WHEN** the user asks a question during cooking
- **THEN** the app invokes a cooking mock service that generates a mock assistant reply using the current recipe and step context

## ADDED Requirements

### Requirement: The app SHALL normalize backend ingredient results
The mobile client SHALL convert backend vision API responses into the app's detected and confirmed ingredient state using user-facing ingredient name, quantity, and unit values.

#### Scenario: Backend returns detected ingredients
- **WHEN** the backend returns ingredients with `name`, `quantity`, and `unit`
- **THEN** the app stores those values in detected ingredient state without requiring confidence scores, bounding boxes, class IDs, raw labels, or debug JSON

#### Scenario: Backend returns no detections
- **WHEN** the backend returns a successful empty ingredient list and no-detection message
- **THEN** the app presents a friendly no-detection state and allows the user to add ingredients manually
