---
description: "Use when creating branches, naming branches, planning step work, writing commit messages, or discussing git workflow for the SwitchBot Home learning project. ブランチ作成、ブランチ命名、Step開始準備、コミットメッセージ作成、Git運用ルールの相談時に参照。"
---

# Git ワークフロー

## Git ブランチ運用ルール

- `main` には直接コミットしない
- 作業は 1 Step または 1 論点ごとにブランチを切る
- ブランチ名は `type/phase-step-short-description` 形式を使用する
- `type` は `feature`, `refactor`, `fix`, `docs`, `test`, `chore` のいずれかを使う
- `phase-step` は学習ロードマップに合わせて `p1-s1`, `p2-s6` のように表記する
- `short-description` は英小文字のケバブケースで簡潔に書く

### ブランチ名の例

- `feature/p1-s1-setup-switchbot-auth`
- `feature/p1-s3-device-status-page`
- `refactor/p2-s5-device-entity`
- `test/p5-s19-usecase-tests`

## Git 運用の判断基準

- UI 追加とドメイン整理のように関心が異なる変更はブランチを分ける
- 課題実装ブランチと、添削後のリファクタリングブランチは分けてもよい
- API 接続前の試作や検証コードは `chore/` または `spike` 相当の短命ブランチで扱う
- 学習途中で大きく方針転換する場合は新しいブランチを切り直し、既存ブランチに変更を積み増ししない

## Step開始時のブランチ作成テンプレート

### テンプレート

- Step: `Phase X / Step Y`
- 目的: `この Step で達成したい内容を1文で書く`
- ブランチ種別: `feature | refactor | fix | docs | test | chore`
- ブランチ名: `type/pX-sY-short-description`
- このブランチでやること: `今回の Step で扱う変更だけを書く`
- このブランチでやらないこと: `次の Step や別論点の変更を書く`

### 記入例

- Step: `Phase 1 / Step 1`
- 目的: `SwitchBot API 認証に必要な署名生成処理を実装する`
- ブランチ種別: `feature`
- ブランチ名: `feature/p1-s1-setup-switchbot-auth`
- このブランチでやること: `env 読み込み、署名生成関数、API クライアントの土台作成`
- このブランチでやらないこと: `デバイス一覧画面の UI 実装`

### 作成コマンド例

```bash
git switch main
git pull
git switch -c feature/p1-s1-setup-switchbot-auth
```

### ブランチ作成前の確認

- 変更対象が 1 Step または 1 論点に収まっているか
- ブランチ名から Phase と Step が分かるか
- このブランチで「やらないこと」が明確か

## コミットメッセージ規約

- コミットメッセージは `type(scope): summary` 形式を基本とする
- `type` は `feat`, `refactor`, `fix`, `docs`, `test`, `chore` を使う
- `scope` は対象レイヤーや機能を表す短い単語にする（例: `auth`, `device`, `ui`, `usecase`, `domain`）
- `summary` は日本語で簡潔に書き、変更内容がひと目で分かる表現にする
- 1コミット1論点を原則とし、学習上の区切りが追える粒度に保つ

### コミットメッセージ例

- `feat(auth): SwitchBot署名生成を追加`
- `feat(device): デバイス一覧取得と表示を実装`
- `refactor(domain): Deviceエンティティを導入`
- `fix(ui): コマンド実行時のローディング解除漏れを修正`
- `test(usecase): GetDevicesユースケースのテストを追加`

## コミットの判断基準

- 課題として意味のある途中到達点でコミットする
- 動作追加とリファクタリングは、可能ならコミットを分ける
- 失敗した試行錯誤は無理に残さず、学習上価値のある差分だけをコミットする
- レビューや添削を受ける前に、最低限アプリが起動する状態またはテストが通る状態に整える
