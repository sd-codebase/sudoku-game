import React from "react";
import { StyleSheet, Text } from "react-native";

interface MistakesProps {
  count: number;
}

export default function Mistakes({ count }: MistakesProps) {
  if (count <= 0) return null;
  return <Text style={styles.mistakeText}>Mistakes: {count}</Text>;
}

const styles = StyleSheet.create({
  mistakeBlock: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffebee",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#f44336",
    minWidth: 32,
    justifyContent: "center",
  },
  mistakeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d32f2f",
    marginRight: 2,
  },
  mistakeCount: {
    fontSize: 16,
    color: "#d32f2f",
    fontWeight: "bold",
    marginLeft: 2,
  },
});
