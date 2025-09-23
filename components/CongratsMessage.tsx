import React from "react";
import { Animated, Dimensions, StyleSheet, Text } from "react-native";

interface CongratsMessageProps {
  visible: boolean;
  scale: Animated.Value;
  score: number;
}

export default function CongratsMessage({
  visible,
  scale,
  score,
}: CongratsMessageProps) {
  if (!visible) return null;
  return (
    <Animated.View
      style={[
        styles.congratsPopup,
        {
          transform: [{ scale }],
          top: Dimensions.get("window").height / 4,
        },
      ]}
    >
      <Text style={styles.congratsText}>🎉 Congratulations! 🎉</Text>
      <Text style={styles.congratsSubText}>You completed the Sudoku!</Text>
      <Text style={styles.congratsScore}>{`Your Score: ${score}`}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  congratsPopup: {
    position: "absolute",
    left: 24,
    right: 24,
    backgroundColor: "#e3fcef",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#388e3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    zIndex: 100,
  },
  congratsText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#388e3c",
    marginBottom: 8,
  },
  congratsSubText: {
    fontSize: 18,
    color: "#1565c0",
  },
  congratsScore: {
    fontSize: 20,
    color: "#388e3c",
    fontWeight: "bold",
    marginTop: 12,
  },
});
