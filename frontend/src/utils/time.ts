/**秒を受け取り、継続時間を返す */
export const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return [h && `${h}時間`, m && `${m}分`, `${s}秒`].filter(Boolean).join("");
};
