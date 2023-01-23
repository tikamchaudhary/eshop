import React from "react";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import "./ProductCart.css";

const ProductCart = ({ product }) => {


    const ratingOptions = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
        size: "small"
    };
    return (
        <Link className="productCart" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product._id} />
            <p>{product.name}</p>
            <div>
                <Rating {...ratingOptions} />
                <span className="productCartSpan">
                    {" "}
                    ({product.numOfReviews} Reviews)
                </span>
            </div>
            <span>{`₹ ${product.price}`}</span>
        </Link>
    );
};

export default ProductCart;
