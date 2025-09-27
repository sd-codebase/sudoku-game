import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    minWidth: "100%",
    paddingInline: 16,
  },
  card: {
    backgroundColor: "#8f6be8",
    borderRadius: 32,
    paddingVertical: 48,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6a5af9",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 12,
    width: "100%",
    maxWidth: 500,
  },
  logo: {
    height: 128,
    width: 128,
    marginBottom: 24,
    resizeMode: "contain",
  },
  title: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 18,
    letterSpacing: 1,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 36,
    textAlign: "center",
    fontWeight: "400",
    lineHeight: 28,
  },
  startButton: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 38,
    borderRadius: 32,
    shadowColor: "#6a5af9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
    marginTop: 8,
  },
  startButtonText: {
    color: "#7c3aed",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});

export default function HomeScreen() {
  const router = useRouter();
  return (
    <LinearGradient colors={["#8f6be8", "#6a5af9"]} style={styles.gradient}>
      <View style={styles.card}>
        <Image
          source={require("@/assets/images/app-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Sudoku</Text>
        <Text style={styles.subtitle}>
          Sharpen your mind and challenge yourself with this classic puzzle
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push("/explore")}
        >
          <Text style={styles.startButtonText}>Start</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
