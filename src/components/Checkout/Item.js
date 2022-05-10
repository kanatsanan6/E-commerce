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

  // Add to Basket
  const addToBasket = () => {
    // localStorage
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
    } else if (found === undefined) {
      const newBasket = [{ ...product, number: 1 }];
      localStorage.setItem("basket", JSON.stringify(newBasket));
    } else {
      const newBasket = [...prevBasket, { ...product, number: 1 }];
      localStorage.setItem("basket", JSON.stringify(newBasket));
    }
    window.dispatchEvent(new Event("storage"));
  };

  // Remove from basket
  const removeFromBasket = () => {
    // localStorage
    const prevBasket = JSON.parse(localStorage.getItem("basket"));
    const index = prevBasket.findIndex(
      (basketItem) => basketItem.id === product.id
    );
    if (index >= 0) {
      const newBasket = prevBasket;
      newBasket.splice(index, 1);
      localStorage.setItem("basket", JSON.stringify(newBasket));
    } else {
      localStorage.setItem("basket", JSON.stringify(prevBasket));
    }
    window.dispatchEvent(new Event("storage"));
  };

  // Decrease one item from basket
  const decreaseItem = () => {
    // localStorage
    const prevBasket = JSON.parse(localStorage.getItem("basket"));
    const index = prevBasket.findIndex(
      (basketItem) => basketItem.id === product.id
    );
    if (index >= 0) {
      const newBasket = prevBasket.map((basketItem) =>
        basketItem.id === product.id && basketItem.number > 1
          ? { ...basketItem, number: basketItem.number - 1 }
          : basketItem
      );
      localStorage.setItem("basket", JSON.stringify(newBasket));
    } else {
      localStorage.setItem("basket", JSON.stringify(prevBasket));
    }
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="item">
      <div className="item__image">
        <img src={product.image} />
      </div>
      <div className="item__detail">
        <div className="item__titlePrice">
          <h1>{shortenName(product.title, 38)}</h1>
          <h2>${(product.price * product.number).toFixed(2)}</h2>
        </div>
        <h2>{product.category}</h2>
        <div className="item__quantity">
          <button onClick={addToBasket}>+</button>
          <h3>{product.number}</h3>
          <button onClick={decreaseItem}>-</button>
        </div>
        <button onClick={removeFromBasket}>Remove</button>
      </div>
    </div>
  );
}

export default Item;
