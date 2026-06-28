import { formatDuration } from "./time";

describe("formatDuration", () => {
  test("数値を受け取り、h時m分s秒の文字列を返す", () => {
    const seconds = 11042;

    expect(formatDuration(seconds)).toBe("3時間4分2秒");
  });

  test("時間が0の時、時間が表示されない", () => {
    const seconds = 242;

    expect(formatDuration(seconds)).toBe("4分2秒");
  });

  test("分が0のとき、分が表示されない", () => {
    const seconds = 14402;

    expect(formatDuration(seconds)).toBe("4時間2秒");
  });

  test("秒が0のとき、秒が表示される", () => {
    const seconds = 14520;

    expect(formatDuration(seconds)).toBe("4時間2分0秒");
  });
});
