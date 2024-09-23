import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import ProductOverviewScreen from "./src/screens/ProductOverviewScreen";

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ProductOverviewScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
