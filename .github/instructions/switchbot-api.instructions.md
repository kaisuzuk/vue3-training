---
description: "Use when implementing SwitchBot API calls, authentication, device control, or status retrieval. SwitchBot API の認証、デバイス操作、ステータス取得の実装時に参照。"
applyTo: src/infrastructure/**, src/ports/**
---

# SwitchBot API v1.1 リファレンス

## 認証

HMAC-SHA256 署名が必要。リクエストヘッダーに以下を含める:

| Header          | 値                                                             |
| --------------- | -------------------------------------------------------------- |
| `Authorization` | Open Token                                                     |
| `sign`          | HMAC-SHA256 署名（token + timestamp + nonce を secret で署名） |
| `t`             | タイムスタンプ（ミリ秒）                                       |
| `nonce`         | ランダム UUID                                                  |
| `Content-Type`  | `application/json`                                             |

## 主要エンドポイント

### デバイス一覧取得

```
GET https://api.switch-bot.com/v1.1/devices
```

レスポンス: `{ statusCode: 100, body: { deviceList: [...], infraredRemoteList: [...] } }`

### デバイスステータス取得

```
GET https://api.switch-bot.com/v1.1/devices/{deviceId}/status
```

### デバイスコマンド送信

```
POST https://api.switch-bot.com/v1.1/devices/{deviceId}/commands
Body: { command: string, parameter: string | object, commandType: "command" | "customize" }
```

### シーン一覧取得

```
GET https://api.switch-bot.com/v1.1/scenes
```

### シーン実行

```
POST https://api.switch-bot.com/v1.1/scenes/{sceneId}/execute
```

## 主要デバイスタイプと操作コマンド

| カテゴリ       | deviceType 例                          | 主なコマンド                                     |
| -------------- | -------------------------------------- | ------------------------------------------------ |
| 照明           | Color Bulb, Strip Light, Ceiling Light | turnOn, turnOff, toggle, setBrightness, setColor |
| 電源           | Plug, Plug Mini (JP)                   | turnOn, turnOff, toggle                          |
| カーテン       | Curtain, Curtain3                      | turnOn(open), turnOff(close), setPosition        |
| ロック         | Smart Lock, Smart Lock Pro             | lock, unlock                                     |
| センサー       | Meter, Motion Sensor, Contact Sensor   | （読み取り専用）                                 |
| エアコン(IR)   | Air Conditioner (remote)               | setAll("temp,mode,fan,power")                    |
| ロボット掃除機 | Robot Vacuum Cleaner S1                | start, stop, dock                                |

## エラーコード

| コード | 意味                          |
| ------ | ----------------------------- |
| 100    | 成功                          |
| 151    | デバイスタイプエラー          |
| 152    | デバイスが見つからない        |
| 160    | コマンド未サポート            |
| 161    | デバイスオフライン            |
| 171    | Hub オフライン                |
| 190    | 内部エラー / コマンド形式不正 |

## リクエスト制限

- API レート制限あり（日次上限あり）
- 開発時は MockRepository を優先し、実 API コールを最小限に
