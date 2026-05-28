## Context

Phase 1 delivered a complete Expo/React Native UI shell with navigation, reusable components, mock data, and documentation, but the user journey still depends on static placeholders and screen-local values. The scan flow does not use real camera or gallery APIs, selected images are not carried across screens, recipe and cooking logic are not organized behind service boundaries, and favorites/history/profile data are not persisted.

Phase 2 introduces cross-cutting client behavior across screen modules, device integrations, service abstractions, and app-wide state. The repository already contains the visual system, screen inventory, and mock domain data needed to preserve the Phase 1 UX while upgrading the app into an interactive local client.

Key constraints:
- Keep the app backend-free and AI-free for this phase.
- Preserve the current UI direction rather than redesigning screens.
- Keep service interfaces replaceable by future backend/AI APIs.
- Support local persistence for user-facing state without introducing server dependencies.
- Work within the existing Expo SDK 54 mobile setup.

## Goals / Non-Goals

**Goals:**
- Replace placeholder scan behavior with real Expo Camera and Expo Image Picker integration.
- Introduce a centralized client state layer for scan sessions, confirmed ingredients, preferences, selected recipe, cooking session, favorites, history, and profile.
- Move scan, recommendation, cooking, and persistence logic into dedicated mock services and storage utilities instead of embedding logic directly in screens.
- Persist favorites, cooking history, and profile/preferences locally with AsyncStorage.
- Add user-visible loading and error handling for scan permissions, image selection, AI mock delays, empty results, and empty persisted libraries.
- Produce a Phase 2 report documenting dependencies, architecture, validation, and next steps.

**Non-Goals:**
- Real AI inference, backend APIs, cloud persistence, or authentication services.
- Major redesign of existing screens, navigation structure, or design tokens.
- Production-grade synchronization, conflict resolution, or offline queueing.
- Rich image preprocessing or high-fidelity computer vision behavior beyond mock simulation.

## Decisions

### Use Zustand for shared client state
The app SHALL use a centralized Zustand store because Phase 2 introduces multi-screen flow state that must survive navigation transitions and remain simple to hydrate from local persistence. Zustand is small, React Native friendly, and avoids forcing a broader architectural rewrite.

Alternatives considered:
- Continue with screen-local `useState`: rejected because the scan and cooking flows now span multiple screens and services.
- React Context only: rejected because it would couple unrelated state concerns and create noisier update patterns.

### Isolate business behavior behind mock services
Vision, recipe recommendation, cooking assistant progression, and storage SHALL be expressed through dedicated service modules. Screens and stores can call these services today, and Phase 3 can later swap implementations without screen rewrites.

Alternatives considered:
- Put all logic directly inside screens: rejected because it would entangle UI with replaceable service concerns.
- Put all logic directly inside the store: rejected because it would make it harder to replace mock implementations with real API clients later.

### Represent scan progress as a dedicated session in shared state
Selected images, detected ingredients, confirmed ingredients, preferences, and selected recipe SHALL be stored as a coherent scan/recommendation session so that scan, preview, confirmation, recommendation, and detail screens all operate on the same state snapshot.

Alternatives considered:
- Pass images and ingredient arrays through navigation params only: rejected because it becomes brittle as the flow grows and complicates persistence or retries.
- Persist every transient scan step to storage: rejected because it adds unnecessary complexity for a single-session Phase 2 flow.

### Persist durable user data only
Favorites, cooking history, and profile/preferences SHALL be written to AsyncStorage, while temporary scan and cooking-session state SHALL remain in memory unless explicitly completed or saved.

Alternatives considered:
- Persist everything: rejected because transient scan/cooking state does not need long-term storage yet and would make recovery behavior ambiguous.
- Persist nothing: rejected because local library/profile interactions are a core Phase 2 goal.

### Keep device integrations minimal and permission-aware
Camera and gallery integrations SHALL request permissions when needed, handle denial gracefully, and support one or multiple selected images. The UX should remain close to the existing Phase 1 screens rather than introducing custom device-heavy flows.

Alternatives considered:
- Full custom capture pipeline with advanced camera controls: rejected as too large for this phase.
- Gallery-only integration: rejected because the brief explicitly requires Expo Camera support.

## Risks / Trade-offs

- [Expo Camera or Image Picker behavior differs across devices] → Keep the APIs wrapped behind store/service-driven flows and surface clear fallback/error messaging.
- [AsyncStorage hydration races with first render] → Add explicit initialization and loading states before reading persisted favorites/history/profile screens.
- [State shape grows quickly across scan and cooking flow] → Separate durable data, transient session state, and service helpers rather than placing every concern in a flat store.
- [Mock recommendation logic may feel simplistic] → Keep the ranking algorithm deterministic and documented so it can be replaced cleanly in Phase 3.
- [Multiple-image support increases edge cases] → Normalize selected asset objects into a single session shape and handle zero-image and permission-denied branches explicitly.

## Migration Plan

1. Inspect the current Phase 1 screen, data, and report structure to identify the best extension points.
2. Install and configure Expo Camera, Expo Image Picker, Zustand, and AsyncStorage.
3. Introduce client state types, a shared store, and storage hydration helpers.
4. Build mock service modules for vision, recipe recommendation, cooking progression, and persistence.
5. Update scan screens to use camera/gallery selection, shared scan state, and mock detection.
6. Update recipe, cooking, favorites, history, and profile screens to use store/service-driven data and persistence.
7. Run typecheck and practical Expo validation, then document outcomes in the Phase 2 report.

Rollback strategy:
- This is a local client-side phase, so rollback is a normal source revert of the Phase 2 change if device integrations or state architecture prove unsuitable.

## Open Questions

- Whether Phase 2 should persist in-progress cooking sessions, or keep them intentionally ephemeral until backend support exists.
- Whether image asset metadata should include thumbnails or only URI/type information for the current UX needs.
- Whether the current profile screen already exposes enough editable fields to satisfy “basic profile/preferences update” without adding new UI controls.
