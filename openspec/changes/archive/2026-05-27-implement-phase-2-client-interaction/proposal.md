## Why

Phase 1 established the Smart Cookbook AI mobile UI and navigation, but the app is still largely static: scan images are placeholders, core flow state is screen-local or mock-only, and favorites/history/profile data do not persist. Phase 2 is needed now to make the client-side experience genuinely interactive while preserving clean service boundaries for a later backend and AI integration phase.

## What Changes

- Add client-side camera and gallery integration so users can capture or select one or multiple images for a scan session.
- Introduce app-level state management for scan flow, recipe selection, cooking session progress, favorites, history, and profile/preferences.
- Add mock service boundaries for ingredient detection, recipe recommendation, cooking assistant step flow, and local persistence so Phase 3 can replace them with real APIs without rewriting screen logic.
- Update scan, recipe, cooking, favorites, history, and profile screens to read and write real local state instead of static screen-level mock values.
- Add local persistence for favorites, cooking history, and profile using AsyncStorage.
- Produce a new Phase 2 client interaction report in `docs/`.

## Capabilities

### New Capabilities
- `mobile-client-state-and-services`: Shared client-side state, mock service boundaries, and local persistence for the Smart Cookbook mobile app.

### Modified Capabilities
- `mobile-ui-foundation`: The app foundation now needs device integrations, state wiring, loading/error handling, and Phase 2 reporting on top of the Phase 1 shell.
- `mobile-core-cooking-flow`: The main cooking journey changes from a static mock flow to an interactive local flow driven by selected images, detected ingredients, preferences, recommendations, and cooking-session state.
- `mobile-library-and-profile-screens`: Favorites, history, and profile behavior changes from static mock rendering to persisted local data with empty states and basic updates.

## Impact

- Affected code: `mobile-app/src/` screens, navigation-adjacent flow logic, new store and service modules, and persistence utilities.
- New dependencies: Expo Camera, Expo Image Picker, Zustand, and AsyncStorage.
- Affected docs: new `docs/PHASE_2_CLIENT_INTERACTION_REPORT.md`.
- Systems: local mobile client only; backend and real AI integrations remain out of scope for this phase.
