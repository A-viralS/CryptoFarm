import React, { useEffect, useState } from "react";
import { buyProduct } from "../services/blockchain";
import data from "./data.json"; // Import the JSON data directly

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Use the imported JSON data directly
    setProducts(data.products);
  }, []);
  console.log("Products:", products); // Log the products data
  const handlePurchase = async (productId) => {
    try {
      await buyProduct(productId);
      // You can implement further logic here, such as updating the UI after a successful purchase.
      console.log("Product purchased successfully.");
    } catch (error) {
      console.error("Error purchasing product:", error);
    }
  };

  return (
    <div>
      <h2>Available Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span>Price: {product.price} ETH</span>
            <button onClick={() => handlePurchase(product.id)}>Buy</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListPage;
