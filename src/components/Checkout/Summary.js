import React, { useEffect, useState } from "react";
import { database } from "../../firebase/firebase";
import { useStateValue } from "../../StateProvider/StateProvider";
import "./Summary.css";
import { ref, onValue } from "firebase/database";

function Summary() {
  const [{ user }] = useStateValue();
  const [basket, setBasket] = useState([]);

  // Get basket
  useEffect(() => {
    const getBasket = () => {
      setBasket(JSON.parse(localStorage.getItem("basket")));
    };

    if (user === null) {
      // LocalStorage (unauth)
      if(localStorage.length !== 0) {
        setBasket(JSON.parse(localStorage.getItem("basket")));
      }
      window.addEventListener("storage", getBasket);
    } else {
      // Database (auth)
      const dbRef = ref(database, `users/${user.uid}`);
      onValue(dbRef, (snapshot) => {
        console.log("onValue has been executed");
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
        <button>Check Out</button>
      </div>
    </div>
  );
}

export default Summary;
