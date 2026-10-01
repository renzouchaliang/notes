# Notes / 手记

A minimal, bilingual personal publication built with Astro. Markdown files become static pages; there is no database, login, analytics, or client-side JavaScript. Astro is the only direct dependency.

## Local development

Use Node.js 24 (see `.node-version`) and npm.

```sh
npm ci
npm run dev
```

Astro prints the local development address. `npm run build` creates the deployable `dist/` directory. `npm run preview` serves that production output. `npm test` builds and verifies published pages, content features, local links, and draft exclusion.

If a cloud sandbox cannot write the default npm cache, append `--cache /tmp/notes-npm-cache` to `npm ci`. In a sandbox with a read-only home configuration directory, run `export ASTRO_TELEMETRY_DISABLED=1` before Astro commands; this also disables Astro’s build-tool telemetry. The website itself contains no analytics.

## Publish an article

Create a UTF-8 `.md` file under `src/content/articles/`. Copy this frontmatter, including quotes around the date:

```yaml
---
title: "文章标题 / Article title"
slug: "my-permanent-article-url"
date: "2026-10-02"
description: "A short summary shown on the homepage and in page metadata."
category: "Notes / 笔记"
tags: ["Research", "写作"]
lang: "zh-CN"
draft: false
---

Write your introduction here.

## First section

Article content in Markdown.
```

- Required: `title`, `slug`, `date`, `description`, and `category`.
- `tags` defaults to an empty list; `lang` is `zh-CN` (default) or `en`.
- `draft: true` excludes an article from both the homepage and generated routes. Draft source remains visible to anyone with repository access. Omit it or set it to `false` to publish.
- The date is a publication date, not a scheduler: all non-drafts are published, including future-dated entries. The homepage sorts newest first.
- Slugs must be unique lowercase ASCII words separated by hyphens. Once published, **keep the slug unchanged**. Editing the title, date, filename, or content does not change `/articles/<slug>/`.
- Use `##` and `###` for sections; the page already supplies the title as `h1`. A contents list appears when there are at least three level-two/three headings. Heading links follow heading text and may change if you rename a heading.

Run `npm test`, review the page on desktop and mobile, then commit and push. The included welcome and research articles are clearly labeled examples; edit, remove, or mark them as drafts before launching your own publication.

## Images, tables, code, and references

Put images in `public/images/` and use meaningful alternative text:

```md
![A description of the image](/images/my-image.webp)

| Finding | Evidence |
| --- | --- |
| Example | [Source](https://example.com/) |

A claim with a reference.[^1]

[^1]: Author, *Title*, year. [Original source](https://example.com/).
```

Use fenced code blocks with a language name (such as `js`, `python`, or `bash`) for syntax highlighting. Standard Markdown links, reference-style links, and GitHub-style tables and footnotes are supported. Wide tables/code scroll within the article. Use root-relative links to other articles, e.g. `/articles/a-place-for-notes/`.

Markdown may contain raw HTML; publish trusted content only. Do not put secrets or private material in articles or `public/`. Fonts use local system stacks for Chinese and English, with no external font requests. Article pages also include print styles.

## Customize

- Branding/footer and page metadata: `src/layouts/Base.astro`
- Homepage introduction: `src/pages/index.astro`
- Typography, layout, and colors: `src/styles/global.css`
- Frontmatter validation: `src/content.config.ts`

The canonical public site URL is **https://notes.renzouchaliang.workers.dev/**, configured as `site` in `astro.config.mjs`. Published articles use `https://notes.renzouchaliang.workers.dev/articles/<slug>/`; for example, [Test Note](https://notes.renzouchaliang.workers.dev/articles/test-note/). Keep this configuration and the publishing rules in `AGENTS.md` aligned if the domain changes.

## Deploy on Cloudflare Pages

The current public address uses Cloudflare Workers (`workers.dev`). The static build can also be deployed to Cloudflare Pages using the settings below. These Pages instructions describe an alternative deployment target; they do not change the canonical public URL.

To deploy on Pages, create a **Pages** project and connect this Git repository:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | Astro |
| Root directory | Repository root (leave blank) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION=24` |

The committed npm lockfile makes installs reproducible. Cloudflare Pages installs dependencies before building. This is static output: no adapter, Workers runtime, database, credentials, or application environment variables are needed. `public/_headers` is copied into the output for Pages response headers. `404.html` provides the custom not-found page. Pages supplies HTTPS and a `pages.dev` domain; add a custom domain in its settings if desired.

Connect the Git repository in your Cloudflare project to enable automatic builds on pushes to `main`. After deployment, verify the homepage, an article, an image, and a nonexistent URL. A successful local build or Git push alone does not confirm a live deployment. If a published URL must change, add a permanent redirect in `public/_redirects`, preserving the old address for existing readers.
