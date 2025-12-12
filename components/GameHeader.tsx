import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MinimalistColors, Typography, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface GameHeaderProps {
  difficulty: string;
  time: number;
  mistakes: number;
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function GameHeader({
  difficulty,
  time,
  mistakes,
}: GameHeaderProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? MinimalistColors.dark : MinimalistColors.light;
  const styles = createStyles(colors);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headingRow}>
        <Text style={styles.heading}>{difficulty}</Text>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.statContainer}>
          <MaterialIcons
            name="schedule"
            size={20}
            color={colors.textSecondary}
            style={{ marginRight: Spacing.xs }}
          />
          <Text style={styles.statText}>{formatTime(time)}</Text>
        </View>
        <View style={styles.statContainer}>
          <MaterialIcons
            name="error-outline"
            size={20}
            color={colors.error}
            style={{ marginRight: Spacing.xs }}
          />
          <Text style={styles.statText}>
            <Text style={styles.mistakesCount}>{mistakes}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const createStyles = (colors: typeof MinimalistColors.light) =>
  StyleSheet.create({
    headerContainer: {
      width: "100%",
      paddingTop: Spacing.sm,
      paddingBottom: Spacing.xs,
    },
    headingRow: {
      width: "100%",
      alignItems: "center",
      marginBottom: Spacing.xs,
    },
    heading: {
      ...Typography.h4,
      textAlign: "center",
      color: colors.textPrimary,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: Spacing.sm,
      marginTop: 0,
    },
    statContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    statText: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
    },
    mistakesCount: {
      ...Typography.bodySmall,
      color: colors.error,
      fontWeight: "600" as any,
    },
  });
