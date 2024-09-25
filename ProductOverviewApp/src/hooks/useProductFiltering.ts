import { useState, useEffect, useCallback, useMemo } from "react";
import { Product } from "../types/productTypes";

export const useProductFiltering = (products: Product[]) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<number>(250);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Memoize the filtered results for better performance
  const searchFilteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter((item) =>
      item.detail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  const colorFilteredProducts = useMemo(() => {
    if (!selectedColor) return searchFilteredProducts;
    return searchFilteredProducts.filter((item) =>
      item.colorVariants.some(
        (variant: Product["colorVariants"][0]) =>
          variant.color.value === selectedColor
      )
    );
  }, [selectedColor, searchFilteredProducts]);

  const priceFilteredProducts = useMemo(() => {
    return colorFilteredProducts.filter((item) => item.price <= selectedPrice);
  }, [selectedPrice, colorFilteredProducts]);

  // Unified function to apply both search and filters
  const applySearchAndFilters = useCallback(() => {
    setFilteredProducts(priceFilteredProducts);
  }, [priceFilteredProducts]);

  // Re-apply filters whenever search query, color, or price changes
  useEffect(() => {
    applySearchAndFilters();
  }, [applySearchAndFilters]);

  return {
    filteredProducts,
    searchQuery,
    selectedPrice,
    selectedColor,
    setSearchQuery,
    setSelectedPrice,
    setSelectedColor,
  };
};
