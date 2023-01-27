import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./Home.css";

import MetaData from '../layout/MetaData';
import { useSelector } from "react-redux";
import ProductCart from './ProductCart';
import Loader from '../layout/loader/Loader';
import { STATUS } from '../../redux/slices/productSlice';


const Home = () => {
    // document.title = "Eshop"

    const { data, status, error } = useSelector((state) => state.products);
    const products = data.products;

    const toastOptions = {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    }

    if (status === STATUS.LOADING) {
        return <Loader />;
    }
    if (status === STATUS.FAILED) {
        toast(error);
        return <ToastContainer {...toastOptions} />;
    }

    return (<>
        <MetaData title="Eshop" />
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner banner">
                <div className="carousel-item active">
                    <img src="https://res.cloudinary.com/dcj1ykq51/image/upload/v1674844875/Eshop/assets/banner1_ckejgo.jpg"
                        className="d-block w-100" alt="banner1"
                    />
                </div>
                <div className="carousel-item">
                    <img src="https://res.cloudinary.com/dcj1ykq51/image/upload/v1674844875/Eshop/assets/banner2_jhw7rt.jpg"
                        className="d-block w-100" alt="banner2"
                    />
                </div>
                <div className="carousel-item">
                    <img src="https://res.cloudinary.com/dcj1ykq51/image/upload/v1674844875/Eshop/assets/banner3_g6lgt7.jpg"
                        className="d-block w-100" alt="banner3" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>

        <h2 className='homeHeading'>Featured Products</h2>
        <div className="container" id="container">
            {
                products && products.map((product) => (
                    <ProductCart key={product._id} product={product} />
                ))}
        </div>

    </>)
}

export default Home;