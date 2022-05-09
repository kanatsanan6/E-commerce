import React, { useState } from "react";
import "./NormalDetail.css";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

function shortenName(string, n) {
  if (string?.length > n) {
    return string.substr(0, n - 1) + "...";
  } else {
    return string;
  }
}

function NormalDetail({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="normaldetail"
      onClick={() => {
        navigate(`/product/${product.id}`, {
          state: product,
        });
      }}
    >
      <div className="normaldetail__container">
        <img src={product.image} alt="" />
        <h1>{shortenName(product.title, 24)}</h1>
        <div className="normaldetail__containerRating">
          <StarIcon className="normaldetail__containerRatingStar" />
          <h2>{product.rating.rate.toFixed(1)}</h2>
        </div>
      </div>

      <div className="normaldetail__containerPrice">
        <h3>$ {product.price.toFixed(2)}</h3>
        <h4>$ {(product.price * 1.3).toFixed(2)}</h4>
      </div>
    </div>
  );
}

export default NormalDetail;
