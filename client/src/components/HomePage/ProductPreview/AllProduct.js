import React from "react";
import "./AllProduct.css";
import ProductPreview from "./ProductPreview";

function AllProduct({products}) {
  return (
    <div className="allproduct">
      <div className="allproduct__container">
        <h1>All Product</h1>
        <div className="allproduct__containerHeaderLine"></div>
        <div className="allproduct__containerProduct">
          <ProductPreview products={products} />
        </div>
      </div>
    </div>
  );
}

export default AllProduct;
