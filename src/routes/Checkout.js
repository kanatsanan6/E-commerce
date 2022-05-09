import React from "react";
import Basket from "../components/Checkout/Basket";
import Header from "../components/HomePage/Header/Header";
import "./Checkout.css";

function Checkout() {
  return (
    <div className="checkout">
      <Header />
      <Basket />
    </div>
  );
}

export default Checkout;
