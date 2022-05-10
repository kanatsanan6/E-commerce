import React from "react";
import Header from "../components/HomePage/Header/Header";
import SlideCarousel from "../components/HomePage/Carousel/SlideCarousel";
import AllProduct from "../components/HomePage/ProductPreview/AllProduct";
import { Ellipsis } from "react-awesome-spinners";
import "./Home.css";
import { useStateValue } from "../StateProvider/StateProvider";

function Home() {
  const [{ products }] = useStateValue();


  return (
    <div>
      {products !== null ? (
        <>
          <Header />
          <SlideCarousel products={products} />
          <AllProduct products={products} />
        </>
      ) : (
        <>
          <Header />
          <div className="home__loading">
            <h1>Loading</h1>
            <Ellipsis color="#df7048" />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
