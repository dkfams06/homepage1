<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

- Use the repository skill `$homepage-design-system` for every UI, UX, layout, component, responsive, accessibility, or visual-review change.
- Use `$homepage-image-generation` for project image planning, generation, revision, review, and asset placement.
- Keep all public routes locale-prefixed and preserve the current locale in internal links.
- Add every user-facing string, metadata value, accessibility label, form state, and image alt text to all four dictionaries (`ko.json`, `en.json`, `zh.json`, and `ja.json`) in the same change.
- Run `npm run check:i18n`, `npx tsc --noEmit`, `npm run lint`, and `npm run build` after user-facing feature changes.
