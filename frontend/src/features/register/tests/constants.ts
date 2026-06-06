export const LABELS = {
  userName: "ユーザー名",
  password: /パスワード/,
  visibilityIcon: "入力内容を表示",
  visibilityOffIcon: "入力内容を非表示",
  email: "メールアドレス",
} as const;

export const ERRORS = {
  userName: {
    required: "必須です",
    max: "50文字以内で入力してください",
  },
  password: {
    min: "11文字以上で入力してください",
    max: "100文字以内で入力してください",
    halfWidth: "半角英数字記号で入力してください",
  },
  email: {
    required: "必須です",
    max: "256文字以内で入力してください",
    style: "メールアドレスの形式が正しくありません",
  },
} as const;

export const BUTTONS = {
  create: "新規登録",
} as const;
