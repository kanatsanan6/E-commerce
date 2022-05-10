import React, { useEffect, useState } from "react";
import "./Basket.css";
import Item from "./Item";
import Summary from "./Summary";

function Basket() {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const getBasket = () => {
      setBasket(JSON.parse(localStorage.getItem("basket")));
    };
    setBasket(JSON.parse(localStorage.getItem("basket")));
    window.addEventListener("storage", getBasket);
    return () => {
      window.removeEventListener("storage", getBasket);
    };
  }, []);

  return (
    <div className="basket">
      <div className="basket__item">
        {/* Header */}
        <h1>Basket</h1>
        {/* Item */}
        {basket.length === 0 ? (
          <div><h1 style={{fontSize: "20px", fontWeight: "normal"}}>There are no items in your basket.</h1></div>
        ) : (
          <div>
            {basket.map((basketItem) => {
              return <Item product={basketItem} />;
            })}
          </div>
        )}
      </div>

      <div className="basket__summary">
        {/* Header */}
        <h1>Summary</h1>
        {/* Body */}
        <Summary />
      </div>
    </div>
  );
}

export default Basket;
