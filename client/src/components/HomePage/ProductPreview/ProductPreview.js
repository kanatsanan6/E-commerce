import React from "react";
import NormalDetail from "./NormalDetail";
import "./ProductPreview.css";

function ProductPreview({ products }) {
  return (
    <div className="productpreview">
      {products.map((product, index) => (
        <div key={index}>
          <NormalDetail product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductPreview;
