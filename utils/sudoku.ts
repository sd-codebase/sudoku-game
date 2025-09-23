export type Cell = {
  num: number;
  revealed: boolean;
  userNum?: number;
  mistake?: boolean;
};

export function generateSudokuMatrix(
  sudoku: any,
  difficulty: string
): Cell[][] {
  const flat: Array<{ i: number; j: number }> = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      flat.push({ i, j });
    }
  }
  const revealCount = getRevealCount(difficulty);
  for (let k = flat.length - 1; k > 0; k--) {
    const idx = Math.floor(Math.random() * (k + 1));
    [flat[k], flat[idx]] = [flat[idx], flat[k]];
  }
  const revealedSet = new Set(
    flat.slice(0, revealCount).map(({ i, j }) => `${i},${j}`)
  );
  return sudoku.game_matrics.map((row: any[], i: number) =>
    row.map((cell: { num: number }, j: number) => ({
      num: cell.num,
      revealed: revealedSet.has(`${i},${j}`),
      userNum: undefined,
    }))
  );
}

export function getRevealCount(difficulty: string): number {
  if (difficulty === "Easy") return Math.floor(Math.random() * 3) + 40;
  if (difficulty === "Medium") return Math.floor(Math.random() * 3) + 30;
  return Math.floor(Math.random() * 3) + 20;
}
