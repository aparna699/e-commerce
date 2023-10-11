import React from "react";
import Cookies from "js-cookie";
import axios from "../../api/axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/Cart/cartSlice";

export const EditQtyButton = (props) => {
  const item = props.cart.itemId;
  const qty = props.cart.qty;

  const totalQty = item.qty;
  const url = `/api/cart-item/${props.cart.id}`;

  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart);

  const editCart = async (newQty) => {
    const data = JSON.stringify({
      qty: newQty,
    });
    dispatch(cartActions.editQty({url,data}));
    
    if(cartList.isSuccess ){
      window.location.reload(true)
    }
  };

  const removeItem = (e) => {
    e.preventDefault();
    const newQty = qty === 1 ? deleteItem(e) : qty - 1;
    if (newQty === "deleted") {
      console.log("deleted");
    } else {
      editCart(newQty);
      console.log("remove");
    }
  };

  const addItem = (e) => {
    e.preventDefault();
    const newQty = qty === totalQty ? "OutOfStock" : qty + 1;
    if (newQty === "OutOfStock") {
        alert("Out of Stock")
    } else {
      editCart(newQty);
      console.log("add");
    }
  };

  const deleteItem = async () => {
    dispatch(cartActions.deleteCartItem(url))
    if(cartList.isSuccess && !cartList.isLoading){
      // window.location.reload(true)
    }
    return "deleted";
  };

  return (
    <div className="d-flex justify-content-end" >
      <button
        className="btn btn-outline-dark btn-sm"
        onClick={removeItem}
        style={{ height: "30px" }}
      >
        -
      </button>
      <div className=" mx-2 my-1 "> {qty} </div>
      <button
        className="btn btn-outline-dark btn-sm"
        onClick={addItem}
        style={{ height: "30px" }}
      >
        +
      </button>
    </div>
  );
};
