import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { COLORS } from "../constants/colors";
import { buttonStyles } from "../styles/buttonStyles";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFilterPress: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  onFilterPress,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity
        style={[buttonStyles.button, styles.customButtonStyle]}
        onPress={onFilterPress}
      >
        <Text style={buttonStyles.buttonText}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
    borderRadius: 5,
  },
  customButtonStyle: {
    padding: 8,
    marginTop: 0,
  },
});

export default SearchBar;
