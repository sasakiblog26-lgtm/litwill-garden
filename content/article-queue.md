# 記事執筆キュー（デイリーボット用）

> デイリー記事ボットは毎朝、このキューの**未チェック `[ ]` の先頭1件**を書く。
> ルール：
> 1. 先頭の未チェック項目の slug が既に `content/articles/` に在れば、その項目を `[x]` にして次へ。
> 2. 書いたら本文 `content/articles/<slug>.md` を作成し、この行を `[x]` に更新して**同じコミットに含める**。
> 3. 執筆は `site/.claude/CLAUDE.md`（PREP必須・景表法/薬機法・エンタメ明記）と `add-article` の作法に従う。
> 4. 各記事は内部リンクで関連記事・`/diagnosis`・`/readings` へ導線（段階S3/S4は鑑定`/readings`へ）。
> 5. キューが全て `[x]` になったら、既存と被らないトピックを自分で選んで書いてよい。
> 背景・優先度の根拠は別途オーナー管理の「コンテンツギャップ分析」に基づく（ピラー＝四柱推命/西洋占星術/インド占星術/占い/タロット）。

## キュー（上から順に）

- [x] インド占星術のやり方・始め方（入門） | slug: indo-astrology-yarikata | カテゴリ: 占星術 | 段階: S2
- [x] 四柱推命 命式の出し方（無料） | slug: shichu-meishiki | カテゴリ: 四柱推命 | 段階: S2
- [x] タロット「相手の気持ち」スプレッドの読み方 | slug: tarot-aite-kimochi | カテゴリ: タロット | 段階: S3
- [x] ナクシャトラ27宿とは・自分の宿の調べ方 | slug: nakshatra-27 | カテゴリ: 占星術 | 段階: S2
- [x] 復縁占い｜占術別の見方と当たるコツ | slug: fukuen-uranai | カテゴリ: 占い | 段階: S3
- [x] 四柱推命の相性の見方 | slug: shichu-aishou | カテゴリ: 四柱推命 | 段階: S3
- [x] 2026年の運勢（12星座別） | slug: 2026-seiza-unsei | カテゴリ: 占星術 | 段階: S2
- [x] 運命の人の特徴を占いで知る | slug: unmei-no-hito | カテゴリ: 占い | 段階: S3
- [x] インド占星術 ダシャー（運勢の時期）の読み方 | slug: dasha-period | カテゴリ: 占星術 | 段階: S2
- [x] インド占星術で相性を見る | slug: indo-astrology-aishou | カテゴリ: 占星術 | 段階: S3
- [x] 四柱推命 通変星10種の意味 | slug: tsuhensei | カテゴリ: 四柱推命 | 段階: S2
- [x] タロットのスプレッド一覧（ケルト十字ほか） | slug: tarot-spread | カテゴリ: タロット | 段階: S2
- [x] 相性の良い星座ランキング・早見表 | slug: seiza-aishou-ranking | カテゴリ: 占星術 | 段階: S3
- [x] 12ハウスの意味（西洋占星術） | slug: western-houses | カテゴリ: 占星術 | 段階: S2
- [x] アスペクトの基本（西洋占星術） | slug: western-aspects | カテゴリ: 占星術 | 段階: S2
- [x] 火星星座・水星星座でみる自分 | slug: kasei-suisei-seiza | カテゴリ: 占星術 | 段階: S2
- [x] 数秘術の相性 | slug: suchi-aishou | カテゴリ: 数秘術 | 段階: S3
- [x] マスターナンバー11/22/33の意味 | slug: master-number | カテゴリ: 数秘術 | 段階: S2
- [x] エンジェルナンバー一覧と意味 | slug: angel-number | カテゴリ: 占い | 段階: S2
- [x] 誕生日でわかる性格占い | slug: tanjyobi-uranai | カテゴリ: 占い | 段階: S2
- [x] 四柱推命でみる2026年 | slug: shichu-2026 | カテゴリ: 四柱推命 | 段階: S2
- [x] タロットのコートカード（人物札）の意味 | slug: tarot-court-cards | カテゴリ: タロット | 段階: S2

## 次バッチ（S3/S4優先・2026-06-09補充）

> SEO戦略の最大の伸びしろ＝S3(比較・選び方)/S4(申込準備)に振る。S4は鑑定`/readings`へ直結、S3は無料診断→鑑定の橋渡し。CVはS2の5〜10倍が見込めるため**上位＝S4から消化**する。

### S4（申込準備・/readings 直結）
- [x] 占い鑑定でわかること｜初めての方へ | slug: kantei-de-wakaru-koto | カテゴリ: 占い | 段階: S4
- [x] 当たるオンライン占い師の選び方 | slug: online-uranaishi-erabikata | カテゴリ: 占い | 段階: S4
- [x] 恋愛の悩みを占いに相談するメリットと選び方 | slug: renai-uranai-soudan | カテゴリ: 占い | 段階: S4
- [x] 相性鑑定でわかること・受け方の流れ | slug: aishou-kantei | カテゴリ: 占い | 段階: S4
- [x] 四柱推命の鑑定でわかること | slug: shichu-kantei | カテゴリ: 四柱推命 | 段階: S4
- [x] インド占星術の鑑定でわかること | slug: indo-kantei | カテゴリ: 占星術 | 段階: S4

### S3（解決策の比較・選び方＋FAQ）
- [x] 無料占いと有料鑑定の違い｜後悔しない選び方 | slug: muryo-yuryo-uranai | カテゴリ: 占い | 段階: S3
- [x] 占いの種類一覧｜自分に合う占術の選び方 | slug: uranai-shurui-erabikata | カテゴリ: 占い | 段階: S3
- [x] タロットと占星術の違い・使い分け | slug: tarot-vs-astrology | カテゴリ: タロット | 段階: S3
- [x] 結婚の相性を占うなら｜占術の選び方 | slug: kekkon-aishou-uranai | カテゴリ: 占い | 段階: S3
- [x] 片思いを占いで進める｜相手の気持ちと進め方 | slug: kataomoi-uranai | カテゴリ: 占い | 段階: S3
- [x] 仕事・転職の悩みを占いで整理する | slug: shigoto-uranai | カテゴリ: 占い | 段階: S3
- [x] ソウルメイトの特徴と見分け方 | slug: soulmate-tokuchou | カテゴリ: 占い | 段階: S3
- [x] 当たる四柱推命｜無料サイトと本格鑑定の違い | slug: shichu-muryo-kantei | カテゴリ: 四柱推命 | 段階: S3

## 次バッチ（コンテンツギャップ分析・2026-06-14補充／Day2スプリント）

> 既存66記事との重複を避け、CV直結のS4鑑定ページ群・旬コンテンツ・S3比較を補充。
> 優先消化順：①旬（新月/水星逆行＝公開タイミング依存）→ ②S4（/readings直結）→ ③S3。

### 旬・時事（公開タイミング依存・最優先）
- [ ] 新月の願い事の書き方｜叶うコツと例文（双子座新月対応） | slug: shingetsu-negaigoto | カテゴリ: 占い | 段階: S3
- [ ] 水星逆行の過ごし方｜やってはいけないこと・おすすめ | slug: suisei-gyakkou-sugoshikata | カテゴリ: 占星術 | 段階: S2

### S4（鑑定でわかること・/readings 直結）
- [ ] タロット鑑定でわかること・受け方の流れ | slug: tarot-kantei | カテゴリ: タロット | 段階: S4
- [ ] 西洋占星術の鑑定でわかること | slug: seiyou-kantei | カテゴリ: 占星術 | 段階: S4
- [ ] 数秘術の鑑定でわかること | slug: suchijutsu-kantei | カテゴリ: 数秘術 | 段階: S4
- [ ] 恋愛相性鑑定の受け方｜当たる占い師の選び方 | slug: renai-aishou-kantei | カテゴリ: 占い | 段階: S4

### S3（比較・選び方・FAQ・信頼性）
- [ ] 電話占い・チャット占い・対面占いの違いと選び方 | slug: uranai-houhou-hikaku | カテゴリ: 占い | 段階: S3
- [ ] 結婚時期を占う方法｜占術別の見方 | slug: kekkon-jiki-uranai | カテゴリ: 占い | 段階: S3
- [ ] 転職の時期を占いで見る｜タイミングの掴み方 | slug: tenshoku-jiki-uranai | カテゴリ: 占い | 段階: S3
- [ ] 占いとの上手な付き合い方｜依存しない活用法 | slug: uranai-tsukiaikata | カテゴリ: 占い | 段階: S3

### S2（トピッククラスタ補強）
- [ ] 太陽星座・月星座・アセンダントの違い | slug: san-seiza-chigai | カテゴリ: 占星術 | 段階: S2
- [ ] ホロスコープの作り方｜無料で出す手順 | slug: horoscope-tsukurikata | カテゴリ: 占星術 | 段階: S2
