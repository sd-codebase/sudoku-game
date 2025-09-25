import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
import CongratsMessage from "../components/CongratsMessage";
import EndGameButton from "../components/EndGameButton";
import Mistakes from "../components/Mistakes";
import PendingNumbers from "../components/PendingNumbers";
import Score from "../components/Score";
import SudokuGrid from "../components/SudokuGrid";
import Timer from "../components/Timer";
import { getHighlightedBlocks } from "../utils/highlight";
import { handleNumberSelectUtil } from "../utils/numberSelect";
import { getPendingNumbers } from "../utils/pending";
import { generateSudokuMatrix } from "../utils/sudoku";

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
    setMatrix(generateSudokuMatrix(sudoku, difficulty as string));
  }, [difficulty]);

  type Cell = {
    num: number;
    revealed: boolean;
    userNum?: number;
    mistake?: boolean;
  };

  const pending = getPendingNumbers(matrix);
  const [selected, setSelected] = useState<{ i: number; j: number } | null>(
    null
  );
  const [highlightedBlocks, setHighlightedBlocks] = useState<
    Array<{ i: number; j: number }>
  >([]);
  const [mistakes, setMistakes] = useState(0);
  const [score, setScore] = useState(0);

  function handleNumberSelect(n: number) {
    if (!selected) return;
    setMatrix((prev) => {
      let mistakeTimeout: any = null;
      const result = handleNumberSelectUtil(
        n,
        selected,
        prev,
        difficulty as string,
        mistakes,
        score,
        (cb) => {
          mistakeTimeout = setTimeout(() => {
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
        }
      );
      setMistakes(result.mistakes);
      setScore(result.score);
      if (result.correct) setSelected(null);
      return result.updatedMatrix;
    });
  }

  // Highlight all blocks with the same number for 2 seconds when a block with a number is focused
  useEffect(() => {
    const blocks = getHighlightedBlocks(selected, matrix);
    setHighlightedBlocks(blocks);
    if (blocks.length > 0) {
      const timeout = setTimeout(() => {
        setHighlightedBlocks([]);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [selected, matrix]);

  // ...existing code...

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerRight}>
          <Timer seconds={seconds} />
          <Score value={score} />
        </View>
        <Mistakes count={mistakes} />
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
    justifyContent: "center",
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
