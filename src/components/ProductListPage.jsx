import React, { useEffect, useState } from "react";
import { buyProduct } from "../services/blockchain";
import data from "./data.json"; // Import the JSON data directly
import Cards from "./ShopCards";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Use the imported JSON data directly
    setProducts(data.products);
  }, []);
  // console.log("Products:", products); // Log the products data

  const handlePurchase = async (productId) => {
    try {
      // Check if MetaMask is installed and connected
      if (!ethereum || !ethereum.request) {
        throw new Error("Please install and connect MetaMask");
      }
      console.log(
        "Entering the handlepurchase in list page# Buying product with ID:",
        productId
      );
      // Call the buyProduct function if MetaMask is available
      await buyProduct(productId);

      console.log("Product purchased successfully.");
    } catch (error) {
      console.error("Error purchasing product:", error.message);
      // You can display an error message to the user here
    }
  };

  return (
    <div className=" overflow-hidden">
      <h2 className="text-2xl my-5 text-center  ">Your Shopping Cart</h2>
      {/* <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span>Price: {product.price} ETH</span>
            <button
              onClick={() => handlePurchase(product.id)}
              className="bg-transparent hover:bg-green-500 text-green-700 font-semibold ml-3 mt-2 hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
            >
              Buy
            </button>
            {/* <Cards/> */}
          {/* </li> */}
        {/* ))} */}
      {/* </ul> */} 

      <div className="  grid grid-cols-3 gap-x-3 max-w-5xl mt-[3rem] items-center justify-center mx-auto space-y-7">
      {products.map((product) => {
        return (
          <Cards
            key={product.id}
            image={product.image}
            title={product.name}
            // rating={product.rating}
            price={product.price}
            // about={product.about}
            // onPurchase={() => handlePurchase(product.id)} // not working for now
            productId={product.id}
            handlePurchase = {handlePurchase}
          />
        );
      })}
      </div>


    </div>
  );
};

export default ProductListPage;
