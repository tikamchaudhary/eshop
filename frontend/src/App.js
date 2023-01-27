import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import Home from "./components/home/Home";
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/Products.js';
import LoginSignUp from "./components/user/LoginSignUp.js";
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import ProtectedRoute2 from './components/protectedRoute/ProtectedRoute2';
import Profile from "./components/user/Profile.js";
import { useSelector } from 'react-redux';
import UpdateProfile from "./components/user/UpdateProfile.js";
import UpdatePassword from "./components/user/UpdatePassword.js";
import ForgotPassword from "./components/user/ForgotPassword.js";
import ResetPassword from "./components/user/ResetPassword.js";
import NotFound from './components/layout/not_found/NotFound';
import About from './components/layout/about/About';
import Contact from './components/layout/contact/Contact';


function App() {
  const { data, isAuthenticated } = useSelector((state) => state.user);
  const { user } = data;
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

          <Route path='/user' element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path='profile' element={<Profile />} />
            <Route path='profile/update' element={<UpdateProfile user={user} />} />
            <Route path='password/update' element={<UpdatePassword />} />
          </Route>

          <Route element={<ProtectedRoute2 isAuthenticated={isAuthenticated} />}>
            <Route path='/password/forgot' element={<ForgotPassword />} />
            <Route path='/password/reset/:token' element={<ResetPassword />} />
          </Route>

          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
