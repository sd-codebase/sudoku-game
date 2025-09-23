import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/partial-react-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Sudoku Challenge</Text>
      <Text style={styles.subtitle}>Sharpen your mind. Solve the puzzle!</Text>
      <Pressable
        style={({ pressed }) => [styles.startButton, pressed && styles.pressed]}
        onPress={() => router.push("/explore")}
      >
        <Text style={styles.startButtonText}>Start Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaf6ff",
    padding: 24,
  },
  logo: {
    height: 120,
    width: 180,
    marginBottom: 24,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1565c0",
    marginBottom: 12,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    marginBottom: 36,
    textAlign: "center",
  },
  startButton: {
    backgroundColor: "#1565c0",
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});
