import { emailSchema, passwordSchema, userNameSchema } from "../schemas/form";
import { ERRORS } from "./constants";

type TestCase = {
  char: string;
  value: string;
};

describe("ユーザー名", () => {
  test("空の時エラーとなる", () => {
    const result = userNameSchema.safeParse("");

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(ERRORS.userName.required);
  });

  test("51文字以上の時エラーとなる", () => {
    const result = userNameSchema.safeParse("a".repeat(51));

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(ERRORS.userName.max);
  });
});

describe("パスワード", () => {
  test("10文字以下の時エラーとなる", () => {
    const result = passwordSchema.safeParse("a".repeat(10));

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(ERRORS.password.min);
  });

  test("101文字以上の時エラーとなる", () => {
    const result = passwordSchema.safeParse("a".repeat(101));

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(ERRORS.password.max);
  });

  test("半角英数字記号以外を含む時エラーが表示される", () => {
    const result = passwordSchema.safeParse("あaA1!".repeat(11));

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(ERRORS.password.halfWidth);
  });

  const cases: TestCase[] = [
    { char: "数字", value: "aA!".repeat(11) },
    { char: "小文字のアルファベット", value: "A1!".repeat(11) },
    { char: "大文字のアルファベット", value: "a1!".repeat(11) },
    { char: "半角記号", value: "aA1".repeat(11) },
  ];
  test.each([...cases])("$charを含まない時エラーとなる", ({ char, value }) => {
    const result = passwordSchema.safeParse(value);

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(`${char}を含めてください`);
  });
});

describe("メールアドレス", () => {
  test("空の時エラーとなる", () => {
    const result = emailSchema.safeParse("");

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(ERRORS.email.required);
  });

  test("257文字以上の時エラーとなる", () => {
    const result = emailSchema.safeParse("a".repeat(257));

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(ERRORS.email.max);
  });

  test("メールアドレスの形式が正しくない時エラーとなる", () => {
    const result = emailSchema.safeParse("a");

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(ERRORS.email.style);
  });
});
