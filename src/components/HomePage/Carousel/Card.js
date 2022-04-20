import React, { useState, useEffect } from "react";
import axios from "../../../axios/axios";
import requests from "../../../axios/request";
import "./Card.css";

function Card(id) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${requests.fetchProduct}/${id.id}`);
      setProducts(request.data);
    }

    fetchData();
  }, []);

  const title = products.title;
  const description = products.description;
  const price = products.price;
  const fullPrice = price * 1.3;
  const image = products.image;

  return (
    <div className="card">
      <div className="card__productDetail">
        <h1>{title}</h1>
        <h2>{description}</h2>
        <div className="card__productDetailPrice">
          <h3>${price}</h3>
          <h4>${fullPrice.toFixed(2)}</h4>
        </div>
        <button type="button" className="card_buyButton">
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
