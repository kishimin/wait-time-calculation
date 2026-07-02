import { explanationSchema, titleSchema } from "./line";

export const ERRORS = {
  title: {
    required: "必須です",
    max: "100文字以内で入力してください",
  },
  explanation: {
    max: "400文字以内で入力してください",
  },
} as const;

describe("タイトル", () => {
  test("空の時エラーとなる", () => {
    const result = titleSchema.safeParse("");

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(ERRORS.title.required);
  });

  test("101文字以上の時エラーとなる", () => {
    const result = titleSchema.safeParse("あ".repeat(101));

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(ERRORS.title.max);
  });
});

describe("説明", () => {
  test("401文字以上の時エラーとなる", () => {
    const result = explanationSchema.safeParse("あ".repeat(401));

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(ERRORS.explanation.max);
  });
});
