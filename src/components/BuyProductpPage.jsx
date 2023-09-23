import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Use React Router to get product ID from the URL params
import { buyProduct, getProduct } from "../services/blockchain";

const BuyProductPage = () => {
  const { productId } = useParams(); // Get the product ID from URL params
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // You can use this for quantity if needed

  useEffect(() => {
    // Fetch product details when the component mounts
    async function fetchProduct() {
      try {
        const productDetails = await getProduct(productId);
        setProduct(productDetails);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [productId]);

  const handleBuyProduct = async () => {
    try {
      // Call the buyProduct function with productId and quantity
      await buyProduct(productId, quantity);
      // Handle success, show a confirmation message, or navigate to another page
      console.log("Product purchased successfully");
    } catch (error) {
      // Handle any errors or display an error message to the user
      console.error("Error purchasing product:", error);
    }
  };

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <p>Price: {product.price} ETH</p>
          {/* Add more product details here */}
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button onClick={handleBuyProduct}>Buy</button>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default BuyProductPage;
