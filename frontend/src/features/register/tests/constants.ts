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
} as const;
