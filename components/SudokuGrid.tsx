import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
            // Calculate thick borders for 3x3 blocks
            const borderStyles: any = {};
            if ([2, 5].includes(j)) borderStyles.borderRightWidth = 3;
            if ([2, 5].includes(i)) borderStyles.borderBottomWidth = 3;

            return (
              <TouchableOpacity
                key={j}
                style={[
                  styles.cell,
                  borderStyles,
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

const DeviceWidth = Math.min(
  500,
  Math.max(320, 0.9 * Dimensions.get("window").width)
);

const styles = StyleSheet.create({
  grid: {
    backgroundColor: "#e5e6ea",
    width: DeviceWidth - 32 - 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#bbb",
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 16,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#bbb",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 0,
    minHeight: 0,
    padding: 4,
    backgroundColor: "#e5e6ea",
  },
  cellRevealed: {
    backgroundColor: "#eaf6ff",
  },
  cellHidden: {
    backgroundColor: "#fff",
  },
  cellSelected: {
    backgroundColor: "#09a10c68",
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
    backgroundColor: "#eb857e83",
  },
  cellHighlighted: {
    backgroundColor: "#ffd50089",
  },
});
