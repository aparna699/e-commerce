import React, { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../../api/axios";
import { useState } from "react";
import { EditQtyButton } from "./EditQtyButton";

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
        console.log("Delete cart item");
      } catch (err) {
        console.log(err);
      }
    return "deleted";
  };

  return (
    <div className="col-md-12 " >{/*px-5 m-2*/}
      <div className="card mx-5 my-2" > {/*m-1*/}
        <div className="row " style={{ height: "160px"}}>
          <div className="col-md-3" >
            <a href={`/items/${item.id}`}>
              <img
                src={item.imgUrl[0]}
                class="card-img-top"
                alt="..."
                style={{ height: "160px"}}
              />
            </a>
          </div>
          <div className="col-md-9">
            
            <div className="card-body my-3 ">
              <a href={`/items/${item.id}`} className='text-dark text-decoration-none'>
                <h5 className="fw-bolder ">
                  {item.productName}
                </h5>
              </a>
              <h7><span className="fw-bold">Qty:</span> {qty}</h7><br/>
              <h7>{'Rs. ' + item.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h7>
              <div className="d-flex justify-content-end">
                <EditQtyButton cart={props.cart} />
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
