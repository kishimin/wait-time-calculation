export const LABELS = {
  TITLE: "タイトル",
  EXPLANATION: "説明",
} as const;

export const BUTTONS = {
  CREATE: "作成",
} as const;

export const ERRORS = {
  title: {
    required: "必須です",
    max: "100文字以内で入力してください",
  },
  explanation: {
    max: "400文字以内で入力してください",
  },
} as const;
