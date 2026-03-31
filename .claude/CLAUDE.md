# リトウィルガーデン - Claude Code Instructions

## Brand Identity
- **Brand ID**: litwill-garden
- **Brand Name**: リトウィルガーデン
- **Category**: general
- **Tone**: friendly-expert

## Content Guidelines
- Target Audience: 暮らしを豊かにしたい全世代
- Primary Keywords: {{PRIMARY_KEYWORDS}}
- Content Types: {{CONTENT_TYPES}}

## Writing Rules
1. ターゲット読者に寄り添った文体で書く
2. 専門用語は初出時に必ず説明する
3. 見出し（H2/H3）にキーワードを自然に含める
4. 結論ファーストで構成する
5. 景表法・薬機法を遵守する（誇大表現禁止）
6. 他サイトのコピーは絶対禁止

## Hub Repository
- Orchestration hub: sasakiblog26-lgtm/litwill-produce
- Brand config: brands/litwill-garden.yml

## File Structure
```
content/
  articles/   # 公開済み記事
  drafts/     # 下書き
  lp/         # ランディングページ
```

## Commit Convention
- `content: add article - {keyword}`
- `content: update article - {keyword}`
- `fix: {description}`
- `chore: {description}`
