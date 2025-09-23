import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5fa",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#333",
    letterSpacing: 1,
  },
  button: {
    width: 220,
    paddingVertical: 18,
    borderRadius: 18,
    marginVertical: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
  },
  easy: {
    backgroundColor: "#e0ffe0",
    borderColor: "#4caf50",
  },
  medium: {
    backgroundColor: "#fffbe0",
    borderColor: "#ff9800",
  },
  hard: {
    backgroundColor: "#ffe0e0",
    borderColor: "#f44336",
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#222",
    letterSpacing: 0.5,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});

export default function TabTwoScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Difficulty level</Text>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.easy,
          pressed && styles.pressed,
        ]}
        onPress={() =>
          router.push({
            pathname: "/sudoku-board",
            params: { difficulty: "Easy" },
          })
        }
      >
        <Text style={styles.buttonText}>Easy</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.medium,
          pressed && styles.pressed,
        ]}
        onPress={() =>
          router.push({
            pathname: "/sudoku-board",
            params: { difficulty: "Medium" },
          })
        }
      >
        <Text style={styles.buttonText}>Medium</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.hard,
          pressed && styles.pressed,
        ]}
        onPress={() =>
          router.push({
            pathname: "/sudoku-board",
            params: { difficulty: "Hard" },
          })
        }
      >
        <Text style={styles.buttonText}>Hard</Text>
      </Pressable>
    </View>
  );
}
