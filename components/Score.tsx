import React from "react";
import { StyleSheet, Text } from "react-native";

interface ScoreProps {
  value: number;
}

export default function Score({ value }: ScoreProps) {
  return (
    <Text style={[styles.score, { color: value >= 0 ? "#388e3c" : "#d32f2f" }]}>
      {`Score: ${value}`}
    </Text>
  );
}

const styles = StyleSheet.create({
  score: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});
