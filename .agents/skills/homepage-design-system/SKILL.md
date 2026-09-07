---
name: homepage-design-system
description: Preserve and extend the LIAN plastic-surgery website's established design system. Use for any UI, UX, page, component, responsive layout, interaction, content presentation, accessibility, or visual review task in this repository. Keep the warm ivory and blush editorial identity, reuse existing tokens and primitives, and require locale-aware implementation for every user-facing feature.
---

# Homepage Design System

Preserve the project's visual language while extending it consistently across new pages and features.

## Workflow

1. Read `MAIN_PAGE_PLAN.md` when the task changes information architecture, section order, content policy, SEO structure, or asset requirements.
2. Read `references/design-system.md` before making UI or UX decisions.
3. Inspect `src/app/globals.css` and existing components before adding tokens or primitives.
4. Reuse existing components in `src/components/ui/` and established section patterns where they fit.
5. Treat Korean and English as first-class layouts. Read the locale from the route and source every user-facing string from the locale dictionary.
6. Localize every internal link. Never add a route or CTA that silently drops the current locale.
7. Check desktop, tablet, mobile, keyboard use, reduced motion, text expansion, and contrast.
8. Run type checking, linting, and a production build after code changes.

## Non-negotiable rules

- Keep the site light, warm, restrained, and editorial. Do not adopt the reference site's dark wine theme.
- Use rose primarily for CTAs and emphasis, not as a full-page background.
- Prefer whitespace, typography, image scale, and asymmetry over decorative cards or heavy shadows.
- Keep one H1 per page and preserve semantic heading order.
- Keep visible copy outside components in localized content dictionaries.
- Preserve `prefers-reduced-motion` behavior and keyboard access for interactive UI.
- Do not claim medical outcomes or use unverifiable numbers, testimonials, doctors, facilities, or credentials.
- Do not generate a second design system for a new page. Extend the existing tokens and patterns.

## Reference

Read [references/design-system.md](references/design-system.md) for the token palette, typography, motion, image treatment, responsive behavior, and review checklist.
