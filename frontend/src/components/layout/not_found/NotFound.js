import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import "./NotFound.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    < div className="page_not_found_container" >
      <div className="page_not_found">
        <ErrorIcon />

        <Typography>404 Page Not Found </Typography>
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
