import React, { useState, useEffect } from "react";
import axios from "axios";
import { color } from "@chakra-ui/react";

const ProductList = () => {
  const [users, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DATABASE_API_URL}/products`,
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_DATABASE_API_URL}/users/${productId}`,
      );
      alert("Product deleted successfully");
      fetchProducts(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const renderProducts = () => {
    return users.map((user) => (
      <div>
        <a>{user.prodID}</a>

        <a>{user.prodName}</a>
        <a>{user.prodType}</a>
        <a>{user.prodPrice}</a>

        {user.prodImg && (
          <img
            src={user.prodImg}
            alt="Product"
            style={{ width: "100px", height: "auto", marginLeft: "10px" }}
          />
        )}
      </div>
    ));
  };

  return (
    <div>
      <h2>Product List</h2>
      <table>
        <tbody>{renderProducts()}</tbody>
      </table>
    </div>
  );
};

export default ProductList;
