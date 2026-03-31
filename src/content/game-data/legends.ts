import type { LegendClass, Tier, Difficulty } from "@/config/game";

export type Ability = {
  type: "passive" | "tactical" | "ultimate";
  name: string;
  description: string;
};

export type Legend = {
  id: number;
  name: string;
  nameJa: string;
  slug: string;
  legendClass: LegendClass;
  tier: Tier;
  difficulty: Difficulty;
  pickRate: string;
  winRate: string;
  description: string;
  abilities: Ability[];
  tips: string[];
};

export const legends: Legend[] = [
  {
    id: 1,
    name: "Wraith",
    nameJa: "レイス",
    slug: "wraith",
    legendClass: "スカーミッシャー",
    tier: "S",
    difficulty: "上級",
    pickRate: "9.8%",
    winRate: "5.2%",
    description: "虚空を操る次元間スカーミッシャー。高い機動力と安全な離脱手段を持つ。",
    abilities: [
      { type: "passive", name: "虚空からの声", description: "危険が迫ると声が警告してくれる。スナイパーに狙われた時や罠の近くにいる時に発動する。" },
      { type: "tactical", name: "虚空へ", description: "虚空を通じて安全に素早く移動する。使用中はダメージを受けない。" },
      { type: "ultimate", name: "ディメンションリフト", description: "2地点をつなぐポータルを設置し、60秒間チーム全員が利用できる。" },
    ],
    tips: [
      "戦術アビリティは逃げるだけでなく、有利なポジションへ移動するためにも活用しよう",
      "ウルトは味方の安全な撤退ルート確保に最適。事前に設置しておくと安心",
      "パッシブの警告音を聞き逃さないこと。ヘッドセット推奨",
    ],
  },
  {
    id: 2,
    name: "Octane",
    nameJa: "オクタン",
    slug: "octane",
    legendClass: "スカーミッシャー",
    tier: "A",
    difficulty: "初級",
    pickRate: "10.2%",
    winRate: "4.1%",
    description: "高速アドレナリンジャンキー。自らの体力を犠牲にして圧倒的なスピードで戦場を駆け抜ける。",
    abilities: [
      { type: "passive", name: "高速修復", description: "ダメージを受けていない間、体力が自動で回復する。" },
      { type: "tactical", name: "興奮剤", description: "体力を犠牲にして移動速度が30%アップする（6秒間）。" },
      { type: "ultimate", name: "ジャンプパッド", description: "チーム全員が使えるジャンプパッドを設置する。" },
    ],
    tips: [
      "興奮剤は射撃中の移動速度も上がるため、撃ち合い中にも活用しよう",
      "ジャンプパッドは味方の移動手段として非常に優秀。積極的に使おう",
      "パッシブの自動回復があるので、シールドセルを優先的に使うと効率的",
    ],
  },
  {
    id: 3,
    name: "Pathfinder",
    nameJa: "パスファインダー",
    slug: "pathfinder",
    legendClass: "スカーミッシャー",
    tier: "A",
    difficulty: "中級",
    pickRate: "7.5%",
    winRate: "5.0%",
    description: "陽気な偵察ロボット。グラップルを駆使した高い機動力と調査ビーコンによるリング情報収集が強み。",
    abilities: [
      { type: "passive", name: "内部情報", description: "調査ビーコンをスキャンしてリングの次の位置を特定し、ジップラインのクールダウンを短縮する。" },
      { type: "tactical", name: "グラップリングフック", description: "グラップルで素早く移動する。地形を活かした立体的な動きが可能。" },
      { type: "ultimate", name: "ジップラインガン", description: "誰でも使えるジップラインを設置する。" },
    ],
    tips: [
      "グラップルの振り子運動をマスターすると機動力が大幅にアップ",
      "高所からの奇襲が非常に強力。常に高いポジションを意識しよう",
      "調査ビーコンを積極的にスキャンしてリング情報をチームに共有しよう",
    ],
  },
  {
    id: 4,
    name: "Bloodhound",
    nameJa: "ブラッドハウンド",
    slug: "bloodhound",
    legendClass: "リコン",
    tier: "B",
    difficulty: "初級",
    pickRate: "6.8%",
    winRate: "4.5%",
    description: "テクノロジカルトラッカー。敵の痕跡を追跡し、戦術スキャンで周囲の敵を可視化する。",
    abilities: [
      { type: "passive", name: "トラッカー", description: "敵が残した痕跡を発見できる。足跡やドアの開閉履歴が表示される。" },
      { type: "tactical", name: "全能の目", description: "短い間、正面の構造物を透視して敵・トラップ・手がかりの位置を明らかにする。" },
      { type: "ultimate", name: "ハンティングビースト", description: "究極のハンターに変身。移動速度が上昇し、敵がハイライトされる。" },
    ],
    tips: [
      "スキャンは自分の位置もバレるため、使うタイミングに注意",
      "ウルト中はスキャンのクールダウンが短くなるので連発しよう",
      "パッシブの足跡情報をチームに共有して、敵の位置を予測しよう",
    ],
  },
  {
    id: 5,
    name: "Bangalore",
    nameJa: "バンガロール",
    slug: "bangalore",
    legendClass: "アサルト",
    tier: "B",
    difficulty: "初級",
    pickRate: "5.4%",
    winRate: "4.8%",
    description: "プロフェッショナルソルジャー。スモークとローリングサンダーで戦場をコントロールする。",
    abilities: [
      { type: "passive", name: "駆け足", description: "銃弾が近くを通ると短時間移動速度がアップする。" },
      { type: "tactical", name: "スモークランチャー", description: "スモーク缶を発射して視界を遮る煙幕を展開する。" },
      { type: "ultimate", name: "ローリングサンダー", description: "広範囲にわたるエリアを空爆で掃討する。" },
    ],
    tips: [
      "スモークは逃げる時だけでなく、味方の蘇生カバーにも最適",
      "パッシブの駆け足を活かして、被弾時はすぐに遮蔽物に隠れよう",
      "ウルトは敵を直接倒すより、エリアコントロールとして使うのが効果的",
    ],
  },
  {
    id: 6,
    name: "Lifeline",
    nameJa: "ライフライン",
    slug: "lifeline",
    legendClass: "サポート",
    tier: "B",
    difficulty: "初級",
    pickRate: "5.1%",
    winRate: "4.9%",
    description: "戦闘メディック。D.O.C.ドローンで味方を回復し、ケアパッケージで物資を補給する。",
    abilities: [
      { type: "passive", name: "戦闘復活", description: "D.O.C.ドローンが味方を自動で蘇生する。蘇生中も自分は戦闘できる。" },
      { type: "tactical", name: "D.O.C.ヒールドローン", description: "回復ドローンを展開し、近くの味方を自動で治療する。" },
      { type: "ultimate", name: "ケアパッケージ", description: "高品質な防御用品が入ったドロップポッドを要請する。" },
    ],
    tips: [
      "蘇生中も戦闘できるのが最大の強み。積極的に味方を起こそう",
      "ヒールドローンは戦闘の合間に使って、回復アイテムを節約しよう",
      "ケアパッケージは早めに使うことで、チーム全体の装備を底上げできる",
    ],
  },
  {
    id: 7,
    name: "Gibraltar",
    nameJa: "ジブラルタル",
    slug: "gibraltar",
    legendClass: "コントローラー",
    tier: "A",
    difficulty: "中級",
    pickRate: "3.8%",
    winRate: "5.5%",
    description: "やさしき巨人。ガンシールドとドームで味方を守り、空爆で敵を制圧する。",
    abilities: [
      { type: "passive", name: "ガンシールド", description: "照準器越しに狙う時にシールドが展開され、正面からのダメージを軽減する。" },
      { type: "tactical", name: "プロテクトドーム", description: "あらゆる攻撃を遮断するドームシールドを展開する。" },
      { type: "ultimate", name: "防衛爆撃", description: "指定したエリアに集中砲火の空爆を行う。" },
    ],
    tips: [
      "ドーム内での蘇生は速度が上がる。緊急時に活用しよう",
      "ガンシールドのおかげで撃ち合いに強い。正面からの1v1は積極的に",
      "ウルトは屋外の敵に非常に効果的。建物の多いエリアでは効果が薄い",
    ],
  },
  {
    id: 8,
    name: "Horizon",
    nameJa: "ホライゾン",
    slug: "horizon",
    legendClass: "スカーミッシャー",
    tier: "S",
    difficulty: "中級",
    pickRate: "8.1%",
    winRate: "5.3%",
    description: "重力操作の天才科学者。グラビティリフトで高所を制し、ブラックホールで敵を引き寄せる。",
    abilities: [
      { type: "passive", name: "スペースウォーク", description: "高所から着地する際の衝撃を軽減し、着地後すぐに動ける。" },
      { type: "tactical", name: "グラビティリフト", description: "重力を操作して垂直方向にリフトを作り出す。" },
      { type: "ultimate", name: "ブラックホール", description: "マイクロブラックホールを展開し、近くの敵を引き寄せる。" },
    ],
    tips: [
      "グラビティリフトの頂上でADSすると空中で安定して射撃できる",
      "パッシブのおかげで高所からの奇襲が非常に強力",
      "ウルトとグレネードの組み合わせが非常に強力。味方と連携しよう",
    ],
  },
  {
    id: 9,
    name: "Caustic",
    nameJa: "コースティック",
    slug: "caustic",
    legendClass: "コントローラー",
    tier: "A",
    difficulty: "中級",
    pickRate: "4.5%",
    winRate: "5.1%",
    description: "毒ガスの専門家。Noxガストラップで防衛ラインを構築し、ガスグレネードで制圧する。",
    abilities: [
      { type: "passive", name: "Noxビジョン", description: "ガスの中にいる敵がハイライト表示される。" },
      { type: "tactical", name: "Noxガストラップ", description: "最大6個のガス缶を設置し、敵が近づくとガスを放出する。" },
      { type: "ultimate", name: "Noxガスグレネード", description: "広範囲にNoxガスを散布するグレネードを投げる。" },
    ],
    tips: [
      "建物の入り口にトラップを置いて、敵の侵入を制限しよう",
      "終盤のリング縮小時にガスグレネードが非常に強力",
      "味方もガスで視界が悪くなるので、配置に注意しよう",
    ],
  },
  {
    id: 10,
    name: "Catalyst",
    nameJa: "カタリスト",
    slug: "catalyst",
    legendClass: "コントローラー",
    tier: "B",
    difficulty: "中級",
    pickRate: "3.2%",
    winRate: "4.7%",
    description: "フェロフルードの達人。強化バリケードと結晶壁で空間を制御する防衛型レジェンド。",
    abilities: [
      { type: "passive", name: "バリケード", description: "フェロフルードでドアを強化し、破壊されにくくする。破壊されたドアも修復可能。" },
      { type: "tactical", name: "ピアシングスパイク", description: "フェロフルードの帯を放ち、敵にダメージとスロー効果を与える。" },
      { type: "ultimate", name: "ダークベール", description: "フェロフルードの壁を生成し、通過する敵にスロー効果とスキャン遮断を与える。" },
    ],
    tips: [
      "建物の防衛に非常に強い。パッシブでドアを強化して籠城しよう",
      "ウルトの壁はスキャンを遮断するため、ブラッドハウンド対策になる",
      "タクティカルは通路や狭い場所に設置すると効果的",
    ],
  },
  {
    id: 11,
    name: "Conduit",
    nameJa: "コンジット",
    slug: "conduit",
    legendClass: "サポート",
    tier: "A",
    difficulty: "中級",
    pickRate: "5.5%",
    winRate: "5.0%",
    description: "エネルギー伝導師。味方にシールドを付与し、敵のシールドを妨害するサポートレジェンド。",
    abilities: [
      { type: "passive", name: "サバーンスパーク", description: "近くの敵のデスボックスからシールドを回復できる。" },
      { type: "tactical", name: "ラジアントトランスファー", description: "味方を指定して一時的にシールドを回復する。" },
      { type: "ultimate", name: "エネルギーバリケード", description: "エネルギーの柵を展開し、通過する敵のシールドにダメージを与え移動を遅くする。" },
    ],
    tips: [
      "タクティカルは離れた味方にも使えるため、戦闘中のサポートに最適",
      "デスボックスからシールド回復できるので、戦闘後はすぐに回収しよう",
      "ウルトは防衛ラインの構築に使おう",
    ],
  },
  {
    id: 12,
    name: "Fuse",
    nameJa: "ヒューズ",
    slug: "fuse",
    legendClass: "アサルト",
    tier: "C",
    difficulty: "初級",
    pickRate: "3.0%",
    winRate: "3.8%",
    description: "爆発物の達人。グレネードを余分に持てて、遠くに投げられる。火の輪で敵を追い詰める。",
    abilities: [
      { type: "passive", name: "グレネーダー", description: "グレネードをスタックごとに2個持てる。遠くに正確に投擲できる。" },
      { type: "tactical", name: "ナックルクラスター", description: "くっつく爆弾を発射し、時間差で連続爆発する。" },
      { type: "ultimate", name: "マザーロード", description: "火の輪を展開して敵を囲い込む。" },
    ],
    tips: [
      "グレネードを大量に持てるので、インベントリの管理を工夫しよう",
      "ナックルクラスターは遮蔽物の裏に隠れた敵を炙り出すのに効果的",
      "ウルトの中に敵を閉じ込めたら、グレネードを投げ込もう",
    ],
  },
];
