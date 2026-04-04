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

（Step 完了後に追記）
