export const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:3001/articles");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error; // throw error in component
  }
};
