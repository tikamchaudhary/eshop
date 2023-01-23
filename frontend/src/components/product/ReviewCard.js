import React from "react";
import { Rating } from "@mui/material";
import profilePng from "../../images/profile.png";


const ReviewCard = ({ review }) => {
    const ratingOptions = {
        size: "large",
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };
    return (
        <div className="reviewCart">
            <img src={profilePng} alt="user" />
            <p>{review.name}</p>
            <Rating {...ratingOptions} />
            <span className="reviewCartComment">{review.comment}</span>
        </div>
    )
}
export default ReviewCard;