import { DragDropContentView } from "expo-drag-drop-content-view";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { IDragDropContentView } from "./IDragDropContentView";

export default function App() {
  return (
    <View style={styles.container}>
      <IDragDropContentView
        style={{ width: 200, height: 200, borderRadius: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
