import GameHeader from "@/components/GameHeader";
import SudokuGrid from "@/components/SudokuGrid";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import CongratsMessage from "../components/CongratsMessage";
import EndGameButton from "../components/EndGameButton";
import PendingNumbers from "../components/PendingNumbers";
import { getHighlightedBlocks } from "../utils/highlight";
import { handleNumberSelectUtil } from "../utils/numberSelect";
import { getPendingNumbers } from "../utils/pending";
import { generateSudokuMatrix } from "../utils/sudoku";

// const sudoku = require("@/assets/sample-data/sudoku-sample.json");

const SudokuData = {
  id: 1,
  game_matrics: [
    [
      { num: 5 },
      { num: 3 },
      { num: 4 },
      { num: 6 },
      { num: 7 },
      { num: 8 },
      { num: 9 },
      { num: 1 },
      { num: 2 },
    ],
    [
      { num: 6 },
      { num: 7 },
      { num: 2 },
      { num: 1 },
      { num: 9 },
      { num: 5 },
      { num: 3 },
      { num: 4 },
      { num: 8 },
    ],
    [
      { num: 1 },
      { num: 9 },
      { num: 8 },
      { num: 3 },
      { num: 4 },
      { num: 2 },
      { num: 5 },
      { num: 6 },
      { num: 7 },
    ],
    [
      { num: 8 },
      { num: 5 },
      { num: 9 },
      { num: 7 },
      { num: 6 },
      { num: 1 },
      { num: 4 },
      { num: 2 },
      { num: 3 },
    ],
    [
      { num: 4 },
      { num: 2 },
      { num: 6 },
      { num: 8 },
      { num: 5 },
      { num: 3 },
      { num: 7 },
      { num: 9 },
      { num: 1 },
    ],
    [
      { num: 7 },
      { num: 1 },
      { num: 3 },
      { num: 9 },
      { num: 2 },
      { num: 4 },
      { num: 8 },
      { num: 5 },
      { num: 6 },
    ],
    [
      { num: 9 },
      { num: 6 },
      { num: 1 },
      { num: 5 },
      { num: 3 },
      { num: 7 },
      { num: 2 },
      { num: 8 },
      { num: 4 },
    ],
    [
      { num: 2 },
      { num: 8 },
      { num: 7 },
      { num: 4 },
      { num: 1 },
      { num: 9 },
      { num: 6 },
      { num: 3 },
      { num: 5 },
    ],
    [
      { num: 3 },
      { num: 4 },
      { num: 5 },
      { num: 2 },
      { num: 8 },
      { num: 6 },
      { num: 1 },
      { num: 7 },
      { num: 9 },
    ],
  ],
};

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
    setMatrix(generateSudokuMatrix(SudokuData, difficulty as string));
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
        setSelected(null);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [selected, matrix]);

  // ...existing code...

  return (
    <LinearGradient colors={["#8f6be8", "#6a5af9"]} style={styles.gradientBg}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <GameHeader
            difficulty={difficulty as string}
            time={seconds}
            mistakes={mistakes}
          />

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

          <PendingNumbers
            pending={pending}
            selected={selected}
            onSelect={handleNumberSelect}
          />

          <EndGameButton onPress={handleEndGame} show={!isGameComplete} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const DeviceWidth = Math.min(
  500,
  Math.max(320, 0.9 * Dimensions.get("window").width)
);

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    minWidth: "100%",
    paddingInline: 16,
    boxSizing: "border-box",
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    padding: 8,
  },

  card: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 32,
    paddingHorizontal: 12,
    alignItems: "center",
    shadowColor: "#6a5af9",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 12,
    width: DeviceWidth - 32,
    maxWidth: 500,
  },
});
