import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MinimalistColors, Typography, Spacing, BorderRadius } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface PendingNumbersProps {
  pending: Record<number, number>;
  selected: { i: number; j: number } | null;
  onSelect: (n: number) => void;
}

export default function PendingNumbers({
  pending,
  selected,
  onSelect,
}: PendingNumbersProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? MinimalistColors.dark : MinimalistColors.light;
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      {Object.entries(pending).map(([num, count]) => {
        const isDisabled = !selected || count === 0;

        return (
          <TouchableOpacity
            key={num}
            style={[
              styles.numberButton,
              isDisabled && styles.numberButtonDisabled,
            ]}
            disabled={isDisabled}
            onPress={() => onSelect(Number(num))}
          >
            <Text style={[styles.number, isDisabled && styles.numberDisabled]}>
              {num}
            </Text>
            <Text style={[styles.count, isDisabled && styles.countDisabled]}>
              {count}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const createStyles = (colors: typeof MinimalistColors.light) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-start",
      marginVertical: Spacing.sm,
      paddingHorizontal: Spacing.sm,
      width: "100%",
      gap: Spacing.xs,
    },
    numberButton: {
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.md,
      paddingHorizontal: Spacing.xs,
      paddingVertical: Spacing.xs,
      borderWidth: 1.5,
      borderColor: colors.accent,
      justifyContent: "center",
      width: "18%",
      maxWidth: 65,
      minWidth: 45,
      height: 52,
      flexBasis: "18%",
      flexGrow: 0,
      flexShrink: 0,
    },
    numberButtonDisabled: {
      backgroundColor: colors.backgroundSecondary,
      borderColor: colors.border,
      opacity: 0.5,
    },
    number: {
      ...Typography.h4,
      color: colors.accent,
      marginBottom: 2,
      fontSize: 14,
    },
    numberDisabled: {
      color: colors.textTertiary,
    },
    count: {
      ...Typography.caption,
      color: colors.textSecondary,
      fontSize: 9,
    },
    countDisabled: {
      color: colors.textTertiary,
    },
  });
