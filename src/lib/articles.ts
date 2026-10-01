import { getCollection } from "astro:content";

export async function publishedArticles() {
  const articles = await getCollection("articles");
  const slugs = new Set<string>();
  for (const article of articles) {
    if (slugs.has(article.data.slug))
      throw new Error(`Duplicate article slug: ${article.data.slug}`);
    slugs.add(article.data.slug);
  }
  return articles
    .filter((article) => !article.data.draft)
    .sort(
      (a, b) =>
        b.data.date.localeCompare(a.data.date) ||
        a.data.slug.localeCompare(b.data.slug),
    );
}
