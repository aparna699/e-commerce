import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AddToCartButton } from "./AddToCartButton";
import { EditQtyButton } from "./EditQtyButton";
import { Review } from "./Review";

export const ProductPage = (props) => {
  const item = props.item;
  const role = Cookies.get("role");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log("cart");
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setCart(items);
    }
  }, [localStorage.getItem("cart")]);

  return (
    <div className="row p-5">
      <h5 className="fw-bold py-3">{item.productName}</h5>
      <div className="col-md-4">
        <div className="card-img">
            <img
            src={`${item.imgUrl}`}
            className="card-img-top"
            alt="..."
            style={{ height: "250px" }}
            />
            
        </div>
      </div>
      <div className="col-md-8 p-3">
        <div className="card p-3">
          <h7 className="fw-bold">Discriptiom: </h7>
          <p>{item.description}</p>
        </div>
        <div className="row my-5 p-3">
            <div className="col-sm-9">
            <h7 className='fw-bold'>{'Rs. ' + item.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h7>
            </div>
            <div className="col-sm-3">
                <div className="">
                <AddToCartButton item= {item}/>
                </div>
            </div>
        </div>
      </div>
      <div className="card"></div>
      <div className="">
        <Review id={item.id}/>
      </div>
    </div>
  );
};
