import { child, get, ref, set } from "firebase/database";
import React from "react";
import { database } from "../../firebase/firebase";
import { useStateValue } from "../../StateProvider/StateProvider";
import "./Item.css";

function shortenName(string, n) {
  if (string?.length > n) {
    return string.substr(0, n - 1) + "...";
  } else {
    return string;
  }
}

function Item({ product }) {
  const [{ user }] = useStateValue();

  // Add to Basket
  const addToBasket = () => {
    // localStorage
    if (user === null) {
      console.log("localStorage is updated: basket");
      const prevBasket = JSON.parse(localStorage.getItem("basket"));
      const found = prevBasket?.findIndex(
        (basketItem) => basketItem.id === product.id
      );
      let newBasket = [];
      if (found >= 0) {
        newBasket = prevBasket.map((basketItem) =>
          basketItem.id === product.id
            ? { ...basketItem, number: basketItem.number + 1 }
            : basketItem
        );
      } else if (found === undefined) {
        newBasket = [{ ...product, number: 1 }];
      } else {
        newBasket = [...prevBasket, { ...product, number: 1 }];
      }
      localStorage.setItem("basket", JSON.stringify(newBasket));
      window.dispatchEvent(new Event("storage"));
    }
    // Database
    else {
      console.log("Database is updated: basket");
      const dbRef = ref(database);
      get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
        let prevBasket = [];
        if (snapshot.val() !== null) {
          prevBasket =
            snapshot.val().basket !== undefined ? snapshot.val().basket : [];
        }
        const found = prevBasket.findIndex(
          (basketItem) => basketItem.id === product.id
        );
        let newBasket = [];
        if (found >= 0) {
          newBasket = prevBasket.map((basketItem) =>
            basketItem.id === product.id
              ? { ...basketItem, number: basketItem.number + 1 }
              : basketItem
          );
        } else {
          newBasket = [...prevBasket, { ...product, number: 1 }];
        }
        set(ref(database, `users/${user.uid}`), {
          username: user.displayName,
          email: user.email,
          basket: newBasket,
        });
      });
    }
  };

  // Remove from basket
  const removeFromBasket = () => {
    // localStorage
    if (user === null) {
      const prevBasket = JSON.parse(localStorage.getItem("basket"));
      const index = prevBasket.findIndex(
        (basketItem) => basketItem.id === product.id
      );
      let newBasket = prevBasket;
      if (index >= 0) {
        newBasket.splice(index, 1);
      }
      localStorage.setItem("basket", JSON.stringify(newBasket));
      window.dispatchEvent(new Event("storage"));
    } // Database
    else {
      console.log("Database is updated: basket");
      const dbRef = ref(database);
      get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
        let prevBasket = [];
        if (snapshot.val() !== null) {
          prevBasket =
            snapshot.val().basket !== undefined ? snapshot.val().basket : [];
        }
        const index = prevBasket.findIndex(
          (basketItem) => basketItem.id === product.id
        );
        let newBasket = prevBasket;
        if (index >= 0) {
          newBasket.splice(index, 1);
        }
        set(ref(database, `users/${user.uid}`), {
          username: user.displayName,
          email: user.email,
          basket: newBasket,
        });
      });
    }
  };

  // Decrease one item from basket
  const decreaseItem = () => {
    // localStorage
    if (user === null) {
      const prevBasket = JSON.parse(localStorage.getItem("basket"));
      const index = prevBasket.findIndex(
        (basketItem) => basketItem.id === product.id
      );
      let newBasket = prevBasket;
      if (index >= 0) {
        newBasket = prevBasket.map((basketItem) =>
          basketItem.id === product.id && basketItem.number > 1
            ? { ...basketItem, number: basketItem.number - 1 }
            : basketItem
        );
      }
      localStorage.setItem("basket", JSON.stringify(newBasket));
      window.dispatchEvent(new Event("storage"));
    }
    // Database
    else {
      console.log("Database is updated: basket");
      const dbRef = ref(database);
      get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
        let prevBasket = [];
        if (snapshot.val() !== null) {
          prevBasket =
            snapshot.val().basket !== undefined ? snapshot.val().basket : [];
        }
        const index = prevBasket.findIndex(
          (basketItem) => basketItem.id === product.id
        );
        let newBasket = prevBasket;
        if (index >= 0) {
          newBasket = prevBasket.map((basketItem) =>
            basketItem.id === product.id && basketItem.number > 1
              ? { ...basketItem, number: basketItem.number - 1 }
              : basketItem
          );
        }
        set(ref(database, `users/${user.uid}`), {
          username: user.displayName,
          email: user.email,
          basket: newBasket,
        });
      });
    }
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
