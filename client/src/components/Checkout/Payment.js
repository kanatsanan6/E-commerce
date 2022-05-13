import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import "./Payment.css"

function Payment() {
  const location = useLocation();

  // Load Strip.js
  const stripePromise = loadStripe(
    "pk_test_51Ky8bjSJRXYOOaKx3KwUFaviEc12KGY7haqt3ygJYCTBRg1co5eDrEYUTFrnUVRiX4CiZggFLL7ZfY1xxHKzvu9300Z8uUzL1r"
  );
  const appearance = location.state.appearance;
  const options = location.state.options;

  return (
    <div className="payment">
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Payment;
