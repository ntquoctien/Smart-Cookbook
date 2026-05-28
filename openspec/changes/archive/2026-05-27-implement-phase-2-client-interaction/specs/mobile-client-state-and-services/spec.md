## ADDED Requirements

### Requirement: The app SHALL manage shared client interaction state
The mobile client SHALL maintain shared state for selected images, detected ingredients, confirmed ingredients, selected diet goal, selected difficulty, selected recipe, current cooking session, favorites, cooking history, and user profile/preferences so that these values survive navigation transitions within the app flow.

#### Scenario: User moves across the scan and recommendation flow
- **WHEN** the user captures or selects images, confirms ingredients, and chooses preferences across multiple screens
- **THEN** those values remain available through shared client state without relying on hardcoded screen-local defaults

#### Scenario: User starts a cooking session from a selected recipe
- **WHEN** the user chooses a recipe and enters the cooking assistant
- **THEN** the current cooking session state includes the selected recipe and current step information

### Requirement: The app SHALL expose replaceable mock service boundaries
The mobile client SHALL provide dedicated mock services for ingredient detection, recipe recommendation, cooking session actions, and local persistence so that screens and stores do not depend directly on hardcoded arrays or storage primitives.

#### Scenario: Scan flow requests ingredient detection
- **WHEN** the user proceeds from selected images into AI scanning
- **THEN** the app invokes a vision mock service that simulates ingredient detection and returns normalized ingredient results

#### Scenario: Cooking assistant requests a follow-up response
- **WHEN** the user asks a question during cooking
- **THEN** the app invokes a cooking mock service that generates a mock assistant reply using the current recipe and step context

### Requirement: The app SHALL persist durable local user data
The mobile client SHALL persist favorites, cooking history, and user profile/preferences locally through AsyncStorage-backed utilities so that these values can be restored across app launches.

#### Scenario: User saves a favorite or completes a recipe
- **WHEN** the user saves a favorite recipe or completes cooking with a rating
- **THEN** the app writes the updated favorites and cooking history to local storage

#### Scenario: App initializes persisted data
- **WHEN** the app or a dependent screen loads persisted user data
- **THEN** favorites, history, and profile/preferences are restored from local storage before being rendered as ready state
