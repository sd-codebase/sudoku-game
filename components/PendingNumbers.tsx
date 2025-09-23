import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PendingNumbersProps {
  pending: Record<number, number>;
  selected: { i: number; j: number } | null;
  onSelect: (n: number) => void;
}

export default function PendingNumbers({
  pending,
  selected,
  onSelect,
}: PendingNumbersProps) {
  return (
    <View style={styles.pendingListHorizontal}>
      {Object.entries(pending).map(([num, count]) => (
        <TouchableOpacity
          key={num}
          style={[
            styles.pendingItemColumn,
            selected ? styles.pendingItemActive : null,
          ]}
          disabled={!selected || count === 0}
          onPress={() => onSelect(Number(num))}
        >
          <View style={styles.pendingItemInnerColumn}>
            <Text style={styles.pendingNum}>{num}</Text>
            <Text style={styles.pendingCountSmall}>{count}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  pendingListHorizontal: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 12,
  },
  pendingItemColumn: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#eaf6ff",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#1565c0",
    minWidth: 32,
    justifyContent: "center",
  },
  pendingItemInnerColumn: {
    flexDirection: "column",
    alignItems: "center",
  },
  pendingItemActive: {
    backgroundColor: "#bbdefb",
  },
  pendingNum: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1565c0",
    marginRight: 2,
  },
  pendingCountSmall: {
    fontSize: 8,
    color: "#333",
    marginLeft: 2,
  },
});
