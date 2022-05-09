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
        <div>
          <NormalDetail product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductPreview;
