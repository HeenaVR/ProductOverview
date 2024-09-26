import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Modal,
  Text,
} from "react-native";
import ProductCard, { ProductCardProps } from "../components/ProductCard";
import { COLORS } from "../constants/colors";
import FilterComponent from "../components/FilterComponent";
import SearchBar from "../components/SearchBar";
import { useProductActions } from "../hooks/useProductActions";
import { fetchProducts } from "../services/api";
import { useProductFiltering } from "../hooks/useProductFiltering";

const ProductOverviewScreen: React.FC = () => {
  const [productData, setProductData] = useState<ProductCardProps[]>([]); // Original data
  const [loading, setLoading] = useState<boolean>(true);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [availableColors, setAvailableColors] = useState<string[]>([]); // for dynamic colors

  const { handleUpdateWishlist, handleUpdateCart } = useProductActions();

  // Fetch product data using the service
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProductData(data);
        extractUniqueColors(data); // Extract unique colors from the fetched data
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Extract unique colors from the product data
  const extractUniqueColors = (products: ProductCardProps[]) => {
    const colorSet = new Set<string>();

    products.forEach((product) => {
      product.colorVariants.forEach((variant) => {
        colorSet.add(variant.color.value);
      });
    });

    setAvailableColors(Array.from(colorSet));
  };

  // `useProductFiltering` hook for filtering logic
  const {
    filteredProducts,
    searchQuery,
    selectedPrice,
    selectedColor,
    setSearchQuery,
    setSelectedPrice,
    setSelectedColor,
  } = useProductFiltering(productData);

  // Handle applying filters
  const applyFilters = () => {
    setIsFilterModalVisible(false);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedColor(null);
    setSelectedPrice(250); // Reset price to default
    setSearchQuery(""); // Reset search
  };

  if (loading) {
    return <ActivityIndicator size="small" color={COLORS.black} />;
  }

  return (
    <View style={styles.mainContainer}>
      {/* Search Input */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onFilterPress={() => setIsFilterModalVisible(true)}
      />

      {/* Filter Modal */}
      <Modal
        visible={isFilterModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FilterComponent
              availableColors={availableColors}
              selectedColor={selectedColor}
              selectedPrice={selectedPrice}
              onApplyFilters={applyFilters}
              onResetFilters={resetFilters}
              onClose={() => setIsFilterModalVisible(false)}
              onPriceChange={setSelectedPrice}
              onColorChange={setSelectedColor}
            />
          </View>
        </View>
      </Modal>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Products 🙁</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 10,
    paddingBottom: 30,
    marginBottom: 30,
    marginHorizontal: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.appBackgroundColor,
  },
  modalContent: {
    width: "95%",
    padding: 20,
    backgroundColor: COLORS.appBackgroundColor,
    borderRadius: 10,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.black,
  },
});

export default ProductOverviewScreen;
