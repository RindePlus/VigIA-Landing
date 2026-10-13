---
name: ui-design
description: Use when designing or implementing UI/UX — building visual interfaces from scratch, choosing color palettes, typography, spacing, aesthetic direction, dashboards, dark/light modes, charts and data visualization, accessibility, redesigning existing screens, or implementing the resulting design as React/Next.js components with Tailwind.
---

# Skill: UI Design

UI/UX guidance for designing and implementing interfaces. The skill is split into a compact entry point (this file) plus reference files in `references/` that get loaded on demand based on what the task needs. Covers both design decisions (visual hierarchy, color systems, layout, accessibility, aesthetic direction) and implementation conventions for the repo's stack.

## When to use this skill

- Designing a new screen, page, or component from scratch.
- Choosing or auditing a color palette, typography scale, or spacing system.
- Designing dashboards: layout, KPI placement, charts, sidebar structure.
- Picking light vs dark mode strategy or designing a dark mode pass.
- Auditing accessibility (WCAG contrast, tap targets, keyboard nav, focus states).
- Redesigning an existing screen — visual modernization, fixing usability issues, simplifying clutter.
- Picking an aesthetic direction (minimal vs maximal, editorial vs playful, etc.) for a new product or section.
- Designing data visualizations: choosing chart types, axes, units, colors for series.

## When NOT to use this skill

- Backend, API, schema, or data work.
- Pre-PR validation.

## Core workflow

Always run these four steps in order. Skipping discovery is the most common failure mode.

### Step 1 — Discovery

Don't draw or pixel anything until you know what you're solving for. The discovery questions in `references/discovery-questions.md` cover the full set; the four that block all design work are:

1. **Type of work** — is this (a) new design from scratch, (b) restructuring something existing, or (c) a new screen inside an existing design system? Each path has different constraints.
2. **Context and users** — who uses this, what task are they completing, on what device, in what context.
3. **Visual identity and modes** — does a design system exist? Brand colors? Typography? Single mode (light or dark) or dual mode?
4. **Technical constraints** — framework, component library, icon library, chart library, performance budget.

If the user can't or won't answer something, **state the assumption explicitly** ("assuming desktop-first, light mode default, no prior design system") so they can correct early. For restructure/extension scenarios (b/c), default to **conserving** existing elements unless explicitly told otherwise — see the "elements that need explicit confirmation" section in `references/discovery-questions.md`.

### Step 2 — Pick an aesthetic direction

Commit to **one** direction and execute it precisely. Brutally minimal, maximalist chaos, retro-futuristic, editorial, playful — they all work, the differentiator is intentionality. A design that could be reused unchanged for a SaaS B2B, a vet clinic, and a fitness app has no direction; it's generic. Catalog of directions and how to pick + execute each: `references/aesthetic-direction.md`.

### Step 3 — Execute

Apply the universal principles (next section) and load the references relevant to the task scope. Reference index below.

### Step 4 — Run the delivery checklist

End of this file. Treat it as a hard gate.

## Universal principles at a glance

Full detail in `references/principles.md`. The seven that compound:

- **Visual hierarchy** drives attention with size, position, and color. Important = bigger, bolder, or more colorful. Group related elements; order them by importance.
- **4 or 8px spacing grid.** Every margin, padding, and offset snaps to it. In Figma, set "nudge amount" to 8.
- **One sans-serif** is enough for product UI. Headers: letter-spacing -2% to -3%, line-height 110-120%. Very large type (70px+) needs manual kerning.
- **Consistency** in corner radius, sizes, colors, and typography across components. Use a single icon library; icon size matches the line-height of the text it accompanies.
- **Every interaction has visible feedback.** Buttons need hover, active, and disabled states; inputs need loading, error, and success states.
- **Kill redundant indicators.** If the UI already communicates the action, the arrow/label/stroke is noise.
- **Whitespace is part of the design.** Cramming is the easiest way to look amateur.

## Pro tips / cheat codes

- **Nested rounded corners.** When a rounded shape sits inside another, corners look uneven unless: `inner_radius = outer_radius - padding_distance`. In Figma, enable iOS Corner Smoothing.
- **Lose the lines.** Divider lines between rows usually add noise. Replace them with consistent spacing or subtle alternating row backgrounds.
- **User flow first.** Plan navigation, search, skip, back, and error states before designing screens. The gaps in these are what tag amateur work.
- **Fewer effects.** Heavy shadows + glows + saturated gradients = noise. Prefer subtle gradients (variations of the same color, not hue jumps) and soft light-gray shadows with high blur.

## Reference index

Load only what the task needs. Don't read all of these — the point of the split is that you pick.

| File | Load when… |
|---|---|
| [`references/discovery-questions.md`](references/discovery-questions.md) | Always first, on any new design or redesign task. The full discovery checklist and the rules for when to confirm vs change existing elements. |
| [`references/principles.md`](references/principles.md) | Drilling into hierarchy, spacing, typography rules, affordances, or feedback patterns. |
| [`references/color-system.md`](references/color-system.md) | Defining or auditing a color palette. Covers 60-30-10 (only as a starter heuristic), the 4-layer system for product, OKLCH, semantic colors, and brand adaptation. |
| [`references/modes.md`](references/modes.md) | Designing for light, dark, or both. Covers the mono-mode vs dual-mode decision and its downstream cost. |
| [`references/mobile.md`](references/mobile.md) | Designing for mobile: navigation, layout, gestures, empty states. |
| [`references/dashboards.md`](references/dashboards.md) | Designing dashboards or admin tools: sidebar, KPI layout, interaction patterns (popover/modal/toast), tables, snappiness. |
| [`references/data-visualization.md`](references/data-visualization.md) | Designing charts: legibility, axes, units, when labels are non-negotiable. |
| [`references/components.md`](references/components.md) | UI element specifics: cards, pricing, buttons, icons, modals, footers, chips, carousels. |
| [`references/aesthetic-direction.md`](references/aesthetic-direction.md) | Picking and committing to a visual direction. Catalog of directions, typography distinctiveness, anti-patterns that look "AI default". |
| [`references/accessibility-and-ux-laws.md`](references/accessibility-and-ux-laws.md) | Auditing or designing for WCAG compliance, applying Laws of UX (Hick, Fitts, Miller, etc.), forgotten states (loading/empty/error), forms, microcopy, responsive breakpoints. |

## Anti-patterns to never ship

These tag a design as "AI-generated SaaS default". Treat them as red flags during review:

- **Default fonts** — Inter, Roboto, Arial, system fonts without justification.
- **Cliché color schemes** — purple-to-pink gradients, blue-to-purple CTAs, pastel rainbows, "modern dark mode" with `#1a1a1a` as the only dark.
- **Predictable layouts** — centered hero with giant CTA over lorem ipsum, three-column features with icon-title-text, circular-photo testimonials.
- **Identical component patterns** — same border-radius for everything, default offset 0/4/12 shadows, modals that always appear with scale + opacity and nothing else.
- **Cookie-cutter anything** — if the design could serve three unrelated industries unchanged, it has no direction.

## Implementation conventions (this repo)

Stack: **Next.js 15 (App Router, standalone) + React 19 + TypeScript `strict: true` + Tailwind 4**.

### File structure

```
frontend/src/
├── app/                    App Router routes (page.tsx, layout.tsx, route.ts).
├── components/             Reusable components (PascalCase.tsx), subcarpetas por feature.
├── contexts/               Providers + hooks de Context API (XxxContext.tsx).
├── lib/                    Data hooks (useCamelCase.ts), utils, __tests__/.
└── utils/                  Pure utilities (camelCase.ts).
```

### Key rules

- **Naming**: components `PascalCase.tsx`, hooks `useCamelCase.ts`, utils `camelCase.ts`.
- **`'use client'`** on first line only if the component uses hooks or interactivity. Default is Server Component.
- **Props**: always typed with a separate `interface`, no `React.FC`. Default export for components, named exports for hooks/utils/types.
- **State**: Context API only (no Redux/Zustand). Pattern: provider + custom hook in `contexts/<Feature>Context.tsx`.
- **Styles**: Tailwind 4 classes inline in JSX. No CSS modules, no styled-components.
- **TypeScript**: `strict: true`, avoid `any`, use `@/*` alias for `src/*`.
- **Testing**: Vitest + @testing-library/react. Tests in `src/lib/__tests__/` or colocated as `Component.test.tsx`. Test non-trivial logic at minimum.

## Delivery checklist

Run this before declaring done. Each item is a hard gate.

**Design:**
- [ ] Clear visual hierarchy on every screen.
- [ ] Similar elements look identical (same radius, padding, color).
- [ ] Every interaction has feedback (hover, active, disabled, loading).
- [ ] Spacing follows a 4 or 8px grid.
- [ ] Color palette has a neutral foundation (4 background levels, strokes ~85% white) and functional scales — not single hex values.
- [ ] Light and dark modes have independent palettes (not inverses), with shades more spaced apart in dark mode.
- [ ] Semantic colors (red destructive, green success, etc.) are respected even when off-brand.
- [ ] Charts read in 3 seconds without explanation.
- [ ] All redundant elements removed (extra lines, labels, arrows).
- [ ] WCAG AA contrast met on all text/background combinations.
- [ ] Tap targets ≥44px on mobile.
- [ ] Forgotten states (loading, empty, error) are designed, not just the happy path.

**Implementation:**
- [ ] `'use client'` only where needed.
- [ ] Props typed with `interface`, no `any`.
- [ ] `npm run lint` passes without type warnings.
- [ ] Responsive tested (mobile + desktop).
- [ ] Non-trivial logic has a Vitest test.
- [ ] No console.log or debug code left behind.
- [ ] Styles use Tailwind (no inline CSS except dynamic values).
- [ ] Imports use `@/*` alias.
