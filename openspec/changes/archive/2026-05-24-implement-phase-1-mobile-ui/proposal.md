## Why

The repository already contains a Figma export and a placeholder `mobile-app/` directory, but it does not yet define an implementation-ready contract for turning that reference into a clean React Native/Expo UI. Phase 1 needs a clear proposal now so the team can build the mobile shell, core cooking flow, and supporting screens without copying unsupported web-export patterns into the app.

## What Changes

- Add a Phase 1 mobile UI foundation for the Smart Cookbook AI app in `mobile-app/`, aligned with Expo, React Native, and TypeScript conventions.
- Define reusable design tokens, shared UI components, mock data, and navigation structure required to support the first end-to-end cooking flow.
- Implement the core user-facing screens for authentication, ingredient scanning, recipe recommendation, recipe detail, cooking assistant, completion, favorites, history, and profile using mobile-compatible patterns.
- Produce implementation reports under `docs/` that capture Figma analysis, UI foundation decisions, implementation outcomes, and review results.

## Capabilities

### New Capabilities
- `mobile-ui-foundation`: App initialization, design tokens, shared components, mock data, and project structure for the Expo/React Native client.
- `mobile-core-cooking-flow`: Navigation and screens covering splash, onboarding, auth, home, scan, preview, AI scanning, ingredient confirmation, preferences, recommendations, recipe detail, cooking assistant, and completion.
- `mobile-library-and-profile-screens`: Supporting favorites, cooking history, and profile screens needed for a coherent Phase 1 user experience.

### Modified Capabilities
- None.

## Impact

- Affected code: `mobile-app/` application source, configuration, and supporting assets.
- Affected documentation: new Phase 1 reports in `docs/`.
- Dependencies: Expo/React Native runtime packages, React Navigation stack/tab dependencies, safe area support, and gesture-handler support if not already present.
- Systems: local mobile UI only; no backend, database, or production AI integration is included in this phase.
