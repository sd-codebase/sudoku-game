import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MinimalistColors, Typography, Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const createStyles = (isDark: boolean) => {
  const colors = isDark ? MinimalistColors.dark : MinimalistColors.light;

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100%",
      minWidth: "100%",
      backgroundColor: colors.backgroundSecondary,
      paddingHorizontal: Spacing.md,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.xxl,
      paddingVertical: Spacing.xxxl,
      paddingHorizontal: Spacing.lg,
      alignItems: "center",
      justifyContent: "center",
      ...Shadows.md,
      width: "100%",
      maxWidth: 500,
    },
    logo: {
      height: 128,
      width: 128,
      marginBottom: Spacing.lg,
      resizeMode: "contain",
    },
    title: {
      ...Typography.h1,
      color: colors.textPrimary,
      marginBottom: Spacing.md,
      textAlign: "center",
    },
    subtitle: {
      ...Typography.bodyLarge,
      color: colors.textSecondary,
      marginBottom: Spacing.xl,
      textAlign: "center",
      paddingHorizontal: Spacing.md,
    },
    startButton: {
      backgroundColor: "transparent",
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.xl,
      borderRadius: BorderRadius.full,
      borderWidth: 2,
      borderColor: colors.accent,
      marginTop: Spacing.sm,
    },
    startButtonText: {
      ...Typography.button,
      color: colors.accent,
    },
    pressed: {
      opacity: 0.7,
      transform: [{ scale: 0.97 }],
    },
  });
};

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = createStyles(isDark);

  return (
    <View style={styles.container}>
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
    </View>
  );
}
