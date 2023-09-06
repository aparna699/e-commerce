import React, { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";
import { useState } from "react";
import { EditeQtyButton } from "./EditeQtyButton";

const CartItemCard = (props) => {
  const item = props.cart.itemId;
  const qty = props.cart.qty;
  const token = Cookies.get("token");
  const url = `/api/cart-item/${props.cart.id}`;

  const deleteItem = async (e) => {
    e.preventDefault()
    let isMounted = true
    try {
        const header = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const response = await axios.delete(url , {
          headers: header,
          withCredentials: false
        });
        console.log(response.data);
        isMounted && window.location.reload(true);
        console.log("delete");
      } catch (err) {
        console.log(err);
      }
    return "deleted";
  };

  return (
    <div className="col-md-12 px-5 m-2" >
      <div className="card m-1" >
        <div className="row">
          <div className="col-md-3">
            <img
              src={item.imgUrl[0]}
              class="card-img-top"
              alt="..."
              style={{ height: "150px" , overflow: "hidden"}}
            />
          </div>
          <div className="col-md-9">
            
            <div className="card-body my-3 ">
              <h5 className="fw-bolder">{item.productName}</h5>
              <h7>Qty: {qty}</h7>
              <div className="d-flex justify-content-end">
                <EditeQtyButton cart={props.cart} />
                <button
                  className="btn btn-dark btn-sm mx-2"
                  onClick={deleteItem}
                  style={{ height: "30px" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
