import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Image as ExpoImage } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants/colors";

const { width } = Dimensions.get("window");
const cardWidth = (width - 30) / 2; // width for 2 columns with margin

export interface ProductCardProps {
  id: string;
  detail: string;
  price: number;
  colorVariants: Array<{
    shoppingCart: boolean;
    wishList: boolean;
    color: { value: string };
    pictures: { front: string; back: string; flat: string; outfit: string };
  }>;
  onUpdateCart: (colorIndex: number, inCart: boolean) => void;
  onUpdateWishlist: (colorIndex: number, inWishlist: boolean) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  detail,
  price,
  colorVariants,
  onUpdateCart,
  onUpdateWishlist,
}) => {
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const activeColor = colorVariants[activeColorIndex];

  // wishlist and cart toggle by updating the respective field directly in colorVariants
  const toggleField = (field: "wishList" | "shoppingCart") => {
    const updatedVariants = [...colorVariants];
    updatedVariants[activeColorIndex][field] =
      !updatedVariants[activeColorIndex][field]; // Toggle status
    if (field === "wishList") {
      onUpdateWishlist(
        activeColorIndex,
        updatedVariants[activeColorIndex].wishList
      );
    } else {
      onUpdateCart(
        activeColorIndex,
        updatedVariants[activeColorIndex].shoppingCart
      );
    }
  };

  return (
    <View style={styles.cardContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageCarousel}
        contentContainerStyle={styles.carouselContainer}
      >
        {Object.values(activeColor.pictures).map((imageUrl, index) => (
          <ExpoImage
            key={index}
            source={{ uri: imageUrl }}
            style={styles.image}
            contentFit="cover"
            cachePolicy="memory-disk"
          />
        ))}
      </ScrollView>

      <Text style={styles.name} numberOfLines={2}>
        {detail}
      </Text>
      <Text style={styles.price}>{price.toFixed(2)} €</Text>

      <View style={styles.colorContainer}>
        {colorVariants.map((variant, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorCircleOuter,
              {
                borderColor:
                  index === activeColorIndex ? COLORS.black : COLORS.lightGray,
              },
            ]}
            onPress={() => setActiveColorIndex(index)} // Switch color variant
          >
            <View
              style={[
                styles.colorCircleInner,
                { backgroundColor: variant.color.value },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => toggleField("wishList")} // toggle wishlist
          style={[styles.iconButton, styles.shadow]}
        >
          <Ionicons
            name={activeColor.wishList ? "heart" : "heart-outline"}
            size={18}
            color={COLORS.red}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleField("shoppingCart")} // toggle cart
          style={[styles.iconButton, styles.shadow]}
        >
          <Ionicons
            name={activeColor.shoppingCart ? "bag" : "bag-outline"}
            size={18}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.appBackgroundColor,
    marginBottom: 10,
    width: cardWidth, // width for 2-column layout
    position: "relative",
  },
  imageCarousel: {
    height: 300,
  },
  carouselContainer: {
    flexDirection: "row", // images scroll horizontally
  },
  image: {
    height: 300,
    width: cardWidth,
    borderRadius: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "300",
    marginVertical: 8,
  },
  price: {
    fontSize: 16,
    marginBottom: 8,
  },
  colorContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  // Outer color circle with conditional border
  colorCircleOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
  },
  // Inner color circle for actual color
  colorCircleInner: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  iconContainer: {
    flexDirection: "column",
    position: "absolute",
    top: 4,
    right: 6,
  },
  iconButton: {
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 14,
    marginVertical: 5,
    width: 28,
    height: 28,
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
});

export default ProductCard;
