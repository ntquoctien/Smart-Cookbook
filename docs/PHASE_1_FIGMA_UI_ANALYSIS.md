# Phase 1 Figma UI Analysis

## Figma export folder structure

- Source folder: `figma-reference/Smart Cookbook AI Mobile UI/`
- Toolchain detected:
  - `package.json`
  - `vite.config.ts`
  - `index.html`
  - `postcss.config.mjs`
  - `src/styles/*.css`
- App structure detected:
  - `src/app/App.tsx`
  - `src/app/components/screens/*`
  - `src/app/components/shared/data.ts`
  - `src/app/components/shared/UIComponents.tsx`
  - `src/app/components/ui/*`

## Exported code type

- Export type: React web app built with Vite.
- Styling type: CSS files plus theme tokens and shadcn-like UI primitives.
- Interaction layer: DOM components (`div`, `img`, `button`) and web-only layout techniques.
- Conclusion: not React Native compatible as-is.

## Screens, components, and assets found

- Screen coverage found in export:
  - Splash
  - Onboarding
  - Login
  - Register
  - Home
  - Camera Scan
  - Image Preview
  - AI Scanning
  - Ingredient Confirm
  - Preference
  - Recipe Recommend
  - Recipe Detail
  - Cooking Assistant
  - Cooking Completed
  - Favorite Recipes
  - Cooking History
  - Profile
- Shared design patterns found:
  - Search bar
  - Recipe cards
  - Preference chips
  - Bottom navigation
  - CTA cards
  - Stats blocks
  - AI chat bubbles
- Assets found:
  - No React Native-ready image asset set.
  - Google-font usage via CSS import.

## Colors, fonts, and layout patterns found

- Dominant warm palette recovered from the export and project brief:
  - Primary orange around `#FF7A45`
  - Orange dark accent around `#E35C23`
  - Background cream around `#FFF8F0`
  - Surface white
  - Healthy green accent around `#4CAF50`
- Typography:
  - `Nunito Sans` was used throughout the Figma export.
- Layout patterns:
  - Rounded cards and pill chips
  - Gradient hero sections
  - Large food imagery
  - Soft shadowed surfaces
  - Simulated phone frame in web preview
  - Horizontal carousels for recipes and categories

## What can be reused

- Information architecture for the user flow.
- Screen naming and sequencing.
- Visual direction:
  - warm palette
  - rounded geometry
  - strong CTA hierarchy
  - recipe-first layout
- Copy/content patterns for onboarding, home, and recipe screens.

## What must be rewritten

- All web primitives:
  - `div`
  - `span`
  - `button`
  - `img`
- CSS-driven layouts and theme files.
- shadcn/Radix web UI components.
- The simulated device chrome and browser-only layout wrappers.
- Motion and DOM behavior tied to the web export.

## Risks

- The export is visually useful but structurally web-specific, so pixel-perfect translation would slow Phase 1 unnecessarily.
- Image assets are not packaged for mobile, so Phase 1 relies on remote placeholders.
- The camera flow in the brief is broader than current device integration requirements, so Phase 1 uses a placeholder capture surface.
