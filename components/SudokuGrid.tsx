import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MinimalistColors, Typography, BorderRadius, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? MinimalistColors.dark : MinimalistColors.light;
  const styles = createStyles(colors);

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
            if ([2, 5].includes(j)) borderStyles.borderRightWidth = 2;
            if ([2, 5].includes(i)) borderStyles.borderBottomWidth = 2;

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
                  style={[
                    styles.cellText,
                    cell.revealed && styles.cellTextRevealed,
                    !cell.revealed && cell.userNum && styles.cellTextUser,
                  ]}
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

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Calculate grid size to fit on screen while being square
const headerHeight = 70;
const pendingNumbersHeight = 120;
const endGameButtonHeight = 68;
const totalOtherContent = headerHeight + pendingNumbersHeight + endGameButtonHeight + 80;

const maxGridSize = Math.min(
  screenWidth * 0.9,
  screenHeight - totalOtherContent,
  380
);

const gridSize = Math.max(280, maxGridSize);

const createStyles = (colors: typeof MinimalistColors.light) =>
  StyleSheet.create({
    grid: {
      backgroundColor: colors.gridBackground,
      width: gridSize,
      height: gridSize,
      aspectRatio: 1,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: colors.gridBorderThick,
      borderRadius: BorderRadius.lg,
      overflow: "hidden",
      marginVertical: Spacing.sm,
    },
    row: {
      flexDirection: "row",
      width: "100%",
      flex: 1,
    },
    cell: {
      flex: 1,
      borderWidth: 0.5,
      borderColor: colors.gridBorder,
      justifyContent: "center",
      alignItems: "center",
      minWidth: 0,
      minHeight: 0,
      padding: 4,
      backgroundColor: colors.cellEmpty,
    },
    cellRevealed: {
      backgroundColor: colors.cellRevealed,
    },
    cellHidden: {
      backgroundColor: colors.cellEmpty,
    },
    cellSelected: {
      backgroundColor: colors.cellSelected,
      borderWidth: 2,
      borderColor: colors.cellSelectedBorder,
    },
    cellText: {
      ...Typography.cellNumber,
      color: colors.textPrimary,
    },
    cellTextRevealed: {
      color: colors.textSecondary,
    },
    cellTextUser: {
      color: colors.accent,
      fontWeight: '600' as any,
    },
    cellMistake: {
      backgroundColor: colors.cellError,
      borderWidth: 2,
      borderColor: colors.cellErrorBorder,
    },
    cellHighlighted: {
      backgroundColor: colors.cellHighlighted,
    },
  });
