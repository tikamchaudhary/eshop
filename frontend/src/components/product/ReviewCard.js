import React from "react";
import { Rating } from "@mui/material";


const ReviewCard = ({ review }) => {
    const ratingOptions = {
        size: "large",
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };
    return (
        <div className="reviewCart">
            <img src="https://res.cloudinary.com/dcj1ykq51/image/upload/v1674844364/Eshop/assets/Profile_zpkhyd.png" alt="user" />
            <p>{review.name}</p>
            <Rating {...ratingOptions} />
            <span className="reviewCartComment">{review.comment}</span>
        </div>
    )
}
export default ReviewCard;