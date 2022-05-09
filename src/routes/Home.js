import React, { useState, useEffect } from "react";
import Header from "../components/HomePage/Header/Header";
import SlideCarousel from "../components/HomePage/Carousel/SlideCarousel";
import AllProduct from "../components/HomePage/ProductPreview/AllProduct";
import axios from "axios";
import requests from "../axios/request";
import { Ellipsis } from 'react-awesome-spinners'
import "./Home.css"

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${requests.fetchProduct}`);
      setProducts(request.data);
    }
    fetchData();
  }, []);
  

  return (
    <div>
      {products.length !== 0 ? (
        <>
          <Header />
          <SlideCarousel products={products} />
          <AllProduct products={products} />
        </>
      ) : (
        <div className="home__loading">
          <h1>Loading</h1>
          <Ellipsis color="#df7048" />
        </div>
      )}
    </div>
  );
}

export default Home;
