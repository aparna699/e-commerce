import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import CartItemCard from "../Component/CartItemCard";

const Cart = () => {
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");
  const [cart, setCart] = useState([]);
  // 
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')))
    // console.log(JSON.parse(localStorage.getItem('cart')))
    console.log("Cont: " + localStorage.getItem('totalQty'))
    // let isMounted = true;
    // const controller = new AbortController();
    // const url = `/api/cart-item/user/${userId}`;

    // const getCartItems = async () => {
    //   try {
    //     const header = {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     };
    //     const response = await axios.get(url, {
    //       header: header,
    //     });
    //     console.log(response.data);

    //     isMounted && setCartItems(response.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // getCartItems();

    // return () => {
    //   isMounted = false;
    //   controller.abort();
    // };
  }, []);

  return (
    <div className="container">
      <h1>My Cart</h1>
      <div className="row">
        {cart.map((key) => {
          return <CartItemCard item={key.itemId} qty={key.qty} />;
        })}
      </div>
      <div className="row p-5">
        <div className="col-md-9"></div>
        <button className="btn btn-dark col-md-3">
          Proceed To Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
