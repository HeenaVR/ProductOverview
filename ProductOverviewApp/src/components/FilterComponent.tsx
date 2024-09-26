import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS } from "../constants/colors";
import Slider from "@react-native-community/slider";
import { buttonStyles } from "../styles/buttonStyles";

interface FilterComponentProps {
  availableColors: string[];
  selectedColor: string | null;
  selectedPrice: number;
  onApplyFilters: (filters: { price: number; color: string | null }) => void;
  onResetFilters: () => void;
  onClose: () => void;
  onPriceChange: (price: number) => void;
  onColorChange: (color: string | null) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  availableColors,
  selectedColor,
  selectedPrice,
  onApplyFilters,
  onResetFilters,
  onClose,
  onPriceChange,
  onColorChange,
}) => {
  const [localSelectedPrice, setLocalSelectedPrice] = useState(selectedPrice);
  const [localSelectedColor, setLocalSelectedColor] = useState(selectedColor);

  const handleColorSelect = (color: string | null) => {
    setLocalSelectedColor(color);
    onColorChange(color);
  };

  const handlePriceChange = (value: number) => {
    setLocalSelectedPrice(value);
    onPriceChange(value);
  };

  const applyFilters = () => {
    onApplyFilters({
      price: localSelectedPrice,
      color: localSelectedColor,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apply Filters</Text>

      <Text>Max Price: {localSelectedPrice.toFixed(2)} €</Text>
      <Slider
        minimumValue={0}
        maximumValue={250}
        value={localSelectedPrice}
        step={1}
        onValueChange={setLocalSelectedPrice}
        onSlidingComplete={handlePriceChange}
        minimumTrackTintColor={COLORS.black}
        maximumTrackTintColor={COLORS.lightGray}
        thumbTintColor={COLORS.black}
        testID="price-slider"
      />

      <Text>Color:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.colorContainer}>
          {availableColors.map((color) => {
            const isSelected = localSelectedColor === color;
            return (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorCircleOuter,
                  { borderColor: isSelected ? COLORS.black : COLORS.lightGray },
                ]}
                onPress={() => handleColorSelect(color)}
                testID={`color-circle-${color}`}
              >
                <View
                  style={[styles.colorCircleInner, { backgroundColor: color }]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity style={buttonStyles.button} onPress={applyFilters}>
        <Text style={buttonStyles.buttonText}>Apply Filters</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={buttonStyles.button}
        onPress={() => {
          onResetFilters();
          onClose();
        }}
      >
        <Text style={buttonStyles.buttonText}>Reset Filters</Text>
      </TouchableOpacity>

      <TouchableOpacity style={buttonStyles.button} onPress={onClose}>
        <Text style={buttonStyles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.appBackgroundColor,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  colorContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  colorCircleOuter: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
  },
  colorCircleInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});

export default FilterComponent;
