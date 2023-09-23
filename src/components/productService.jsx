// productService.js
import axios from "axios";

// Function to fetch products from data.json
const fetchData = async () => {
  try {
    const response = await axios.get("./data.json");
    console.log("Fetched data:", response.data);
    setProducts(response.data.products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export { fetchProducts };
