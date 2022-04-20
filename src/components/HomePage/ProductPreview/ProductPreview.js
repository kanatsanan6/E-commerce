import React, { useState, useEffect } from "react";
import axios from "../../../axios/axios";
import requests from "../../../axios/request";
import NormalDetail from "./NormalDetail";
import "./ProductPreview.css";

function ProductPreview() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${requests.fetchProduct}`);
      setProducts(request.data);
    }
    fetchData();
  }, []);

  return (
    <div className="productpreview">
      {products.map((product) => (
        <>
          <NormalDetail product={product} />
        </>
      ))}
    </div>
  );
}

export default ProductPreview;
