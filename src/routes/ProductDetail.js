import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/HomePage/Header/Header";
import { useStateValue } from "../StateProvider/StateProvider";
import "./ProductDetail.css";

function ProductDetail() {
  const [, dispatch] = useStateValue();
  const location = useLocation();
  const product = location.state;
  return (
    <div className="productDetail">
      {/* Header */}
      <Header />

      {/* Detail */}
      <div className="productDetail__container">
        {/* image */}
        <div className="productDetail__image">
          <img src={product.image} />
        </div>
        {/* detail */}
        <div className="productDetail__detail">
          {/* name */}
          <h1>{product.title}</h1>
          {/* Categories */}
          <h3>{product.category}</h3>
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
          <p className="productDetail__detailDecor">
            incl. of taxes and duties
          </p>

          {/* Button */}
          <div className="productDetail__button">
            <button
              className="productDetail__buttonAddToCart"
              onClick={() => {
                dispatch({
                  type: "ADD_TO_BASKET",
                  item: { ...product, number: 1 },
                });
              }}
            >
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
