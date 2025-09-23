import React from "react";
import { StyleSheet, Text } from "react-native";

interface TimerProps {
  seconds: number;
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function Timer({ seconds }: TimerProps) {
  return <Text style={styles.timer}>{formatTime(seconds)}</Text>;
}

const styles = StyleSheet.create({
  timer: {
    fontSize: 16,
    color: "#1565c0",
    fontWeight: "bold",
    marginRight: 12,
    width: 80,
  },
});
