import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [product, setProduct] = useState([]);
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);

  const [newQuantity, setNewQuantity] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, []);

  // Function for Read
  const fetchProduct = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/product/");
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  // function for Create
  const addProduct = async () => {
    const productData = {
      productName,
      productQuantity: productQuantity,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/product/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      setProduct((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  };

  // Function for Update
  const updateProduct = async (pk, productName) => {
    const productData = {
      productName: productName,
      productQuantity: newQuantity,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/product/${pk}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      setProduct((prev) =>
        prev.map((product) => {
          if (product.id === pk) {
            return data;
          } else {
            return product;
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  // Function for Delete
  const deleteProduct = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/product/${pk}`, {
        method: "DELETE",
      });
      setProduct((prev) => prev.filter((product) => product.id !== pk));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Inventory Management System</h1>

      <div>
        <input
          type="text"
          placeholder="Product Name"
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Quantity"
          onChange={(e) => setProductQuantity(e.target.value)}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
      {product.map((products) => (
        <div>
          <p>Product Name: {products.productName}</p>
          <p>Product Qunatity: {products.productQuantity}</p>
          <input
            type="number"
            placeholder="Update Quantity"
            onChange={(e) => setNewQuantity(e.target.value)}
          />
          <button
            onClick={() => updateProduct(products.id, products.productName)}
          >
            Update
          </button>
          <button onClick={() => deleteProduct(products.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default App;
