# LIAN design system reference

## Design idea

Combine warm premium beauty-editorial art direction with clear, trustworthy medical information. The emotional register is natural, delicate, balanced, private, calm, and precise.

Use the Rejuvita reference only for section rhythm, editorial composition, and interaction patterns. Do not copy its dark charcoal and wine palette.

## Color tokens

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#FBF7F4` | warm ivory primary background |
| `--bg-blush` | `#F7EBE8` | alternating blush section |
| `--ink` | `#2E1E1C` | primary text |
| `--ink-muted` | `#7A6560` | secondary text |
| `--rose` | `#B0525F` | CTA and meaningful emphasis |
| `--rose-soft` | `#E49C9C` | decoration only; not body text |
| `--rose-tint` | `#F7E3E1` | tags and quiet surfaces |
| `--champagne` | `#C4AE93` | dividers and restrained accents |
| `--border` | `#E8DED6` | borders |

Maintain at least WCAG AA contrast. Known anchors: ink on background is about 14.9:1; white on rose is about 5.0:1. Never use rose-soft for normal text.

## Typography

- Use Cormorant Garamond for restrained English display text.
- Use Noto Serif KR for Korean editorial headings.
- Use Noto Sans KR for body text and controls.
- Keep headings short with generous line height. Limit paragraph measure to roughly 44–52 characters where practical.
- Allow English translations to expand without clipping, fixed-height text boxes, or fragile forced line breaks.

## Layout and components

- Use a maximum content width near 1280px with generous responsive side padding.
- Alternate warm ivory and quiet blush sections to establish rhythm.
- Prefer large imagery, whitespace, asymmetric two-column layouts, and alternating image direction.
- Use square corners and fine borders more often than rounded cards and shadows.
- Maintain clear CTA hierarchy: filled rose primary, outlined secondary, underlined quiet link.
- Keep the established path from brand recognition to philosophy, services, evidence, team, inquiry, and visit information.

## Motion

- Use slow fades, small vertical reveals, restrained image scaling, and continuous marquee movement.
- Pause automatic motion on hover, focus, touch, or user request.
- Honor `prefers-reduced-motion` and keep every interaction usable without animation.
- Avoid bounce, aggressive zoom, spins, and attention-seeking cursor effects.

## Images

- Match `public/images/hero.png`: soft natural daylight, warm ivory, blush pink, peach rose, realistic skin, and calm editorial framing.
- Leave intentional negative space for HTML copy. Never bake page copy or buttons into images.
- Do not present generated people as real doctors, patients, reviewers, or staff.
- Use real consented assets for doctors, facilities, credentials, testimonials, and Before & After evidence.

## Localization guardrails

- Keep locale-prefixed routes such as `/ko/...` and `/en/...`.
- Add copy to both locale dictionaries in the same change.
- Localize metadata, navigation, form labels, validation/status text, accessibility labels, image alt text, and internal URLs.
- Format dates, numbers, and contact information for the active locale where presentation differs.
- Verify text expansion at 130% and do not rely on Korean-only word length.

## Review checklist

- Does the result look like the existing site rather than a separate theme?
- Are all colors token-based and contrast-safe?
- Is every visible string localized?
- Do internal links preserve the locale?
- Is the heading hierarchy semantic?
- Are interactive elements keyboard and touch accessible?
- Does reduced motion remain usable?
- Are medical claims and evidence clearly distinguished from illustrative imagery?
