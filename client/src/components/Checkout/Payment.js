import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

import Header from "../HomePage/Header/Header";

function Payment() {
  const location = useLocation();

  // Load Strip.js
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API);
  const options = location.state.options;

  return (
    <div className="payment">
      <Header className="payment__header"/>
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Payment;
