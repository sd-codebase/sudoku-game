import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface MistakesProps {
  count: number;
}

export default function Mistakes({ count }: MistakesProps) {
  if (count <= 0) return null;
  return (
    <View style={[styles.mistakeBlock]}>
      <Text style={styles.mistakeText}>Mistakes</Text>
      <Text style={styles.mistakeCount}>({count})</Text>
    </View>
  );
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
    fontSize: 12,
    fontWeight: "bold",
    color: "#f44336",
    marginRight: 2,
  },
  mistakeCount: {
    fontSize: 8,
    color: "#333",
    marginLeft: 2,
  },
});
