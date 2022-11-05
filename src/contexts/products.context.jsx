import { useContext, useState } from "react";
import { createContext } from "react";
import SHOP_DATA from "../shop-data.json";

const productContext = createContext({
  products: [],
  setProducts: () => null,
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(SHOP_DATA);

  return (
    <productContext.Provider value={{ products, setProducts }}>
      {children}
    </productContext.Provider>
  );
};

export const useProductContext = () => useContext(productContext);
