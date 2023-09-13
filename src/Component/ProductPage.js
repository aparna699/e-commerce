import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AddToCartButton } from "./AddToCartButton";
import { EditQtyButton } from "./EditQtyButton";

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
        <img
          src={`${item.imgUrl}`}
          className="card-img-top"
          alt="..."
          style={{ height: "250px" }}
        />
      </div>
      <div className="col-md-8 p-3">
        <div className="card p-3">
          <h7 className="fw-bold">Discriptiom: </h7>
          <p>{item.description}</p>
        </div>
        <div className="my-5">
          {role == "ROLE_CUSTOMER" ? (
            cart.find((c) => c.itemId.id === item.id) ? (
              <EditQtyButton cart={cart.find((c) => c.itemId.id === item.id)} />
            ) : (
              <div className="d-flex justify-content-end">
                <AddToCartButton item={item} />
              </div>
            )
          ) : (
            // <button className="btn btn-dark" onClick={addToCart}>Add To Cart</button>
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
