import React, { useState, useEffect } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

function Card({ products, id }) {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProduct(products[id - 1]);
  }, []);

  const title = product.title;
  const description = product.description;
  const price = product.price;
  const fullPrice = price * 1.3;
  const image = product.image;

  return (
    <div className="card">
      <div className="card__productDetail">
        <h1>{title}</h1>
        <h2>{description}</h2>
        <div className="card__productDetailPrice">
          <h3>${price}</h3>
          <h4>${fullPrice.toFixed(2)}</h4>
        </div>
        <button
          onClick={() => {
            navigate(`/product/${product.id}`, {
              state: product,
            });
          }}
          type="button"
          className="card_buyButton"
        >
          Buy now
        </button>
      </div>
      <div className="card__productImage">
        <img src={image} alt="" />
      </div>
    </div>
  );
}

export default Card;
