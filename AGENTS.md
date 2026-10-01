# Publishing rules

## Workflow

- Use this existing checkout; cloud tasks are already isolated. Do not create a worktree unless the user requests one.
- Use Node.js 24 and `npm ci`; keep `package-lock.json` committed. Astro is the sole direct dependency. Prefer Astro/Markdown/CSS capabilities before adding packages.
- Run `npm test` after publishing or code changes. Start `npm run dev` for local review. Production output is `dist/`, with `npm run preview` for production checks.
- Keep the site static and deployable to Cloudflare Pages. Do not add a database, login, analytics, external font services, or client JavaScript without a specific user request.

## Articles

- Store articles as UTF-8 Markdown in `src/content/articles/`.
- Require meaningful title, description, category, quoted valid `YYYY-MM-DD` date, and a unique permanent lowercase hyphenated slug. Tags are a list. Set `lang` to `zh-CN` or `en` as appropriate.
- Never change the slug of a published article as part of an ordinary edit. If explicitly requested, preserve the old URL with a Cloudflare Pages redirect in `public/_redirects`.
- Preserve original publication dates unless a correction is requested. Dates do not schedule publication.
- Use `draft: true` for unfinished work; drafts must be excluded from the homepage and generated routes. Git history is not private storage for secrets.
- Do not invent research results, citations, authors, or source URLs. Distinguish examples and opinions from supported findings. Link claims to verifiable sources and use references/footnotes where useful.
- Use the page's existing h1 title; start body sections at h2 and keep heading structure logical. The table of contents uses h2/h3 headings when at least three exist.
- Put images in `public/images/` with descriptive filenames and alternative text. Use root-relative internal links, fenced code with a language, and readable Markdown tables.
- Preserve Chinese and English punctuation and Unicode text. Check long titles, mobile widths, wide tables/code, keyboard focus, and reading order when editing layouts.

## Validation and deployment

- Do not commit `node_modules/`, `.astro/`, `dist/`, or credentials.
- Update README instructions when changing publishing or deployment behavior.
- Keep automated checks content-independent so removing sample articles does not break the test suite.
- Confirm production build succeeds and generated pages/links are correct. Report any unverified remote deployment separately; a local build is not a deployment.
