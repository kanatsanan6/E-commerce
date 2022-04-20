import React, { useState } from "react";
import "./NormalDetail.css";
import StarIcon from "@mui/icons-material/Star";

function shortenName(string, n) {
  if (string?.length > n) {
    return string.substr(0, n - 1) + "...";
  } else {
    return string;
  }
}

function NormalDetail({ product }) {
  const [style, setStyle] = useState({ display: "none" });
  return (
    <div className="normaldetail">
      <div
        className="normaldetail__container"
        onMouseEnter={(e) => {
          setStyle({ display: "block" });
        }}
        onMouseLeave={(e) => {
          setStyle({ display: "none" });
        }}
      >
        <img src={product.image} alt="" />
        <h1>{shortenName(product.title, 25)}</h1>
        <div className="normaldetail__containerRating">
          <StarIcon className="normaldetail__containerRatingStar" />
          <h2>{product.rating.rate.toFixed(1)}</h2>
        </div>
      </div>
      <div className="normaldetail__containerPrice">
        <h3>$ {product.price.toFixed(2)}</h3>
        <h4>$ {(product.price * 1.3).toFixed(2)}</h4>
      </div>
      <div
        className="normaldetail__moreDetail"
        onMouseEnter={(e) => {
          setStyle({ display: "block" });
        }}
        onMouseLeave={(e) => {
          setStyle({ display: "none" });
        }}
      >
        <button style={style}>More Details</button>
        <button style={style}>Add to Cart</button>
      </div>
    </div>
  );
}

export default NormalDetail;
