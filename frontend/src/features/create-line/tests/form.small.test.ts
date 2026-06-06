import { explanationSchema, titleSchema } from "../schemas/form";
import { ERRORS } from "./constants";

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
