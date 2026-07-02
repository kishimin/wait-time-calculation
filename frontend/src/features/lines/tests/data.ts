import type { LinesResponseDto } from "../../../models";

export const enterLines: LinesResponseDto[] = [
  {
    id: crypto.randomUUID(),
    averageWaitTime: 11042,
    title: "タイトル",
    currentLineEntryId: null,
  },
];

export const exitLines: LinesResponseDto[] = [
  {
    id: crypto.randomUUID(),
    averageWaitTime: 11042,
    title: "タイトル",
    currentLineEntryId: crypto.randomUUID(),
  },
];
