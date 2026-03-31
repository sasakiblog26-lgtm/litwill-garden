# リトウィルガーデン

> リトウィルガーデン - Brand Site Repository

## Overview

This repository is managed by [litwill-produce](https://github.com/sasakiblog26-lgtm/litwill-produce) orchestration hub.

## Structure

```
content/
  articles/   # Published articles (Markdown)
  drafts/     # Work-in-progress
  lp/         # Landing pages
config/
  brand.yml   # Brand configuration (synced from hub)
templates/
  article-frontmatter.yml  # Article template
```

## Workflow

1. Hub dispatches `generate-article` event with keyword
2. Content pipeline generates article via AI
3. Quality gate checks SEO, facts, compliance
4. PR is auto-created for human review
5. Merge to main triggers deployment

## Links

- Hub: [litwill-produce](https://github.com/sasakiblog26-lgtm/litwill-produce)
- Brand Config: [brands/litwill-garden.yml](https://github.com/sasakiblog26-lgtm/litwill-produce/blob/main/brands/litwill-garden.yml)
