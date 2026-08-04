import type { GetServerSideProps } from "next";

import { SITE_URL } from "../components/Seo";
import docs from "../resources/docs.yml";

/**
 * Generated rather than committed so adding a doc to docs.yml is enough; a
 * static file would quietly go stale, which is how the old release notes
 * archive rotted.
 */
function buildSitemap(): string {
  const paths = [
    { loc: "/", priority: "1.0" },
    { loc: "/release-notes", priority: "0.8" },
    ...(docs.paths as string[]).map((slug) => ({
      loc: `/docs/${slug}`,
      priority: "0.6",
    })),
  ];

  const urls = paths
    .map(
      ({ loc, priority }) =>
        `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <priority>${priority}</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.write(buildSitemap());
  res.end();

  return { props: {} };
};

// Never rendered; getServerSideProps writes the response directly.
export default function Sitemap(): null {
  return null;
}
