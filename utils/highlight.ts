import { Cell } from "./sudoku";

export function getHighlightedBlocks(
  selected: { i: number; j: number } | null,
  matrix: Cell[][]
): Array<{ i: number; j: number }> {
  if (!selected) return [];
  const cell = matrix[selected.i]?.[selected.j];
  if (!cell) return [];
  const value = cell.revealed ? cell.num : cell.userNum;
  if (!value) return [];
  const blocks: Array<{ i: number; j: number }> = [];
  matrix.forEach((row, i) => {
    row.forEach((c, j) => {
      if ((c.revealed ? c.num : c.userNum) === value) {
        blocks.push({ i, j });
      }
    });
  });
  return blocks;
}
