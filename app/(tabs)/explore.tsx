import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.13)",
    borderRadius: 36,
    paddingVertical: 48,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#c471ed",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 32,
    elevation: 12,
  },
  title: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 32,
    letterSpacing: 1,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  buttonColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  button: {
    minWidth: 220,
    paddingVertical: 18,
    borderRadius: 32,
    alignItems: "center",
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  easy: {
    backgroundColor: "#2ecc40",
  },
  medium: {
    backgroundColor: "#f1c40f",
  },
  hard: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0.5,
    marginLeft: 8,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});

export default function TabTwoScreen() {
  const router = useRouter();
  return (
    <LinearGradient colors={["#8f6be8", "#6a5af9"]} style={styles.gradient}>
      <View style={styles.card}>
        <Text style={styles.title}>Choose Difficulty</Text>
        <View style={styles.buttonColumn}>
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
            <View style={styles.buttonContent}>
              <MaterialIcons name="star" size={28} color="#fff" />
              <MaterialIcons name="star-border" size={28} color="#fff" />
              <MaterialIcons name="star-border" size={28} color="#fff" />
              <Text style={styles.buttonText}>Easy</Text>
            </View>
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
            <View style={styles.buttonContent}>
              <MaterialIcons name="star" size={28} color="#fff" />
              <MaterialIcons name="star" size={28} color="#fff" />
              <MaterialIcons name="star-border" size={28} color="#fff" />
              <Text style={styles.buttonText}>Medium</Text>
            </View>
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
            <View style={styles.buttonContent}>
              <MaterialIcons name="star" size={28} color="#fff" />
              <MaterialIcons name="star" size={28} color="#fff" />
              <MaterialIcons name="star" size={28} color="#fff" />
              <Text style={styles.buttonText}>Hard</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}
