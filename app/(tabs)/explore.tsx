import { MaterialIcons } from "@expo/vector-icons";
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
    contentCard: {
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
    title: {
      ...Typography.h1,
      color: colors.textPrimary,
      marginBottom: Spacing.xl,
      textAlign: "center",
    },
    difficultyContainer: {
      width: "100%",
      gap: Spacing.md,
    },
    difficultyCard: {
      backgroundColor: colors.surface,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: BorderRadius.xl,
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.md,
      alignItems: "center",
      ...Shadows.sm,
    },
    difficultyCardEasy: {
      borderColor: colors.difficultyEasy,
    },
    difficultyCardMedium: {
      borderColor: colors.difficultyMedium,
    },
    difficultyCardHard: {
      borderColor: colors.difficultyHard,
    },
    difficultyContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: Spacing.sm,
    },
    starsContainer: {
      flexDirection: "row",
      gap: 2,
    },
    difficultyText: {
      ...Typography.h3,
      marginLeft: Spacing.sm,
    },
    difficultyTextEasy: {
      color: colors.difficultyEasy,
    },
    difficultyTextMedium: {
      color: colors.difficultyMedium,
    },
    difficultyTextHard: {
      color: colors.difficultyHard,
    },
    pressed: {
      opacity: 0.7,
      transform: [{ scale: 0.98 }],
    },
  });
};

export default function TabTwoScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = createStyles(isDark);
  const colors = isDark ? MinimalistColors.dark : MinimalistColors.light;

  const difficulties = [
    {
      name: "Easy",
      stars: 1,
      cardStyle: styles.difficultyCardEasy,
      textStyle: styles.difficultyTextEasy,
      color: colors.difficultyEasy,
    },
    {
      name: "Medium",
      stars: 2,
      cardStyle: styles.difficultyCardMedium,
      textStyle: styles.difficultyTextMedium,
      color: colors.difficultyMedium,
    },
    {
      name: "Hard",
      stars: 3,
      cardStyle: styles.difficultyCardHard,
      textStyle: styles.difficultyTextHard,
      color: colors.difficultyHard,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.contentCard}>
        <Text style={styles.title}>Choose Level</Text>
        <View style={styles.difficultyContainer}>
          {difficulties.map((difficulty) => (
            <Pressable
              key={difficulty.name}
              style={({ pressed }) => [
                styles.difficultyCard,
                difficulty.cardStyle,
                pressed && styles.pressed,
              ]}
              onPress={() =>
                router.push({
                  pathname: "/sudoku-board",
                  params: { difficulty: difficulty.name },
                })
              }
            >
              <View style={styles.difficultyContent}>
                <View style={styles.starsContainer}>
                  {[1, 2, 3].map((star) => (
                    <MaterialIcons
                      key={star}
                      name={star <= difficulty.stars ? "star" : "star-border"}
                      size={24}
                      color={difficulty.color}
                    />
                  ))}
                </View>
                <Text style={[styles.difficultyText, difficulty.textStyle]}>
                  {difficulty.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
