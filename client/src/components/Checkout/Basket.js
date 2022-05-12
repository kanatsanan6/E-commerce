import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { database } from "../../firebase/firebase";
import { useStateValue } from "../../StateProvider/StateProvider";
import "./Basket.css";
import Item from "./Item";
import Summary from "./Summary";

function Basket() {
  const [{ user }] = useStateValue();
  const [basket, setBasket] = useState([]);

  // Get basket
  useEffect(() => {
    const getBasket = () => {
      if(localStorage.length !== 0) {
        setBasket(JSON.parse(localStorage.getItem("basket")));
      }
    };
    // localStorage
    if (user === null) {
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

  return (
    <div className="basket">
      <div className="basket__item">
        {/* Header */}
        <h1>Basket</h1>
        {/* Item */}
        {basket.length === 0 ? (
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: "normal" }}>
              There are no items in your basket.
            </h1>
          </div>
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
