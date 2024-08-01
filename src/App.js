import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Products from "./components/products/table/Products";
import ProductDetail from "./components/products/details/ProductDetail";
import CreateProduct from "./components/products/create/CreateProduct";
import Users from "./components/users/Users";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";

import { getProducts } from "./services/productService";

import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/styles/global.scss";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/products" element={<Products products={products} />} />
        <Route
          path="/products/:id"
          element={
            <ProductDetail products={products} setProducts={setProducts} />
          }
        />
        <Route
          path="/products/create"
          element={
            <CreateProduct
              products={products}
              onProductAdded={handleProductAdded}
            />
          }
        />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
