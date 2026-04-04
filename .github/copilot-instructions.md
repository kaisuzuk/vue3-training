# SwitchBot Home — Vue3 × クリーンアーキテクチャ学習プロジェクト

## プロジェクト概要

SwitchBot API を利用したスマートホーム管理ダッシュボード（HomeAssistant 簡易版）を、
課題解決型で段階的に構築しながら、Vue3 + TypeScript でクリーンアーキテクチャを体系的に学ぶ。

## 学習者のレベル

- Vue / TypeScript のチュートリアルや基礎講座は受講済み
- ソースを読んでなんとなく理解できるが、1から書くのは難しい
- クリーンアーキテクチャはこれから学ぶ

## AI の役割

- **課題出題者**：各 Step の課題とヒントを提示する
- **添削者**：学習者の実装をレビューし、改善点を解説する
- **解説者**：アーキテクチャの「なぜ」を実コードで説明する
- 日本語で対話する

## 各 Step の進め方

1. **ブランチ作成**
   学習者が Git ワークフロー規約に従い、Step 用のブランチを切る。
   ブランチ名の命名やテンプレートは `git-workflow.instructions.md` を参照。

2. **課題の提示（AI）**
   AI がその Step の「課題」「ゴール」「ヒント」を提示する。
   必要に応じて、参考になる型定義やディレクトリ構成の方針も示す。
   提示した課題は `.github/steps/assignments.md` に記録する。

3. **実装（学習者）**
   学習者が課題に取り組む。
   わからない点はいつでも質問OK。AI はヒントを段階的に出す（いきなり答えは出さない）。

4. **添削・レビュー（AI）**
   学習者が「できた」「見てほしい」と伝えたら、AI がコードレビューを行う。

- 動作の正しさ
- 型安全・コーディング規約の遵守
- アーキテクチャ観点での改善ポイント

5. **改善・リファクタリング（学習者）**
   レビューで指摘された点を修正する。
   大きな設計変更が必要な場合は、リファクタリング用のブランチを別途切ってもよい。

6. **振り返り（AI + 学習者）**
   その Step で学んだことを AI が要約し、次の Step との接続を説明する。
   Phase の最終 Step では、Phase 全体の振り返りを行う。
   振り返り内容は `.github/steps/assignments.md` の該当 Step に追記する。

7. **コミット・マージ**
   学習者がコミットメッセージ規約に従いコミットし、main にマージする。

## Tech Stack

- Vue 3 (Composition API + `<script setup>`)
- TypeScript (strict mode)
- Vite
- Vue Router
- Pinia（Phase 4 以降）
- Vitest（Phase 5）

## アーキテクチャ目標（最終形）

```
src/
├── domain/           # Entity, ValueObject, ドメインサービス
├── usecases/         # ユースケース（アプリケーション層）
├── ports/            # Repository Interface（ポート）
├── infrastructure/   # API通信、MockRepository（アダプター）
└── ui/               # Composable, Component, Page, Router
```

## コーディング規約

- Composition API + `<script setup lang="ts">` を使用
- コンポーネントファイル名は PascalCase
- composable は `use` プレフィックス（例: `useDevices`）
- ドメイン層は Vue / フレームワークに依存しない純粋な TypeScript
- `any` 型の使用禁止、型安全を徹底

## Git の基本方針

- `main` には直接コミットしない
- 作業は 1 Step または 1 論点ごとに分けて進める
- Git の詳細な運用ルール、ブランチ命名、コミットメッセージ規約は `.github/instructions/git-workflow.instructions.md` を参照する
