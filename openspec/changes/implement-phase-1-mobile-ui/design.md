## Context

The Smart Cookbook repository contains a Figma export in `figma-reference/`, an existing `mobile-app/` directory, and project documentation describing an AI-assisted cooking flow. The immediate need is a Phase 1 mobile UI implementation that is visually aligned with the Figma reference but translated into React Native and Expo-compatible code instead of reusing unsupported web export patterns.

This change spans multiple modules inside the mobile client: project bootstrapping, navigation, design tokens, reusable components, feature screens, mock data, and engineering reports. The work also introduces external app-shell dependencies such as React Navigation, safe area handling, and gesture support, which makes a technical design useful before implementation.

Key constraints:
- Prefer Expo + React Native + TypeScript.
- Keep the flow runnable with mock data only.
- Use the Figma export as a visual reference, not as direct source code.
- Preserve any existing `mobile-app/` files unless they are incompatible and intentionally replaced.

## Goals / Non-Goals

**Goals:**
- Establish a clean Expo-compatible source structure inside `mobile-app/`.
- Convert the Figma direction into reusable design tokens and React Native components.
- Implement the primary Phase 1 user journey from splash through cooking completion plus supporting favorites, history, and profile screens.
- Provide local navigation and mock data so the flow can be exercised manually without backend dependencies.
- Produce implementation reports in `docs/` to document analysis, setup, implementation scope, and validation results.

**Non-Goals:**
- Backend integration, real AI inference, authentication services, or production camera upload flows.
- Pixel-perfect recreation of unsupported Figma export details such as absolute-positioned web layouts.
- Final production polish for accessibility, localization, analytics, persistence, or offline behavior.

## Decisions

### Use Expo + TypeScript as the implementation baseline
The app SHALL be built on Expo with TypeScript because the requested stack prioritizes fast mobile iteration, common React Native primitives, and straightforward local validation.

Alternatives considered:
- Bare React Native: rejected for higher setup cost and lower iteration speed for this phase.
- Reusing exported Figma code directly: rejected because web-oriented output is likely to contain unsupported DOM, CSS, and layout assumptions.

### Translate Figma into tokens and components instead of one-off screen styling
Colors, spacing, typography, radius, and shadow styles SHALL be captured as shared tokens, and common controls SHALL be implemented as reusable components. This keeps the Phase 1 UI consistent across 15+ screens and reduces duplication during later phases.

Alternatives considered:
- Screen-local styles only: faster initially, but it creates drift and makes later refinement expensive.
- NativeWind-first styling: only acceptable if already configured cleanly; otherwise standard `StyleSheet` is the safer default for a fresh or uncertain Expo setup.

### Build the flow around a root stack plus bottom tabs
Navigation SHALL separate auth/onboarding and in-app surfaces while keeping the main experience reachable through a root stack and tab structure. Tabs cover Home, Scan, Favorites, History, and Profile, while the stack owns forward-progress screens such as preview, scanning, recommendations, detail, cooking assistant, and completion.

Alternatives considered:
- Single monolithic stack: simpler but weaker for tab persistence and main app ergonomics.
- Deep nested navigators with feature-isolated stacks: more scalable later, but unnecessary complexity for Phase 1.

### Use mock data and placeholders for unstable integrations
Recipes, ingredients, cooking sessions, chat messages, and image placeholders SHALL be represented with local mock data. Camera and media selection MAY remain placeholder UI if camera packages are not already configured or would slow delivery.

Alternatives considered:
- Adding early backend contracts: rejected because the task explicitly targets mock-first UI.
- Shipping partially implemented empty screens: rejected because Phase 1 is meant to validate the full manual flow end to end.

### Record implementation findings in docs as part of deliverables
The implementation SHALL generate four markdown reports under `docs/` covering Figma analysis, UI foundation, implementation summary, and review findings. This makes the result auditable and reduces rediscovery work during later phases.

Alternatives considered:
- Only code changes without reports: rejected because the request explicitly requires documented analysis and validation outcomes.

## Risks / Trade-offs

- [Figma export uses web-only layout or styling conventions] -> Rewrite those surfaces with React Native primitives and document where visual parity is intentionally approximate.
- [Existing `mobile-app/` state may conflict with Expo defaults] -> Inspect before replacing, preserve compatible files, and document assumptions in the foundation report.
- [Large screen count increases inconsistency risk] -> Centralize tokens, build reusable cards/chips/input patterns, and reuse mock data shapes across screens.
- [Navigation complexity may introduce type or route mismatches] -> Define shared route/type models early and run TypeScript validation before finalizing.
- [Camera/gallery dependencies may delay Phase 1] -> Keep capture UX navigable with placeholders and defer device integration to a later phase.

## Migration Plan

1. Inspect `figma-reference/` to determine export type, recover reusable assets, and extract design patterns.
2. Inspect `mobile-app/` to determine whether to adapt an existing Expo app or initialize one.
3. Install or configure core app dependencies needed for navigation and safe rendering.
4. Create the source structure, tokens, shared components, and mock data.
5. Implement navigation and screens in the main cooking flow first, then supporting library/profile surfaces.
6. Run available install, typecheck, lint, and startup validation commands; fix obvious issues.
7. Produce the required reports in `docs/`.

Rollback strategy:
- Because this is a local pre-release UI phase, rollback is file-based: revert the change branch or the change directory if the implementation proves unsuitable.

## Open Questions

- Whether `mobile-app/` already includes Expo, TypeScript, or styling conventions that should be preserved rather than replaced.
- Whether the Figma export includes mobile-ready assets or only layout code that must be translated manually.
- Whether placeholder camera/gallery screens are sufficient for current stakeholder review, or whether Expo Camera setup is expected immediately in Phase 2.
