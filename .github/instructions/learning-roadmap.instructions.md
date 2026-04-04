---
description: "Use when discussing learning roadmap, phase progression, step assignments, architecture review, or curriculum planning for the SwitchBot Home project. 学習ロードマップ、課題出題、進捗確認、アーキテクチャレビュー時に参照。"
---

# 学習ロードマップ — SwitchBot Home

## フェーズ構成

### Phase 1 — Vue3 基礎 + SwitchBot API 接続（ベタ書きで動くものを作る）

| Step | 課題                                            | 学ぶこと                                                  |
| ---- | ----------------------------------------------- | --------------------------------------------------------- |
| 1    | プロジェクトセットアップ + API 認証ヘルパー作成 | Vite, Vue Router, HMAC-SHA256 署名, 環境変数(.env)        |
| 2    | デバイス一覧の取得・表示                        | `ref`/`reactive`, `onMounted`, `v-for`, TypeScript 型定義 |
| 3    | デバイス詳細ページ（ステータス表示）            | Vue Router 動的ルート, `watch`, Props/Emits               |
| 4    | デバイス操作（turnOn/turnOff）                  | イベントハンドリング, POST API, ローディング状態管理      |

### Phase 2 — ドメイン層の構築（リファクタリング開始）

| Step | 課題                                                        | 学ぶこと                                          |
| ---- | ----------------------------------------------------------- | ------------------------------------------------- |
| 5    | Device Entity の設計（deviceType 別の型ガード）             | Union Types, Discriminated Union, Entity 設計     |
| 6    | ValueObject の導入（DeviceId, Temperature, PowerState 等）  | ValueObject, 不変性, バリデーション               |
| 7    | デバイスカテゴリ分類ロジック（照明/センサー/電源/ロック等） | ドメインサービス, Strategy Pattern                |
| 8    | Command（操作指令）のモデル化                               | Command Pattern, デバイス種別ごとのコマンドセット |

### Phase 3 — ユースケース層 + Repository

| Step | 課題                                                   | 学ぶこと                                         |
| ---- | ------------------------------------------------------ | ------------------------------------------------ |
| 9    | DeviceRepository Interface の定義                      | 依存性逆転の原則（DIP）, ポートとアダプター      |
| 10   | SwitchBotApiRepository の実装                          | インフラ層, アダプター実装, API レスポンスの変換 |
| 11   | UseCase 層（GetDevices, GetDeviceStatus, SendCommand） | UseCase 単一責務, 入出力の型定義                 |
| 12   | MockRepository + InMemoryRepository の実装             | テスタビリティ, API なしでの開発                 |

### Phase 4 — UI 層の洗練

| Step | 課題                                               | 学ぶこと                              |
| ---- | -------------------------------------------------- | ------------------------------------- |
| 13   | Composable の設計（useDevices, useDeviceControl）  | UI ロジックとドメインの境界           |
| 14   | ダッシュボード画面（部屋別/カテゴリ別）            | コンポーネント設計, Provide/Inject    |
| 15   | デバイス操作 UI（照明の色/明るさ、カーテン開閉等） | 動的コンポーネント, `<component :is>` |
| 16   | シーン管理（一覧表示・実行）                       | ドメインモデル追加, ユースケース拡張  |

### Phase 5 — 実践・応用

| Step | 課題                                          | 学ぶこと                               |
| ---- | --------------------------------------------- | -------------------------------------- |
| 17   | エラーハンドリング戦略（Result 型）           | Result/Either 型, API 障害時の UI 表現 |
| 18   | 定期ポーリングによるステータス自動更新        | `setInterval` + Composable             |
| 19   | ユニットテスト（ドメイン層 + ユースケース層） | Vitest, MockRepository 活用            |
| 20   | 総合リファクタリング + アーキテクチャレビュー | 依存関係の整理, 最終形の確認           |

## 進捗管理

- 各 Step は `copilot-instructions.md` の「各 Step の進め方」に沿って進行する
- Step 完了後、AI が振り返りを行い、次の課題を出題する
- Phase をまたぐ際は、Phase 全体の振り返りを行う

## 最終ディレクトリ構造

```
src/
├── domain/
│   ├── entities/          # Device, Scene
│   ├── valueObjects/      # DeviceId, Temperature, PowerState
│   └── services/          # DeviceCategoryService
├── usecases/
│   ├── GetDevices.ts
│   ├── GetDeviceStatus.ts
│   └── SendDeviceCommand.ts
├── ports/
│   └── DeviceRepository.ts   # Interface
├── infrastructure/
│   ├── SwitchBotApiRepository.ts
│   ├── MockDeviceRepository.ts
│   └── api/
│       └── switchBotClient.ts # 認証・HTTP 通信
├── ui/
│   ├── composables/
│   ├── components/
│   ├── pages/
│   └── router/
└── main.ts
```
