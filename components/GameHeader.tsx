import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headingRow}>
        <Text style={styles.heading}>Sudoku - {difficulty}</Text>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.timerContainer}>
          <MaterialIcons
            name="access-time"
            size={28}
            color="#e0569b"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.timerText}>{formatTime(time)}</Text>
        </View>
        <View style={styles.mistakesContainer}>
          <MaterialIcons
            name="close"
            size={32}
            color="#e05656"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.mistakesText}>
            Mistakes: <Text style={styles.mistakesCount}>{mistakes}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    paddingTop: 18,
    paddingBottom: 8,
  },
  headingRow: {
    width: "100%",
    alignItems: "center",
    marginBottom: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#232a38",
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 8,
    marginTop: 4,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    fontSize: 16,
    color: "#3a3e4a",
    fontWeight: "500",
  },
  mistakesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mistakesText: {
    fontSize: 16,
    color: "#3a3e4a",
    fontWeight: "500",
  },
  mistakesCount: {
    color: "#e05656",
    fontWeight: "bold",
  },
});
