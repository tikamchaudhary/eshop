import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import Home from "./components/home/Home";
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/Products.js';
import LoginSignUp from "./components/user/LoginSignUp.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:name" element={<Products />} />
          <Route path="/login" element={<LoginSignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
