import assert from "node:assert/strict";
import { readdir, readFile, access } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? walk(path.join(dir, entry.name))
          : path.join(dir, entry.name),
      ),
    )
  ).flat();
}
const files = await walk(root);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
assert(
  htmlFiles.some((file) => file === path.join(root, "index.html")),
  "Homepage must exist",
);
assert(
  htmlFiles.some((file) => file === path.join(root, "404.html")),
  "404 page must exist",
);
let checkedLinks = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  assert.match(html, /<html lang="(?:en|zh-CN)"/, `${file}: document language`);
  assert.match(html, /name="description"/, `${file}: description`);
  assert.match(html, /name="viewport"/, `${file}: responsive viewport`);
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `${file}: one main heading`,
  );
  assert(!/<script\b/.test(html), `${file}: no client JavaScript`);
  for (const match of html.matchAll(/(?:href|src)="([^"\s]+)"/g)) {
    const url = match[1].replaceAll("&amp;", "&");
    if (!url.startsWith("/") && !url.startsWith("#")) continue;
    const [pathname, fragment] = url.split("#");
    const target = pathname
      ? path.join(root, decodeURIComponent(pathname.split("?")[0]))
      : file;
    const resolved =
      target.endsWith(path.sep) || pathname.endsWith("/")
        ? path.join(target, "index.html")
        : target;
    await access(resolved);
    if (fragment && resolved.endsWith(".html")) {
      const targetHtml =
        resolved === file ? html : await readFile(resolved, "utf8");
      assert(
        targetHtml.includes(`id="${decodeURIComponent(fragment)}"`),
        `Missing anchor ${url} in ${file}`,
      );
    }
    checkedLinks++;
  }
}
// Source frontmatter is validated by Astro; assert that its publication flag is reflected in output.
const sources = (await walk(path.resolve("src/content/articles"))).filter(
  (file) => file.endsWith(".md"),
);
const home = await readFile(path.join(root, "index.html"), "utf8");
for (const source of sources) {
  const text = await readFile(source, "utf8");
  const slug = text.match(/^slug:\s*["']?([a-z0-9-]+)["']?\s*$/m)?.[1];
  assert(slug, `Missing slug in ${source}`);
  const isDraft = /^draft:\s*true\s*$/m.test(text.split("---")[1]);
  const route = path.join(root, "articles", slug, "index.html");
  assert.equal(files.includes(route), !isDraft, `${slug}: publication status`);
  assert.equal(
    home.includes(`href="/articles/${slug}/"`),
    !isDraft,
    `${slug}: homepage listing`,
  );
}
console.log(
  `Verified ${htmlFiles.length} HTML pages, ${checkedLinks} local links/anchors, and ${sources.length} publication states.`,
);
