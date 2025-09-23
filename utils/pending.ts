import { Cell } from "./sudoku";

export function getPendingNumbers(matrix: Cell[][]): Record<number, number> {
  const counts: Record<number, number> = {};
  for (let n = 1; n <= 9; n++) counts[n] = 9;
  matrix.forEach((row) => {
    row.forEach((cell) => {
      if (cell.revealed) {
        counts[cell.num]--;
      } else if (cell.userNum && !cell.mistake) {
        counts[cell.userNum]--;
      }
    });
  });
  return counts;
}
