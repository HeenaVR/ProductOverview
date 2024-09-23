import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import ProductCard, { ProductCardProps } from "../components/ProductCard";
import { COLORS } from "../constants/colors";

// ProductCardProps by omitting action handlers & state booleans
type Product = Omit<ProductCardProps, "onUpdateCart" | "onUpdateWishlist">;

const ProductOverviewScreen: React.FC = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  // Fetch data from JSON server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/articles");
        const data = await response.json();
        setProductData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to generate unique key for productId and color variant index
  const generateUniqueKey = (productId: string, colorIndex: number) => {
    return `${productId}-${colorIndex}`;
  };

  const handleUpdateWishlist = (
    productId: string,
    colorIndex: number,
    inWishlist: boolean
  ) => {
    const uniqueKey = generateUniqueKey(productId, colorIndex);
    if (inWishlist) {
      setWishlist([...wishlist, uniqueKey]); // Add to wishlist
    } else {
      setWishlist(wishlist.filter((key) => key !== uniqueKey)); // Remove from wishlist
    }
  };

  const handleUpdateCart = (
    productId: string,
    colorIndex: number,
    inCart: boolean
  ) => {
    const uniqueKey = generateUniqueKey(productId, colorIndex);
    if (inCart) {
      setCart([...cart, uniqueKey]); // Add to cart
    } else {
      setCart(cart.filter((key) => key !== uniqueKey)); // Remove from cart
    }
  };

  if (loading) {
    return <ActivityIndicator size="small" color={COLORS.black} />;
  }

  return (
    <FlatList
      data={productData}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <ProductCard
            id={item.id}
            detail={item.detail}
            price={item.price}
            colorVariants={item.colorVariants}
            onUpdateCart={(colorIndex, inCart) =>
              handleUpdateCart(item.id, colorIndex, inCart)
            }
            onUpdateWishlist={(colorIndex, inWishlist) =>
              handleUpdateWishlist(item.id, colorIndex, inWishlist)
            }
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
    padding: 5,
  },
});

export default ProductOverviewScreen;
