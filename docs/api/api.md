# 共通仕様

## Content-Type

- Request / Response: `application/json`

## エラーレスポンス形式（統一）

全てのエラーは以下の形式で返却する。

- `error.code`: 機械判定用コード
- `error.message`: 表示用メッセージ
- `error.detail`: 任意（バリデーション詳細など）

例：

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "タイトルは必須です",
    "detail": {
      "title": "required"
    }
  }
}
```

# 1. イベント一覧表示API

## GET /events

全てのイベントを返す。

### Response

```json
[
  {
    "title": "タイトル1",
    "explanation": "説明1"
  },
  {
    "title": "タイトル2",
    "explanation": "説明2"
  }
]
```

# 2. イベント詳細表示API

## GET /events/:id

### Response

```json
{
  "title": "タイトル",
  "explanation": "説明"
}
```

# 3. イベント作成API

## POST /events

### Request

```json
{
  "title": "タイトル",
  "explanation": "説明",
  "userId": "ユーザー"
}
```

### Validation

- `title`は必須
- `title`は最大100文字
- `explanation`は最大400文字
- `userId`は必須

### エラーレスポンス

#### 422 Unprocessable Entity

- `title`が空
- `title`が101文字以上
- `explanation`が401文字以上
- `userId`が`null`

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "タイトルは必須です"
  }
}
```

# 4. イベント更新API

## PUT /events/:id

### Request

```json
{
  "title": "タイトル",
  "explanation": "説明",
  "userId": "ユーザー"
}
```

### Validation

- `title`は必須
- `title`は最大100文字
- `explanation`は最大400文字
- `userId`は必須
- `userId`が作成時の`userId`と異なる時にエラー

### エラーレスポンス

#### 422 Unprocessable Entity

- `title`が空
- `title`が101文字以上
- `explanation`が401文字以上
- `userId`が`null`

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "タイトルは必須です"
  }
}
```

#### 403 Forbidden

- `userId`が作成時の`userId`と異なる

```json
{
  "error": {
    "code": "INVALID_AUTHORITY",
    "message": "編集が許可されていません"
  }
}
```

# 5. イベント削除API

## DELETE /events/:id

### Request

```json
{
  "userId": "ユーザー"
}
```

### Validation

- `userId`は必須
- `userId`が作成時の`userId`と異なる時にエラー

### エラーレスポンス

#### 422 Unprocessable Entity

- `userId`が`null`

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "実行したユーザーが分かりません"
  }
}
```

#### 403 Forbidden

- `userId`が作成時の`userId`と異なる

```json
{
  "error": {
    "code": "INVALID_AUTHORITY",
    "message": "削除が許可されていません"
  }
}
```

# その他のエラー

#### 429 Too Many Requests

リクエストが想定よりも多い場合(1分間に20回以上)

```json
{
  "error": {
    "code": "MANY_REQUESTS",
    "message": "問い合わせ回数が多すぎます"
  }
}
```

#### 500 Internal Server Error（想定外）

想定外のサーバーエラーが発生した場合。

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "しばらくしてから再度お試しください"
  }
}
```
