# 共通仕様

## Content-Type

- Request / Response: `application/json`

---

## エラーレスポンス形式（統一）

全てのエラーは以下の形式で返却する。

- `error.code`: 機械判定用コード
- `error.message`: 表示用メッセージ
- `error.detail`: 任意（バリデーション詳細など）

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

---

# 1. イベント一覧表示API

## GET /events

全てのイベントを返す。

### Response（200 OK）

```json
[
  {
    "id": 1,
    "title": "タイトル1",
    "explanation": "説明1"
  },
  {
    "id": 2,
    "title": "タイトル2",
    "explanation": "説明2"
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

### Request

```json
{
  "title": "タイトル",
  "explanation": "説明"
}
```

### Validation

- `title`は必須
- `title`は最大100文字
- `explanation`は最大400文字

### Response（201 Created）

```json
{
  "id": 1,
  "title": "タイトル",
  "explanation": "説明"
}
```

### エラーレスポンス

#### 422 Unprocessable Entity

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "入力内容に誤りがあります"
  }
}
```

---

# 4. イベント更新API

## PUT /events/{id}

### Request

```json
{
  "title": "タイトル",
  "explanation": "説明"
}
```

### Validation

- `title`は必須
- `title`は最大100文字
- `explanation`は最大400文字

### Response（200 OK）

```json
{
  "id": 1,
  "title": "タイトル",
  "explanation": "説明"
}
```

### エラーレスポンス

#### 422 Unprocessable Entity

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "入力内容に誤りがあります"
  }
}
```

---

# 5. イベント削除API

## DELETE /events/{id}

### Response（204 No Content）

レスポンスボディなし

---

# その他のエラー

#### 404 Not Found

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "対象のデータが存在しません"
  }
}
```

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

#### 500 Internal Server Error

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "しばらくしてから再度お試しください"
  }
}
```
