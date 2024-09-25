import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.black,
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
  },
});
