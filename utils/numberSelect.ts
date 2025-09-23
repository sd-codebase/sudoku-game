import { Cell } from "./sudoku";

export interface NumberSelectResult {
  updatedMatrix: Cell[][];
  correct: boolean;
  mistakes: number;
  score: number;
}

export function handleNumberSelectUtil(
  n: number,
  selected: { i: number; j: number } | null,
  matrix: Cell[][],
  difficulty: string,
  mistakes: number,
  score: number,
  setMistakeCallback: (cb: () => void) => void
): NumberSelectResult {
  if (!selected)
    return { updatedMatrix: matrix, correct: false, mistakes, score };
  let correct = false;
  let addScore = 0;
  let deductScore = 0;
  if (difficulty === "Easy") {
    addScore = 10;
    deductScore = 5;
  } else if (difficulty === "Medium") {
    addScore = 20;
    deductScore = 5;
  } else {
    addScore = 50;
    deductScore = 20;
  }
  const next = matrix.map((row) => row.map((cell) => ({ ...cell })));
  const cell = next[selected.i][selected.j];
  if (cell.revealed)
    return { updatedMatrix: matrix, correct: false, mistakes, score };
  if (cell.userNum === n)
    return { updatedMatrix: matrix, correct: false, mistakes, score };
  if (cell.num !== n) {
    mistakes += 1;
    score -= deductScore;
    cell.mistake = true;
    setMistakeCallback(() => {
      // Remove highlight after 2 seconds
      cell.mistake = false;
    });
    // Do NOT add the number to the block
    return { updatedMatrix: next, correct: false, mistakes, score };
  }
  cell.userNum = n;
  cell.revealed = true;
  cell.mistake = false;
  score += addScore;
  correct = true;
  return { updatedMatrix: next, correct, mistakes, score };
}
