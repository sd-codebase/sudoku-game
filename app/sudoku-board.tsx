import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import CongratsMessage from "../components/CongratsMessage";
import EndGameButton from "../components/EndGameButton";
import Mistakes from "../components/Mistakes";
import PendingNumbers from "../components/PendingNumbers";
import Score from "../components/Score";
import SudokuGrid from "../components/SudokuGrid";
function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function SudokuBoard() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  const { difficulty } = useLocalSearchParams();
  // Removed duplicate matrix declaration
  const [matrix, setMatrix] = useState<Cell[][]>([]);
  // Check if game is complete (all cells revealed)
  const isGameComplete =
    matrix.length === 9 &&
    matrix.every((row) => row.every((cell) => cell.revealed));
  // Animation for congratulations popup
  const [showCongrats, setShowCongrats] = useState(false);
  const congratsScale = useRef(new Animated.Value(0)).current;
  // End Game handler
  function handleEndGame() {
    router.replace("/");
  }
  // Show congratulations and navigate to main page when game completes
  useEffect(() => {
    if (isGameComplete) {
      setShowCongrats(true);
      Animated.spring(congratsScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setShowCongrats(false);
        router.replace("/");
      }, 2500);
    }
  }, [isGameComplete]);

  useEffect(() => {
    // For demo, always load the sample file
    const sudoku = require("@/assets/sample-data/sudoku-sample.json");
    const flat: Array<{ i: number; j: number }> = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        flat.push({ i, j });
      }
    }
    const revealCount = getRevealCount(difficulty as string);
    for (let k = flat.length - 1; k > 0; k--) {
      const idx = Math.floor(Math.random() * (k + 1));
      [flat[k], flat[idx]] = [flat[idx], flat[k]];
    }
    const revealedSet = new Set(
      flat.slice(0, revealCount).map(({ i, j }) => `${i},${j}`)
    );
    const newMatrix: Cell[][] = sudoku.game_matrics.map(
      (row: any[], i: number) =>
        row.map((cell: { num: number }, j: number) => ({
          num: cell.num,
          revealed: revealedSet.has(`${i},${j}`),
          userNum: undefined,
        }))
    );
    setMatrix(newMatrix);
  }, [difficulty]);

  type Cell = {
    num: number;
    revealed: boolean;
    userNum?: number;
    mistake?: boolean;
  };

  function getRevealCount(difficulty: string): number {
    if (difficulty === "Easy") return Math.floor(Math.random() * 3) + 78; // 40-42
    if (difficulty === "Medium") return Math.floor(Math.random() * 3) + 30; // 30-32
    return Math.floor(Math.random() * 3) + 20; // 20-22
  }

  function getPendingNumbers(matrix: Cell[][]): Record<number, number> {
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

  const pending = getPendingNumbers(matrix);
  const [selected, setSelected] = useState<{ i: number; j: number } | null>(
    null
  );
  const [highlightedBlocks, setHighlightedBlocks] = useState<
    Array<{ i: number; j: number }>
  >([]);
  const [mistakes, setMistakes] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const sudoku = require("@/assets/sample-data/sudoku-sample.json");
    const flat: Array<{ i: number; j: number }> = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        flat.push({ i, j });
      }
    }
    const revealCount = getRevealCount(difficulty as string);
    for (let k = flat.length - 1; k > 0; k--) {
      const idx = Math.floor(Math.random() * (k + 1));
      [flat[k], flat[idx]] = [flat[idx], flat[k]];
    }
    const revealedSet = new Set(
      flat.slice(0, revealCount).map(({ i, j }) => `${i},${j}`)
    );
    const newMatrix: Cell[][] = sudoku.game_matrics.map(
      (row: any[], i: number) =>
        row.map((cell: { num: number }, j: number) => ({
          num: cell.num,
          revealed: revealedSet.has(`${i},${j}`),
        }))
    );
    setMatrix(newMatrix);
  }, [difficulty]);

  function handleNumberSelect(n: number) {
    if (!selected) return;
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
    setMatrix((prev) => {
      const next = prev.map((row) => row.map((cell) => ({ ...cell })));
      const cell = next[selected.i][selected.j];
      if (cell.revealed) return prev;
      if (cell.userNum === n) return prev;
      if (cell.num !== n) {
        setMistakes((m) => m + 1);
        setScore((s) => s - deductScore);
        cell.mistake = true;
        // Remove highlight after 2 seconds
        setTimeout(() => {
          setMatrix((current) => {
            const updated = current.map((row, i) =>
              row.map((c, j) => {
                if (i === selected.i && j === selected.j) {
                  return { ...c, mistake: false };
                }
                return c;
              })
            );
            return updated;
          });
        }, 2000);
        // Do NOT add the number to the block
        return next;
      }
      cell.userNum = n;
      cell.revealed = true;
      cell.mistake = false;
      setScore((s) => s + addScore);
      correct = true;
      return next;
    });
    // Remove focus if correct number is placed
    if (correct) setSelected(null);
  }

  // Highlight all blocks with the same number for 2 seconds when a block with a number is focused
  useEffect(() => {
    if (!selected) return;
    const cell = matrix[selected.i]?.[selected.j];
    if (!cell) return;
    const value = cell.revealed ? cell.num : cell.userNum;
    if (!value) return;
    const blocks: Array<{ i: number; j: number }> = [];
    matrix.forEach((row, i) => {
      row.forEach((c, j) => {
        if ((c.revealed ? c.num : c.userNum) === value) {
          blocks.push({ i, j });
        }
      });
    });
    setHighlightedBlocks(blocks);
    const timeout = setTimeout(() => {
      setHighlightedBlocks([]);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [selected, matrix]);

  // ...existing code...

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Mistakes count={mistakes} />
        <View style={styles.headerRight}>
          <Text style={styles.timer}>{formatTime(seconds)}</Text>
          <Score value={score} />
        </View>
      </View>

      {/* Congratulations message if game is complete */}
      <CongratsMessage
        visible={showCongrats}
        scale={congratsScale}
        score={score}
      />

      <SudokuGrid
        matrix={matrix}
        selected={selected}
        highlightedBlocks={highlightedBlocks}
        onSelect={setSelected}
      />

      {/* Removed Pending Numbers title */}
      <PendingNumbers
        pending={pending}
        selected={selected}
        onSelect={handleNumberSelect}
      />

      {/* End Game button at the end of the page content */}
      <EndGameButton onPress={handleEndGame} show={!isGameComplete} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5fa",
    padding: 16,
    minHeight: "100%",
    justifyContent: "flex-start",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 12,
    marginBottom: 0,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 16,
  },
  timer: {
    fontSize: 16,
    color: "#1565c0",
    fontWeight: "bold",
    marginRight: 12,
  },
});
