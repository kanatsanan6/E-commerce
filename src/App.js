import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./routes/ProductDetail";
import Home from "./routes/Home";
import Checkout from "./routes/Checkout";
import { useStateValue } from "./StateProvider/StateProvider";
import axios from "axios";
import requests from "./axios/request";
import { useEffect, useState } from "react";
import Login from "./routes/Login";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [, dispatch] = useStateValue();
  const [userInfo, setUserInfo] = useState(null);

  onAuthStateChanged(auth, (user) => {
    setUserInfo(user);
  });

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${requests.fetchProduct}`);
      dispatch({
        type: "FETCH_PRODUCT",
        item: request.data,
      });
    }
    fetchData();

  }, []);

  useEffect(() => {
    dispatch({
      type: "ADD_USER",
      user: userInfo === null ? null : userInfo,
    });
  }, [userInfo]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
