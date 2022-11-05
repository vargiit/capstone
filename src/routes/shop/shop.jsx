import React from "react";
import ProductCard from "../../components/product-card/product-card";
import { useProductContext } from "../../contexts/products.context";
import "./shop.scss";

const Shop = () => {
  const { products } = useProductContext();
  return (
    <div className="products-container">
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product}></ProductCard>
        </div>
      ))}
    </div>
  );
};

export default Shop;
