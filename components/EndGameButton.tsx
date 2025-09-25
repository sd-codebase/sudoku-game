import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface EndGameButtonProps {
  onPress: () => void;
  show?: boolean;
}

export default function EndGameButton({ onPress, show }: EndGameButtonProps) {
  if (!show) return null;

  return (
    <LinearGradient
      colors={["#ff5858", "#f8576c"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientButton}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <View style={styles.contentRow}>
          <MaterialIcons
            name="close"
            size={28}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.endGameText}>End Game</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientButton: {
    borderRadius: 32,
    alignSelf: "center",
    marginVertical: 16,
    shadowColor: "#f8576c",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  touchable: {
    borderRadius: 32,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  endGameText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
