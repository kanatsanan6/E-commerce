import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/HomePage/Header/Header";
import "./ProductDetail.css";

function ProductDetail() {
  let { id } = useParams();
  const location = useLocation();
  const product = location.state;
  console.log(product);
  return (
    <div className="productDetail">
      {/* Header */}
      <Header />

      {/* Detail */}
      <div className="productDetail__container">
        {/* image */}
        <img src={product.image} />
        {/* detail */}
        <div className="productDetail__detail">
          {/* name */}
          <h1>{product.title}</h1>
          {/* description */}
          <h2>{product.description}</h2>
          {/* rating */}
          <div className="productDetail__detailRating">
            <h1>★ {product.rating.rate}</h1>
            <h2>({product.rating.count})</h2>
          </div>
          {/* Price */}
          <div className="productDetail__detailPrice">
            <h1>$ {product.price.toFixed(2)}</h1>
            <h2>$ {(product.price * 1.3).toFixed(2)}</h2>
          </div>

          {/* Button */}
          <div className="productDetail__button">
            <button className="productDetail__buttonAddToCart">
              ADD TO CART
            </button>
            <button className="productDetail__buttonBuyNow">BUY NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
