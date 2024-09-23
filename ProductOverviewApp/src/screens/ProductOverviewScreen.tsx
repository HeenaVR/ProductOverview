import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ProductCard from "../components/ProductCard";
import productData from "../data/products.json";

const ProductOverviewScreen: React.FC = () => {
  const handleAddToBag = (productId: number) => {
    //FIXME: Logic to add the product to the bag
    console.log(productId);
  };

  const handleAddToWishlist = (productId: number) => {
    //FIXME: Logic to add the product to the wishlist
    console.log(productId);
  };

  const isInWishlist = (productId: number) => {
    //FIXME: Logic to check if product is in wishlist
    console.log(productId);
    return false;
  };

  const isInBag = (productId: number) => {
    //FIXME: Logic to check if product is in bag
    console.log(productId);
    return false;
  };
  return (
    <FlatList
      data={productData.articles}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2} // Two columns for grid layout
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <ProductCard
            detail={item.detail}
            price={item.price}
            colorVariants={item.colorVariants}
            onAddToBag={() => handleAddToBag(item.id)} // handling bag action
            onAddToWishlist={() => handleAddToWishlist(item.id)} // handling wishlist action
            isInWishlist={isInWishlist(item.id)} // Check if the item is in the wishlist
            isInBag={isInBag(item.id)} // Check if the item is in the bag
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    padding: 5, // around the grid
  },
});

export default ProductOverviewScreen;
