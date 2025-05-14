## Frontend Setup (Vite + React)

This project uses [Vite](https://vitejs.dev/) and [React](https://reactjs.org/) to build a fast and modern frontend interface.

---

### Prerequisites

Make sure you have **Node.js** and **npm** installed.

Check if they are installed by running:

```bash
node -v
npm -v
```

If not installed, download and install Node.js from:
👉 https://nodejs.org (LTS version recommended)


### Step 1: Navigate to your frontend folder:

```bash
cd frontend
```

### Step 2: Create a new Vite project in the current directory:

```bash
npm create vite@latest .
```

When prompted:
- Select: React
- Select: JavaScript

### Step 3: Install project dependencies:

```bash
npm install
```

### Step 4: Start the development server:

```bash
npm run dev
```

### Step 5: Declare State in React

Now in your React component, let’s start by declaring state to store the list of products.

Add the following inside your component:

```jsx
import { useState } from 'react';

const [product, setProduct] = useState([]);
```
---
---


## 💻 React Frontend: CRUD Products

Now let's build the React frontend that connects to our Django API and displays the inventory list.

---

### Step 1: Declare State with `useState`

In your component, declare a state variable to store the list of products:

```jsx
const [product, setProduct] = useState([]);
```

- `product` stores the array of products.
- `setProduct` is used to update the product state when we fetch data.

Make sure to import it at the top:

```jsx
import { useState } from "react";
```

### Step 2: Fetch Products Using useEffect

Use the `useEffect` hook to call the backend API when the page loads:

```jsx
useEffect(() => {
  fetchProduct();
}, []);
```

This ensures the fetch runs once when the component is mounted.
Don’t forget to import it:

```jsx
import { useEffect } from "react";
```

### Step 3: Define the Fetch Function

Create an async function to call the Django API and update the state:

```jsx
const fetchProduct = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/product/");
    const data = await response.json();
    setProduct(data); // update the product state
  } catch (err) {
    console.log(err);
  }
};
```

### Step 4: Display the Product Data

Render the list of products by mapping through the `product` array:

```jsx
{product.map((products, index) => (
  <div key={index}>
    <p>Product Name: {products.productName}</p>
    <p>Product Quantity: {products.productQuantity}</p>
  </div>
))}
```

Use key={index} to prevent React warnings when rendering lists.
You can use products.id instead if your API returns IDs.

### Step 5: Add Product (POST Request to Django API)

Now let’s add the functionality to create a new product from the frontend and send it to the Django API.
---
#### Step 5.1: Declare Two More State Variables

Inside your component, add state for the product name and quantity inputs:

```jsx
const [productName, setProductName] = useState("");
const [productQuantity, setProductQuantity] = useState(0)
```

This allows you to capture the values typed into the form fields.

#### Step 5.2: Create the addProduct Function

Define a function that sends a POST request to your API:

```jsx
const addProduct = async () => {
  const productData = {
    productName: productName,
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
    setProduct((prev) => [...prev, data]); // update product list with the new entry
  } catch (err) {
    console.log(err);
  }
};
```

#### Step 5.3: Update Input Fields and Button
Bind the input values and attach the `addProduct` function to the button:

```jsx
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
```
These fields capture user input and store them in the state.
When the button is clicked, it triggers `addProduct()` which sends data to the backend.

Once submitted, the new product will be added to the list immediately.

### Step 6: Update Product Quantity (PUT Request to Django API)

Let’s now add the ability to update a product’s quantity.

#### Step 6.1: Declare New State for Updated Quantity

At the top of your component (alongside your other useState declarations), add:

```jsx
const [newQuantity, setNewQuantity] = useState(0);
```

This will store the quantity entered in the "Update Quantity" input field.

#### Step 6.2: Create the updateProduct Function

Add the following function to perform a PUT request to your Django API:

```jsx
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
```

This function sends the updated quantity to your Django backend using the product’s primary key (id).

####  Step 6.3: Add Update Input and Button in the JSX

Inside your `.map()` loop where each product is displayed, add an input field and a button to allow updates:

```jsx
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
```
### Step 7: Delete a Product (DELETE Request to Django API)

Now let’s add the functionality to delete a product from the inventory using the Django API.


#### 🔧 Step 7.1: Create the deleteProduct Function

Add the following function inside your React component:

```jsx
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
```

- This function sends a DELETE request to the backend using the product’s primary key.
- Then it updates the UI by filtering out the deleted product from the state.

#### Step 7.2: Add Delete Button in JSX

Inside your `.map()` loop where each product is rendered, add the following:

```jsx
<button onClick={() => deleteProduct(products.id)}>Delete</button>
```

When the "Delete" button is clicked:
- It calls deleteProduct() with the product ID
- The product is deleted from the backend and removed from the UI without refreshing

---

🎉 You now have full CRUD functionality in your Inventory Management System:

- Create → Add Product

- Read → Fetch Product List

- Update → Edit Product Quantity

- Delete → Remove Product











