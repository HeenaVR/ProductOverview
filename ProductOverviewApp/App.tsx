import { SafeAreaView, StyleSheet, Platform, StatusBar as RNStatusBar } from "react-native";
import { StatusBar } from "expo-status-bar";
import ProductOverviewScreen from "./src/screens/ProductOverviewScreen";
import { COLORS } from "./src/constants/colors";

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
    backgroundColor: COLORS.appBackgroundColor,
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0, // Add padding for Android status bar
  },
});

export default App;
