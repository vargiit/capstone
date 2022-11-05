import React from "react";
import "./cart-icon.scss";
import { ReactComponent as Carticon } from "../../assets/shopping-bag.svg";

const CartIcon = () => {
  return (
    <div className="cart-icon-container">
      <Carticon className="shopping-iitem-countcon" />
      <span className="item-count">10</span>
    </div>
  );
};

export default CartIcon;
