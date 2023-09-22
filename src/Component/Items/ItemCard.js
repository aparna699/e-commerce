import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
// import { EditQtyButton } from "../EditQtyButton";
import { AddToCartButton } from "../Cart/AddToCartButton";

const ItemCard = (props) => {
  const item = props.item;

  return (
    <div className="col-md-3 col-sm-6 p-2" >
      <div className="card justify-content-center" style={{ width: "auto" }}>
        <a href={`/items/${item.id}`}>
          <div className="card-img">
            <img
              src={`${item.imgUrl}`}
              className="card-img-top"
              alt="..."
              style={{ height: "200px" }}
            />
          </div>
        </a>
        <div className="card-body ">
          <p className="card-title fw-bolder">{`${item.productName}`}</p>
          <p className="card-text overflow-hidden" style={{ height: "50px" }}>
            {`${item.description}`}
          </p>
          <p>{'Rs. ' + item.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>
          <AddToCartButton item= {item}/>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
