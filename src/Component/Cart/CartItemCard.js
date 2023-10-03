import React, { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../../api/axios";
import { useState } from "react";
import { EditQtyButton } from "./EditQtyButton";

import StarIcon from '@mui/icons-material/Star';
import Rating from "@mui/material/Rating";
import DeleteIcon from '@mui/icons-material/Delete';

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
    <div className="col-md-12 col-sm-12" >{/*px-5 m-2*/}
      <div className="card  my-2" > {/*m-1*/}
        <div className="row " 
        style={{ height: "200px"}}
        >
          <div className="col-md-3 col-6" >
            <a href={`/items/${item.id}`}>
              <img
                src={item.imgUrl[0]}
                class="card-img"
                alt="..."
                // style={{ "minHeight": "200px", "maxHeight": "200px"}}
                style={{height: "200px"}}
              />
            </a>
          </div>
          <div className="col-md-9 col-6">
            
            <div className="card-body " style={{padding: "10px"}}>
              <span className="d-flex justify-content-end">
              <Rating
                  name="simple-controlled"
                  value={4}
                  readOnly
                  precision={0.5}
                  emptyIcon={<StarIcon style={{ opacity: 0.55,}} />
              }
              style={{"color": "yellow"}}
              />
              </span>
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
                  className="btn boder-0 btn-sm mx-2"
                  onClick={deleteItem}
                  style={{ height: "30px" }}
                >
                  <DeleteIcon style={{"fill": "#D10000"}}/>
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
