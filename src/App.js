import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./routes/ProductDetail";
import Home from "./routes/Home";
import Checkout from "./routes/Checkout";
import { useStateValue } from "./StateProvider/StateProvider";
import axios from "axios";
import requests from "./axios/request";
import { useState, useEffect } from "react"

function App() {
  const [,dispatch] = useStateValue();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${requests.fetchProduct}`);
      dispatch({
        type: "FETCH_PRODUCT",
        item: request.data
      })
    }
    fetchData();
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
