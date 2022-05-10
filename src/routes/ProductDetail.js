import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/HomePage/Header/Header";
import "./ProductDetail.css";

function ProductDetail() {
  const location = useLocation();
  const product = location.state;

  const addToBasket = () => {
    // Add to Cart (localStorage)
    const prevBasket = JSON.parse(localStorage.getItem("basket"));
    const found = prevBasket?.findIndex(
      (basketItem) => basketItem.id === product.id
    );
    console.log("localStorage is updated: basket");
    if (found >= 0) {
      const newBasket = prevBasket.map((basketItem) =>
        basketItem.id === product.id
          ? { ...basketItem, number: basketItem.number + 1 }
          : basketItem
      );
      localStorage.setItem("basket", JSON.stringify(newBasket));
      window.dispatchEvent(new Event("storage"));
    } else if (found === undefined) {
      const newBasket = [{ ...product, number: 1 }];
      localStorage.setItem("basket", JSON.stringify(newBasket));
      window.dispatchEvent(new Event("storage"));
    } else {
      const newBasket = [...prevBasket, { ...product, number: 1 }];
      localStorage.setItem("basket", JSON.stringify(newBasket));
      window.dispatchEvent(new Event("storage"));
    }
  };

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
              onClick={addToBasket}
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
