/**
 * Generates paginated post manifests under `public/posts/`:
 *   - `index.json`          — metadata only: { total, pageSize, pages }
 *   - `index-1.json`        — posts for page 1 (newest 20)
 *   - `index-2.json`        — posts for page 2
 *   - ...
 *
 * Run via: pnpm generate-posts
 * Also runs automatically at the start of `pnpm dev` and `pnpm build`.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseMarkdownFrontMatter } from "../src/utils/markdown.helper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ManifestEntry {
  slug: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string | null;
}

const PAGE_SIZE = 20;
const postsDir = join(__dirname, "..", "public", "posts");

const dirs = readdirSync(postsDir, { withFileTypes: true }).filter((d) => d.isDirectory());
const manifest: ManifestEntry[] = [];

for (const dir of dirs) {
  const mdPath = join(postsDir, dir.name, `${dir.name}.md`);
  try {
    const content = readFileSync(mdPath, "utf-8");
    const { attributes } = parseMarkdownFrontMatter(content);
    manifest.push({
      slug: dir.name,
      title: attributes.title ?? "",
      date: attributes.date ?? "",
      description: attributes.description ?? "",
      imageUrl: attributes.thumbnailUrl ? `/posts/${dir.name}/${attributes.thumbnailUrl}` : null,
    });
  } catch {
    // skip directories without a matching .md file
  }
}

manifest.sort((a, b) => {
  const da = new Date(a.date).getTime();
  const db = new Date(b.date).getTime();
  return Number.isNaN(db) || Number.isNaN(da)
    ? String(b.date).localeCompare(String(a.date))
    : db - da;
});

const totalPages = Math.max(1, Math.ceil(manifest.length / PAGE_SIZE));

// Write metadata
writeFileSync(
  join(postsDir, "index.json"),
  JSON.stringify({ total: manifest.length, pageSize: PAGE_SIZE, pages: totalPages }, null, 2)
);

// Write per-page files
for (let i = 0; i < totalPages; i++) {
  const page = manifest.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE);
  writeFileSync(join(postsDir, `index-${i + 1}.json`), JSON.stringify(page, null, 2));
}

console.log(`Generated index.json (${manifest.length} posts, ${totalPages} pages)`);
