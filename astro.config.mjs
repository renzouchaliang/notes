import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://notes.renzouchaliang.workers.dev/",
  output: "static",
  trailingSlash: "always",
  markdown: { shikiConfig: { theme: "github-light" } },
});
