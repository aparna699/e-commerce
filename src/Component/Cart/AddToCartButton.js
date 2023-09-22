import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../../api/axios";
import { EditQtyButton } from "./EditQtyButton";

export const AddToCartButton = (props) => {
  const item = props.item;
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const userId = Cookies.get("userId");
  const [cart, setCart] = useState([]);
  const url = "api/cart-item";

  useEffect(() => {
    console.log("cart");
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setCart(items);
    }
  }, [localStorage.getItem("cart")]);

 

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
      console.log("Item Added to cart");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <button onClick={addItemToCart} className="btn btn-dark ">
    //   Add To Cart
    // </button>
    <div>
      {role === "ROLE_CUSTOMER" ? (
        cart.find((c) => c.itemId.id === item.id) ? (
          <EditQtyButton cart={cart.find((c) => c.itemId.id === item.id)} />
        ) : (
          <div className="d-flex justify-content-end">
            {/* <AddToCartButton item= {item}/> */}
            <button onClick={addItemToCart} className="btn btn-dark ">
              Add To Cart
            </button>
          </div>
        )
      ) : (
        // <button className="btn btn-dark" onClick={addToCart}>Add To Cart</button>
        <div></div>
      )}
    </div>
  );
};
