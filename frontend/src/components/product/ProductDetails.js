import React, { useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ProductDetails.css";
import { getProductDetails } from "../../redux/thunks/productThunk";
import { STATUS } from "../../redux/slices/productSlice";
import Loader from "../layout/loader/Loader";
import MetaData from "../layout/MetaData";
import ReviewCard from "./ReviewCard.js";
import Rating from "@mui/material/Rating";

const ProductDetails = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, status, error } = useSelector((state) => state.productDetails);
  const product = data.product;

  const sendUrl = (smallImageUrl) => {
    let mainImage = document.getElementById("mainImage")
    mainImage.src = smallImageUrl;
  }

  const ratingOptions = {
    size: "large",
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  };

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



  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  if (status === STATUS.FAILED) {
    toast(error);
    return <ToastContainer {...toastOptions} />;
  }
  if (status === STATUS.LOADING || !product) {
    return <Loader />;
  }

  return (<>
    <MetaData title={`Eshop -- ${product.name}`} />
    <div className="ProductDetails">
      <div className="imageBox">
        <div className="smallImage">
          {product.images && product.images.map((image, i) => (
            <img src={image.url} alt={image.name} onMouseOver={() => sendUrl(image.url)} key={i} />
          ))}
        </div>
        <div className="mainImage">
          <img src={product.images[0].url} alt={product.images[0].name} id="mainImage" />
        </div>
      </div>

      <div className="taxtBox">
        <div className="taxtBox-1">
          <h2>{product.name}</h2>
          <p>Product # {product._id}</p>
        </div>
        <div className="taxtBox-2">
          <Rating {...ratingOptions} />
          <span>
            ({product.numOfReviews} Reviews)
          </span>
        </div>
        <div className="taxtBox-3">
          <h3>{`₹ ${product.price}`}</h3>
        </div>
        <div className="taxtBox-4">
          <div className="taxtBox-4-1">
            <button>-</button>
            <input readOnly type="number" value={1} />
            <button>+</button>
          </div>
          <div className="taxtBox-4-2">
            <button>Buy Now</button>
            <button>Add to Cart</button>
          </div>
        </div>
        <div className="textBox-5">
          <p className="mb-0"><b>Status:</b>
            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
              {product.Stock < 1 ? " OutOfStock" : " InStock"}
            </b>
          </p>
        </div>
        <div className="textBox-6">
          <p className="mb-0"><b>Description: </b>{product.description}</p>
        </div>
        <div className="textBox-7">
          <button>Submit Review</button>
        </div>
      </div>
    </div>

    <h2 className="reviewsHeading">Reviews</h2>
    {product.reviews && product.reviews[0] ?
      <div className="reviewsContainer">
        {product.reviews && product.reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
      : <p className="noReviews">No Reviews Yet</p>}
  </>);
};

export default ProductDetails; 