import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { EditQtyButton } from "./EditQtyButton";
import axios from "../api/axios";

const ItemCard = (props) => {
  const item = props.item;
  const role = Cookies.get("role");
  const [cart, setCart] = useState([]);
  const token = Cookies.get("token");
  const userId = Cookies.get("userId")
  const url = "api/cart-item";

  useEffect(() => {
    console.log("cart");
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setCart(items);
    }
  }, [localStorage.getItem("cart")]);

  const addToCart = async (e) => {
    e.preventDefault();
    let isMounted = true;
    try {
      const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const data =  JSON.stringify({
          "userId": `${userId}`,
          "itemId": `${item.id}`,
          "qty": 1
        })

      const response = await axios.post(url, 
        data, 
        {
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
          {role == "ROLE_CUSTOMER" ? (
            cart.find((c) => c.itemId.id === item.id) ? (
              <EditQtyButton
                cart={cart.find((c) => c.itemId.id === item.id)}
              />
            ) : (
              <div className="d-flex justify-content-end">
                <button className="btn btn-dark " onClick={addToCart}>
                  Add To Cart
                </button>
              </div>
            )
          ) : (
            // <button className="btn btn-dark" onClick={addToCart}>Add To Cart</button>
            <div></div>
          )}
          {/* <a href="#" className="btn btn-primary">
                Go somewhere
              </a> */}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
