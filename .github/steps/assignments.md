# 課題記録 — SwitchBot Home

各 Step で AI が提示した課題と、完了後の振り返りを時系列で記録する。
新しいセッションでは、このファイルを参照すれば現在の進捗と文脈が分かる。

---

## Phase 1 / Step 1 — プロジェクトセットアップ + API 認証ヘルパー作成

### 課題

SwitchBot API v1.1 に接続するための **認証基盤** を構築する。
具体的には、以下の 3 つを実装すること。

1. **環境変数の読み込み** — `.env` ファイルから SwitchBot の `token` と `secret` を読み込めるようにする
2. **署名生成関数の作成** — SwitchBot API が要求する HMAC-SHA256 署名を生成する関数を作る
3. **API クライアントの土台** — 署名付きヘッダーを自動で付与して `fetch` する薄いラッパー関数を作る

追加で、動作確認用として **Vue Router を導入**し、トップページ（`/`）にアクセスしたとき「SwitchBot Home」というタイトルが表示されるだけの最小ページを用意する。

### ゴール

- [ ] `.env` に `VITE_SWITCHBOT_TOKEN` と `VITE_SWITCHBOT_SECRET` を定義し、アプリから読み取れる
- [ ] `src/infrastructure/api/switchBotClient.ts` に署名生成関数（`generateSignature`）と API リクエスト関数（`switchBotFetch`）が存在する
- [ ] 署名生成関数が SwitchBot API 仕様どおりのヘッダー（`Authorization`, `sign`, `t`, `nonce`）を返す
- [ ] Vue Router が導入され、`/` で最小限のトップページが表示される
- [ ] `npm run dev` でエラーなく起動する

### ヒント

1. **Vite の環境変数**: Vite では `import.meta.env.VITE_XXX` で `.env` の値を読める。`VITE_` プレフィックスが必要。
2. **HMAC-SHA256 署名**: ブラウザの `Web Crypto API`（`crypto.subtle`）を使う方法と、`crypto-js` などのライブラリを使う方法がある。学習目的なら **Web Crypto API** に挑戦してみよう。
3. **署名の元データ**: SwitchBot API v1.1 では `token + t(タイムスタンプ) + nonce` を連結した文字列を `secret` で HMAC-SHA256 署名し、Base64 エンコードする。
4. **nonce**: `crypto.randomUUID()` で UUID を生成できる。
5. **Vue Router**: `npm install vue-router` → `createRouter` + `createWebHistory` で最小構成を作る。
6. **ディレクトリ構成**: この Step では最終形を意識しなくてOK。まずは動くものを作ることを優先する。ただし `switchBotClient.ts` だけは `src/infrastructure/api/` に置く（後の Phase で活きる）。

### 参考：署名生成のイメージ（擬似コード）

```ts
// 入力
const token = "your-token";
const secret = "your-secret";
const t = Date.now().toString();
const nonce = crypto.randomUUID();

// 署名対象文字列
const data = token + t + nonce;

// HMAC-SHA256 で署名 → Base64
const sign = base64(hmacSha256(secret, data));

// ヘッダーに含める
const headers = { Authorization: token, sign, t, nonce };
```

### 振り返り

#### できたこと

- `import.meta.env` で環境変数を読み込む仕組みを理解し、`VITE_` プレフィックスが必要な理由を把握した
- `crypto-js` を使った HMAC-SHA256 + Base64 署名生成を自力で実装した
- `generateSignature` と `switchBotFetch` に責務を分けて設計できた（後の Phase のインフラ層に繋がる構成）
- Vue Router の導入手順（`router/index.ts` → `main.ts` → `App.vue`）を一通り理解した
- `<script setup>` のトップレベル `await` が `async setup()` 扱いになり Suspense が必要になる問題を踏み、`onMounted(async () => ...)` が正しいパターンだと学んだ

#### つまずいた点

- `CryptoJS` の使い方（特に `.toString()` 引数なしが Hex になる点）
- カスタム型を `fetch` の `headers` に渡せなかった問題（`fetch` は `Record<string, string>` 相当を期待するため）
- Vue Router の 3 点セット（`router/index.ts` + `main.ts` + `App.vue`）の繋ぎ方

#### 発見した問題と方針

- フロントエンドに secret を置く設計はセキュリティ上問題があることを認識した
- ブラウザから直接 SwitchBot API を fetch すると CORS preflight（OPTIONS）が 404 になり通らないことを確認した
- Shell スクリプト（curl）では同エンドポイントで正常にレスポンスを取得できることも確認した
- → Phase 3 Step 10（`SwitchBotApiRepository` 実装）のタイミングで、BFF（簡易 Express サーバ）を構築して CORS 問題を解決する方針とした

#### 次の Step との接続

Step 2 では `ref` / `reactive` / `v-for` を使って、デバイス一覧の取得・表示に取り組む。  
CORS の関係でブラウザから実 API は叩けないため、Step 2 ではハードコードした Mock データを使って UI を先に作る。  
実 API との接続は Phase 3 以降で改めて組み立てる。
