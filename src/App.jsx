import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Navigation from "./components/Navigation.jsx";
import ProductCard from "./components/ProductCard.jsx";
import Footer from "./components/Footer.jsx";
import AdminPanel from "./components/AdminPanel/AdminPanel.jsx";
import "./components/AdminPanel/AdminPanel.css";
import Checkout from "./components/Checkout/Checkout.jsx";
import Cart from "./components/Cart/Cart.jsx";

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          "https://hakims-livs-be.vercel.app/api/intro/product"
        );
        const productData = await response.json();
        setProducts(productData);
        console.log(productData);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProductData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://hakims-livs-be.vercel.app/api/intro/category"
        );
        const fetchedCategories = await response.json();
        setCategories(fetchedCategories);
        console.log(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isAdminLoggedIn={isAdminLoggedIn}
              products={products}
              categories={categories}
            />
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart products={products} />} />
      </Routes>
    </BrowserRouter>
  );
};

const HomePage = ({ isAdminLoggedIn, products, categories }) => {
  return isAdminLoggedIn ? (
    <AdminPanel products={products} categories={categories} />
  ) : (
    <>
      <Header />
      <Hero />
      <aside className="aside">
        <nav>
          <Navigation categories={categories} />
        </nav>
      </aside>
      <main className="main">
        <div className="product-wrapper">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              products={products}
              categories={categories}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
