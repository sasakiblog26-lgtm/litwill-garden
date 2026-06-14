# Litwill 統合鑑定エンジン＋半自動パイプライン

「西洋占星術×インド占星術×四柱推命×心理学」を**毎回ブレずに一貫統合する誠実なAI鑑定**を、
属人ゼロ・再現可能に生成するためのツールキット。Litwill Garden の差別化の核（＝M&A資産）。

設計思想・統合ロジックは占いブランドフォルダの `統合鑑定フォーマットv1.md` / `統合鑑定_systemprompt_v1.1.md` を参照。

## 構成

```
scripts/kantei/
  geo.mjs            出生地(日本語)→緯度経度（47都道府県内蔵）
  western.mjs        西洋：太陽/月/アセン/主要天体（astronomy-engine・アセンは数値法）
  vedic.mjs          インド：ラヒリ・サイデリアル/ナクシャトラ/ヴィムショッタリ・ダシャー
  shichu.mjs         四柱推命：四柱(干支)/日干/五行バランス（lunar-javascript・二十四節気準拠）
  index.mjs          computeOccultData(input) → occult_data 統合
  assemble.mjs       occult_data＋注文 → {system, user} プロンプト
  generate.mjs       AI生成（ANTHROPIC_API_KEY あれば自動／無ければ手動モード）
  deliver.mjs        納品（RESEND_API_KEY あればメール／無ければ outbox 出力）
  pipeline.mjs       注文→算出→組立→生成→ドラフト(監修待ち) のオーケストレーション
  system-prompt.txt  リポ内蔵の system prompt（v1.1・tarotブランチ含む）
  compute-samples.mjs 検証ランナー（A/B/C/D）
  orders/            注文JSON（PIIのためgit除外。sampleのみ追跡）
  work/ drafts/ outbox/  実行時生成物（git除外）
```

## 使い方

### occult_data の算出だけ確認
```
node scripts/kantei/compute-samples.mjs
```

### 1件を鑑定（注文→ドラフト）
```
node scripts/kantei/pipeline.mjs scripts/kantei/orders/<order>.json
```
- `work/<id>.occult.json` … 算出された占術データ
- `work/<id>.prompt.md`  … 組立済みプロンプト（手動生成用の燃料）
- `drafts/<id>.draft.md` … ドラフト（`status: pending_review` or `needs_manual_generation`）

### 監修 → 納品
1. `drafts/<id>.draft.md` を人がレビュー・必要なら修正。
2. frontmatter を `status: approved` に変更。
3. `node scripts/kantei/deliver.mjs drafts/<id>.draft.md <toEmail> <name>`

## 動作モード（段階的に自動化）

| 環境変数 | 未設定（今） | 設定後（go-live） |
|---|---|---|
| `ANTHROPIC_API_KEY` | 手動モード：プロンプトを対話セッション(無料)に貼って生成 | 自動生成 |
| `KANTEI_MODEL` | `claude-opus-4-8`（既定） | 任意モデル |
| `RESEND_API_KEY` | outbox にファイル出力（手動送信） | メール自動納品 |
| `KANTEI_FROM` | `noreply@litwillgarden.com` | 任意の送信元 |

## go-live チェックリスト（オーナー操作）

- [ ] `ANTHROPIC_API_KEY`（＋APIクレジット）を設定 → AI生成を自動化
- [ ] `RESEND_API_KEY`（Resend・既に依存導入済）＋送信ドメイン認証 → メール自動納品
- [ ] /readings/apply フォームの出生情報(date/time/place)＋theme を注文JSONに渡す導線を接続
      （Stripe決済成功 webhook → runPipeline(order) を呼ぶAPIルートを追加）
- [ ] 監修UI（drafts一覧→承認）：当面はファイル運用でも可。将来は管理画面化

## 設計上の注意

- occult_data が**唯一の占術根拠**。AIは数値を捏造しない（promptで明示）。
- 出生時刻なし → アセンダント等は null。promptが「太陽中心の概算」に自動で切替。
- 海外/詳細住所のジオコーディングは未対応（JST固定）。必要時 geo.mjs を外部APIに差し替え。
- v2到達＝occult_data機械供給。次v3＝決済→自動生成→監修→納品の完全パイプライン化。
