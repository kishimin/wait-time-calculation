import { userNameSchema } from "../schemas/form";
import { ERRORS } from "./constants";

describe("ユーザー名", () => {
  test("空の時エラーとなる", () => {
    const result = userNameSchema.safeParse("");

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]["message"]).toBe(ERRORS.userName.required);
  });

  test("51文字以上の時エラーとなる", () => {
    const result = userNameSchema.safeParse("a".repeat(51));

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]["message"]).toBe(ERRORS.userName.max);
  });
});
