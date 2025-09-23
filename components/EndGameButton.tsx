import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface EndGameButtonProps {
  onPress: () => void;
  show?: boolean;
}

export default function EndGameButton({ onPress, show }: EndGameButtonProps) {
  if (!show) return null;

  return (
    <TouchableOpacity style={styles.endGameButton} onPress={onPress}>
      <Text style={styles.endGameText}>End Game 😞</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  endGameButton: {
    backgroundColor: "#ffebee",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignSelf: "center",
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#f44336",
  },
  endGameText: {
    color: "#f44336",
    fontSize: 18,
    fontWeight: "bold",
  },
});
