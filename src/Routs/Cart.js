import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import CartItemCard from "../Component/CartItemCard";

const Cart = () => {
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log("cart");
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setCart(items);
    }
  }, [localStorage.getItem("cart")]);

  return (
    <div className="container">
      <h1>My Cart</h1>
      <div className="row">
        {cart.map((key) => {
          return <CartItemCard cart={key} />;
        })}
      </div>
      <div className="row p-5">
        <div className="col-md-9"></div>
        <button className="btn btn-dark col-md-3">Proceed To Order</button>
      </div>
    </div>
  );
};

export default Cart;
