# 共通仕様

## Content-Type

- Request / Response: `application/json`

---

## 認証

- 認証方式: JWT（Bearerトークン）

### リクエストヘッダ

```http
Authorization: Bearer {token}
```

---

## エラーレスポンス形式（統一）

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "エラーメッセージ",
    "detail": {}
  }
}
```

---

# 1. イベント一覧表示API

## GET /events

### Response（200 OK）

```json
[
  {
    "id": 1,
    "title": "タイトル1",
    "explanation": "説明1"
  }
]
```

---

# 2. イベント詳細表示API

## GET /events/{id}

### Response（200 OK）

```json
{
  "id": 1,
  "title": "タイトル",
  "explanation": "説明"
}
```

---

# 3. イベント作成API

## POST /events

※ 認証必須

### Request

```json
{
  "title": "タイトル",
  "explanation": "説明"
}
```

### 処理

- JWTからユーザーIDを取得
- `createdBy`として保存

### Response（201 Created）

```json
{
  "id": 1,
  "title": "タイトル",
  "explanation": "説明"
}
```

---

# 4. イベント更新API

## PUT /events/{id}

※ 認証必須

### Request

```json
{
  "title": "タイトル",
  "explanation": "説明"
}
```

### 認可

- JWTのユーザーIDとイベントの`createdBy`が一致する場合のみ更新可能

### Response（200 OK）

```json
{
  "id": 1,
  "title": "タイトル",
  "explanation": "説明"
}
```

### エラーレスポンス

#### 403 Forbidden

```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "編集が許可されていません"
  }
}
```

---

# 5. イベント削除API

## DELETE /events/{id}

※ 認証必須

### 認可

- JWTのユーザーIDとイベントの`createdBy`が一致する場合のみ削除可能

### Response（204 No Content）

---

# その他エラー

## 401 Unauthorized

認証に失敗した場合

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "認証が必要です"
  }
}
```

---

## 404 Not Found

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "対象のデータが存在しません"
  }
}
```

---

## 422 Unprocessable Entity

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "入力内容に誤りがあります"
  }
}
```

---

## 500 Internal Server Error

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "しばらくしてから再度お試しください"
  }
}
```
