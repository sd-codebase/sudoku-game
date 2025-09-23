import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Cell = {
  num: number;
  revealed: boolean;
  userNum?: number;
  mistake?: boolean;
};

interface SudokuGridProps {
  matrix: Cell[][];
  selected: { i: number; j: number } | null;
  highlightedBlocks: Array<{ i: number; j: number }>;
  onSelect: (pos: { i: number; j: number }) => void;
}

export default function SudokuGrid({
  matrix,
  selected,
  highlightedBlocks,
  onSelect,
}: SudokuGridProps) {
  return (
    <View style={styles.grid}>
      {matrix.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((cell, j) => {
            const isSelected = selected && selected.i === i && selected.j === j;
            const isHighlighted = highlightedBlocks.some(
              (b) => b.i === i && b.j === j
            );
            return (
              <TouchableOpacity
                key={j}
                style={[
                  styles.cell,
                  cell.revealed ? styles.cellRevealed : styles.cellHidden,
                  isSelected && styles.cellSelected,
                  cell.mistake && styles.cellMistake,
                  isHighlighted && styles.cellHighlighted,
                ]}
                onPress={() => onSelect({ i, j })}
              >
                <Text
                  style={
                    cell.revealed ? styles.cellText : styles.cellTextHidden
                  }
                >
                  {cell.revealed ? cell.num : cell.userNum ?? ""}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    borderWidth: 2,
    borderColor: "#1565c0",
    backgroundColor: "#fff",
    margin: 12,
    alignSelf: "stretch",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "#bbb",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 0,
    minHeight: 0,
  },
  cellRevealed: {
    backgroundColor: "#eaf6ff",
  },
  cellHidden: {
    backgroundColor: "#fff",
  },
  cellSelected: {
    borderColor: "#1565c0",
    borderWidth: 1,
  },
  cellText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
  cellTextHidden: {
    fontSize: 18,
    color: "#bbb",
    fontWeight: "500",
  },
  cellMistake: {
    backgroundColor: "#ffebee",
    borderColor: "#f44336",
    borderWidth: 1,
  },
  cellHighlighted: {
    backgroundColor: "#fffde7",
    borderColor: "#ffd600",
    borderWidth: 1,
  },
});
