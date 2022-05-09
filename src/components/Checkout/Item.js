import React from "react";
import "./Item.css";
import { useStateValue } from "../../StateProvider/StateProvider";

function shortenName(string, n) {
  if (string?.length > n) {
    return string.substr(0, n - 1) + "...";
  } else {
    return string;
  }
}

function Item({ product }) {
  const [, dispatch] = useStateValue();

  return (
    <div className="item">
      <div className="item__image">
        <img src={product.image} />
      </div>
      <div className="item__detail">
        <div className="item__titlePrice">
          <h1>{shortenName(product.title, 47)}</h1>
          <h2>$ {(product.price * product.number).toFixed(2)}</h2>
        </div>
        <h2>{product.category}</h2>
        <div className="item__quantity">
          <button
            onClick={() => {
              dispatch({
                type: "ADD_TO_BASKET",
                item: product,
              });
            }}
          >
            +
          </button>
          <h3>{product.number}</h3>
          <button
            onClick={() => {
              dispatch({
                type: "DECREASE_ONE_ITEM",
                item: product,
              });
            }}
          >
            -
          </button>
        </div>
        <button
          onClick={() => {
            dispatch({
              type: "REMOVE_FROM_BASKET",
              item: product,
            });
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default Item;
