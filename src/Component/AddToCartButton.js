import React from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";

export const AddToCartButton = (props) => {
  const item = props.item;
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const url = "api/cart-item";

  const addItemToCart = async (e) => {
    e.preventDefault();
    let isMounted = true;
    try {
      const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const data = JSON.stringify({
        userId: `${userId}`,
        itemId: `${item.id}`,
        qty: 1,
      });

      const response = await axios.post(url, data, {
        headers: header,
        withCredentials: false,
      });
      console.log(response.data);
      isMounted && window.location.reload(true);
      console.log("Add");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button onClick={addItemToCart} className="btn btn-dark ">
      Add To Cart
    </button>
  );
};
