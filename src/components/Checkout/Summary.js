import React from "react";
import { useStateValue } from "../../StateProvider/StateProvider";
import "./Summary.css";

function Summary() {
  const [{ basket }] = useStateValue();

  const calTotalPrice = (basket) => {
    let totalPrice = 0;
    basket.forEach((basketItem) => {
      totalPrice += basketItem.price * basketItem.number;
    });
    return totalPrice;
  };

  const calShip = (basket) => {
    let itemCnt = 0;
    basket.forEach((basketItem) => {
      itemCnt += basketItem.number;
    });
    return itemCnt * 3;
  };

  return (
    <div className="summary">
      <div className="summary__subtotal">
        <div className="summary__subTotalPrice">
          <h1>Subtotal</h1>
          <h2>$ {calTotalPrice(basket).toFixed(2)}</h2>
        </div>
        <div className="summary__subTotalShip">
          <h1>Estimated Delivery & Handling</h1>
          <h2>$ {calShip(basket).toFixed(2)}</h2>
        </div>
      </div>
      <hr />
      <div className="summary__total">
        <h1>Total</h1>
        <h2>$ {(calTotalPrice(basket) + calShip(basket)).toFixed(2)}</h2>
      </div>
      <hr />
      <div className="summary__button">
        <button>Check Out (To be implemented)</button>
      </div>
    </div>
  );
}

export default Summary;
