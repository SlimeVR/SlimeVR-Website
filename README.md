# Setup & Running Locally

```bash
pnpm i
pnpm dev
```

For production preview:
```bash
pnpm build
npx serve .output/public
```

# Adding Blog Posts
 
1. Create folder in `public\blog\posts` and .md file with same name as folder you created here. 
File name doubles as blog post ID and url.
Example:
    ```
    public\blog\posts\weekly-update-230\weekly-update-230.md
    ```

    - Blog post file have to start with markdown front matter with title, date and description. 
    - Title and description is strictly text.

2. In blog post .md ensure front matter created
**Front Matter example:**
```md
---
title: "Weekly Dev Update #221"
date: "2025-12-14T00:00:00.000Z"
description: "Hiyo slime gang~! Spazzwan here, but mostly in a metaphorical sense. It's more like t..."
---
```

For blog posts images and emoji relative repo path and blog post paths are supported
**Example of emoji use in blog post with relative repo path:**
```md
<img src="/public/blog/emoji/nighty_nom-1314209503276699708.webp" alt="nighty_nom" />
```

**Example of image use in blog post with relative blog post path:**
```md
![attachment](assets/s1-a1_in_stock_poster.webp)
```

3. Once you finished preparing blog post, run build to generate pagination API records.
```bash
pnpm build
```
Include in your PR with blog post generated materialized API responses.
