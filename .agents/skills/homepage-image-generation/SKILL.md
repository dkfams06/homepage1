---
name: homepage-image-generation
description: Plan, generate, review, and save AI-created raster imagery for the LIAN plastic-surgery website. Use when creating or revising hero-adjacent editorials, treatment-category images, body or inquiry visuals, blog thumbnails, or other project image slots. Use Codex built-in image generation without an API key, match the approved hero art direction, and never fabricate clinical evidence, doctors, facilities, credentials, patients, or testimonials.
---

# Homepage Image Generation

Create a coherent beauty-editorial image system that matches the approved hero while preserving medical trust.

## Workflow

1. Read `references/image-manifest.md` to identify the exact slot, ratio, pixel target, output path, and whether generation is allowed.
2. Inspect `public/images/hero.png` with the image viewer before the first generation in a task. Treat it as a style reference, not an edit target, unless the user explicitly requests an edit.
3. Use the built-in image generation tool. Do not use an API key, SDK, CLI generator, or one-off script for normal project generation.
4. Generate each distinct asset with its own prompt and its exact web composition. Do not use one generic batch prompt for different slots.
5. Review anatomy, skin texture, crop safety, negative space, lighting, palette, unwanted text, and similarity to a real identifiable person.
6. Make one targeted revision at a time when an output misses the brief.
7. Save the selected final to the exact path in the manifest. Do not overwrite an approved existing asset without explicit permission; keep rejected or alternate versions as `-v2`, `-v3`, and so on.
8. Verify dimensions, aspect ratio, format, and file size. Prefer JPEG and target 400KB or less when visual quality remains acceptable.
9. Report the final path, the final prompt, and that the built-in generation path was used.

## Prompt skeleton

Use case: photorealistic-natural  
Asset type: LIAN plastic-surgery website `<slot>`  
Primary request: Create `<subject and scene>`  
Reference: Match the lighting, warmth, refined calm, realistic skin, and blush floral editorial mood of `public/images/hero.png` without copying its exact person or composition  
Composition: `<ratio, subject placement, crop-safe area, HTML text negative space>`  
Lighting: soft natural daylight  
Palette: warm ivory, blush pink, peach rose, subtle champagne beige  
Constraints: adult Korean or East Asian subject when a person is required; realistic anatomy and skin; no embedded copy  
Avoid: plastic skin, exaggerated surgery cues, needles, blood, bruising, watermark, logo, text, neon pink, purple lighting, anatomy errors, celebrity likeness, clinical before-and-after implications

Keep prompts concrete and concise. Do not put Korean or English UI copy inside the generated image; the website renders text as localized HTML.

## Evidence boundary

Stop and request a real supplied asset for:

- doctors or staff presented as real people;
- Before & After or any claimed treatment result;
- clinic interiors or equipment presented as the actual facility;
- certificates, awards, memberships, or credentials;
- testimonial authors or patient stories presented as real.

AI placeholders for internal layout review must be visibly treated as placeholders and must not ship as evidence.

## Reference

Read [references/image-manifest.md](references/image-manifest.md) for project paths and slot-specific art direction.
