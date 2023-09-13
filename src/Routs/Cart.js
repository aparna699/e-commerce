import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import CartItemCard from "../Component/CartItemCard";

const Cart = () => {
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");
  const [cart, setCart] = useState([]);
  let price =0

  useEffect(() => {
    console.log("cart");
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setCart(items);
    }
  }, [localStorage.getItem("cart")]);
  
  cart.map((key) => {
    price = price + key.qty*(key.itemId.price)
    
  })


  return (
    <div className="container">
      <h1 className="fw-bolder">My Cart</h1>
      <div className="row">
        {cart.map((key) => {
          return <CartItemCard cart={key} />;
        })}
      </div>
      <div className="text-end mx-5 mt-3">
        <h5><span className="fw-bold">Total Cost:</span> Rs. {price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h5>
      </div>
      <div className="row px-5 my-3">
        <div className="col-md-9"></div>
        <a className="col-md-3" href="/ordering"><button className="btn btn-dark col-md-12">Proceed To Order</button></a>
      </div>
    </div>
  );
};

export default Cart;
