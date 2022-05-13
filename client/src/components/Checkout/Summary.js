import React, { useEffect, useState } from "react";
import { database } from "../../firebase/firebase";
import { useStateValue } from "../../StateProvider/StateProvider";
import "./Summary.css";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";


function Summary() {
  const navigate = useNavigate();
  const [{ user }] = useStateValue();
  const [basket, setBasket] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  // stripe
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.error(error));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  // Go to checkout
  useEffect(() => {
    if (showCheckout && clientSecret !== "") {
      navigate("/payment", {
        state: {
          appearance: appearance,
          options: options,
        },
      });
      setShowCheckout(false)
    }
  }, [showCheckout]);

  // Get basket
  useEffect(() => {
    const getBasket = () => {
      setBasket(JSON.parse(localStorage.getItem("basket")));
    };

    if (user === null) {
      // LocalStorage (unauth)
      if (localStorage.length !== 0) {
        setBasket(JSON.parse(localStorage.getItem("basket")));
      }
      window.addEventListener("storage", getBasket);
    } else {
      // Database (auth)
      const dbRef = ref(database, `users/${user.uid}`);
      onValue(dbRef, (snapshot) => {
        if (snapshot.val() !== null) {
          if (snapshot.val().basket !== undefined) {
            setBasket(snapshot.val().basket);
          } else {
            setBasket([]);
          }
        } else {
          setBasket([]);
        }
      });
    }

    return () => {
      window.removeEventListener("storage", getBasket);
    };
  }, []);

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
          <h2>${calTotalPrice(basket).toFixed(2)}</h2>
        </div>
        <div className="summary__subTotalShip">
          <h1>Estimated Delivery & Handling</h1>
          <h2>${calShip(basket).toFixed(2)}</h2>
        </div>
      </div>
      <hr />
      <div className="summary__total">
        <h1>Total</h1>
        <h2>${(calTotalPrice(basket) + calShip(basket)).toFixed(2)}</h2>
      </div>
      <hr />
      <div className="summary__button">
        <button onClick={(e) => setShowCheckout(true)}>Check Out</button>
      </div>
    </div>
  );
}

export default Summary;
