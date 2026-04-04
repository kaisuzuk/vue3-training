# Step1 学習メモ

## 取り組んだこと

Phase 1 / Step 1 では、主に以下の内容に取り組んだ。

- 環境変数の読み込み
- SwitchBot API の署名作成
- `fetch()` を使った API コール用関数の作成
- Vue Router の導入
- `HelloWorld.vue` からの動作確認

## スムーズに進んだ点

### 環境変数の読み込み

環境変数の読み込みは、ヒントのとおり実装できたため、特に迷いはなかった。

## 詰まった点

### 署名作成

署名作成のところは、`CryptoJS` の使い方がよく分からず少し苦戦した。

### HTTP ヘッダーの組み立て

HTTP ヘッダーを作成するための関数を作ろうとしたが断念した。HTTP ヘッダー用のカスタム型を定義し、その型のオブジェクトを返すヘルパー関数を作成した方が綺麗になると思ったが、`switchBotFetch` の `fetch()` に渡すときに、カスタム型ではうまくいかなかった。

### `fetch()` の使い方

`fetch()` の使い方をよく知らなかったので調べた。第一引数に URL、第二引数に `headers` や `body` を含むオブジェクトを渡す形だと分かった。

今回のお題は、SwitchBot API をコールするための汎用的な Function を作ることだったので、`url` や `body` も引数として渡す必要があると判断した。

### Vue Router の導入

動作確認のために Vue Router を導入しようとしたが、ここでも少し苦戦した。導入には以下の手順が必要だと分かった。

1. `npm i vue-router` で導入する
2. `router/index.ts` を作成する
3. `routes` に `{ path: '/', component: ... }` 形式でルートを定義する
4. `createRouter()` で router オブジェクトを作成してエクスポートする
5. `main.ts` で `createApp(App).use(router).mount('#app')` を実行する
6. `App.vue` で `<RouterView></RouterView>` を配置する

## エラーと対処

### `HelloWorld.vue` での実行時エラー

`HelloWorld.vue` で `switchBotFetch` を実行したとき、以下のエラーが出た。

```log
Component <HelloWorld>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.
```

await する関数を script タグ内に直書きしていたのが原因だったらしい。`onMounted()` の中で `async` にしたところ動くようになった。

```ts
onMounted(async () => {
	await switchBotFetch('https://www.example.com')
})
```

## 今の理解

一応実行はできたようだが、トークンもシークレットも URL も仮の適当なものなので、`fetch` の応答自体はエラーになっている。

ただ、ブラウザから関数が呼ばれて `fetch` が実行されるところまでは確認できたので、現時点では「API コールの形までは作れた」と考えてよさそう。

## 次に確認したいこと

- 署名が SwitchBot API の仕様どおりになっているか
- `fetch` に渡すヘッダーの形式が適切か
- 仮の値ではなく正しい値を入れたときに、期待どおりレスポンスが返るか

## Github Copilotによるレビュー

### レビューサマリ

Step 1 のゴールである、環境変数の読み込み、署名生成、API クライアントの土台作成、Vue Router の導入は概ね達成できている。特に、署名生成関数と `fetch` ラッパーを分けて考えられている点、Vue Router を `main.ts` と `App.vue` まで接続できている点は良かった。

また、`HelloWorld.vue` でのトップレベル `await` によるエラーに対して、`onMounted(async () => ...)` に移して解消できたのも学びとして大きい。

### 指摘事項

#### 1. 署名のエンコード形式

現在の署名は HMAC-SHA256 の結果をそのまま文字列化しており、16 進文字列になっている可能性がある。SwitchBot API は Base64 形式の署名を要求するため、この点は修正が必要。

#### 2. `.env` の管理

`.env` ファイルを作成する場合は、誤ってコミットしないように `.gitignore` に `.env` と `.env.*` を追加しておく必要がある。

#### 3. `switchBotFetch` の戻り値

現状は `fetch` の `Response` をそのまま返しているため、呼び出し側で毎回 `json()` する必要がある。今すぐ必須ではないが、今後使いやすさを考えるとレスポンス処理の責務をどこに持たせるかは整理したい。

#### 4. 変数名の typo

`signeture` という変数名は `signature` の typo になっている。動作には影響しないが、早めに直した方がよい。

### 今回の学び

- `fetch` には URL とオプションオブジェクトを渡す
- Vue コンポーネントで非同期処理を直接トップレベルに書くと、`async setup()` 扱いになることがある
- API クライアントの処理は、署名生成と通信処理を分けて考えると整理しやすい