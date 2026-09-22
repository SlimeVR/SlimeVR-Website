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
 
1. Create folder in `public\blog\posts` and `.md` file within it with same. 
File name doubles as blog post ID and url on site.
Path example:
    ```
    public\blog\posts\weekly-update-230\weekly-update-230.md
    ```


1. In blog post `.md` file ensure front matter created
    - Blog post file have to start with markdown front matter with title, date and description. 
    - Title and description is strictly text.

    Front Matter example:
```md
---
title: "Weekly Dev Update #221"
date: "2025-12-14T00:00:00.000Z"
description: "Hiyo slime gang~! Spazzwan here, but mostly in a metaphorical sense. It's more like t..."
---
```

1. Once you finished preparing blog post, run build to generate pagination API records.
```bash
pnpm build
```
Include in your PR with blog post generated materialized API responses.

### Linking Images In Blog posts

For blog posts images and emoji linking two path options supported:

- Relative repository path

    Example of emoji use in blog post with relative repo path:
```md
<img src="/public/blog/emoji/nighty_nom-1314209503276699708.webp" alt="nighty_nom" />
```

- Relative blog post path

    Example of image linking in blog post with relative blog post path:
```md
![attachment](assets/s1-a1_in_stock_poster.webp)
``` 