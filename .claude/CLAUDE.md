# リトウィルガーデン - Claude Code Instructions

## Brand Identity
- **Brand ID**: litwill-garden
- **Brand Name**: リトウィルガーデン
- **Category**: psychology × fortune-telling
- **Tone**: warm-expert（温かみがあり、専門性を感じさせる）

## Content Guidelines
- Target Audience: 10〜30代女性中心。自己理解・恋愛・人間関係に関心のある方
- Primary Keywords: 心理テスト, 性格診断, 恋愛診断, 強み診断, MBTI, 占い, 星座占い, 数秘術, タロット
- Content Types: 心理テスト, 占いコンテンツ, 心理学コラム, 診断ツール

## Writing Rules
1. ターゲット読者に寄り添った文体で書く（押しつけがましくない温かさ）
2. 専門用語は初出時に必ず説明する
3. 見出し（H2/H3）にキーワードを自然に含める
4. 結論ファーストで構成する
5. 景表法・薬機法を遵守する（誇大表現禁止）
6. 他サイトのコピーは絶対禁止
7. 占い・スピリチュアル系コンテンツはエンターテインメントとして明記する

## Hub Repository
- Orchestration hub: sasakiblog26-lgtm/litwill-produce
- Brand config: brands/litwill-garden.yml

## File Structure
```
content/
  articles/   # 公開済み記事
  drafts/     # 下書き
  lp/         # ランディングページ
  tests/      # 心理テストデータ
  fortune/    # 占いコンテンツ
```

## Commit Convention
- `content: add article - {keyword}`
- `content: update article - {keyword}`
- `fix: {description}`
- `chore: {description}`
