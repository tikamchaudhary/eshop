import React, { Fragment, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { Pagination, Rating, Slider, Typography } from '@mui/material';
import "./Products.css";
import { getAllProducts } from "../../redux/thunks/productThunk";
import { STATUS } from "../../redux/slices/productSlice";
import Loader from "../layout/loader/Loader";
import ProductCart from '../home/ProductCart';

const categories = ["Mobiles", "Laptops", "Watches", "Clothes", "Footwear", "Grocery"];


const Products = () => {
    document.title = "Eshop -- Products"

    const { name } = useParams();
    const dispatch = useDispatch();
    const { data, status, error } = useSelector((state) => state.products);
    const { products, filteredProductsCount, resultPerPage } = data;


    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 100000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const pageCounts = (filteredProductsCount % resultPerPage === 0) ?
        (Math.floor(filteredProductsCount / resultPerPage)) :
        (Math.floor(filteredProductsCount / resultPerPage)) + 1;
    const paginationOptions = {
        color: "warning",
        variant: "outlined",
        shape: "rounded",
        size: "large",
        showFirstButton: true,
        showLastButton: true,
        page: currentPage,
        count: pageCounts,
        onChange: (event, newPage) => { setCurrentPage(newPage) }
    }

    const sliderOptions = {
        min: 1,
        max: 100000,
        value: price,
        valueLabelDisplay: "auto",
        getAriaLabel: () => 'Price range',
        getAriaValueText: (price) => { return price },
        onChange: (event, newPrice) => { setPrice(newPrice) },
    }


    const ratingOptions = {
        name: "ratingsFilter",
        precision: 0.5,
        size: "large",
        value: ratings,
        onChange: (event, newRating) => { setRatings(newRating) },
    };

    // const filterOptions = { name, currentPage, price, category, ratings };
    useEffect(() => {
        dispatch(getAllProducts({ name, currentPage, price, category, ratings }))
    }, [dispatch, name, currentPage, price, category, ratings])


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
    if (status === STATUS.FAILED) {
        toast(error);
        return <ToastContainer {...toastOptions} />;
    }
    if (status === STATUS.LOADING) {
        return <Loader />;
    }

    return (<Fragment>
        <h2 className="productsHeading">Products</h2>

        <section className='mainContainer'>
            <div className="productsContainer">

                {
                    products && products.map((product) => (
                        <ProductCart key={product._id} product={product} />
                    ))
                }
            </div>

            <div className="filterContainer">
                <Typography>Price</Typography>
                <Slider {...sliderOptions} />
                <Typography>Categories</Typography>
                <ul className="categoriesContainer">
                    {categories.map((category, i) => (
                        <li className='categoryLink' key={i} onClick={() => setCategory(category)}>{category}
                        </li>
                    ))}
                </ul>
                <Rating {...ratingOptions} />
            </div>
        </section>
        <div className="paginationContainer">
            {
                resultPerPage < filteredProductsCount && <Pagination {...paginationOptions} />
            }
        </div>
    </Fragment>);
}

export default Products;