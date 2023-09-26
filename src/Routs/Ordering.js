import React, { useEffect, useState } from "react";
import { AddAddress } from "../Component/Address/AddAddress";
import { AddressCart } from "../Component/Address/AddressCart";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { OrderButton } from "../Component/Order/OrderButton";

export const Ordering = () => {
  const [cart, setCart] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [address, setAddress] = useState();
  console.log(cart);
  let price = 0;
  let qty = 0;

  useEffect(() => {
    console.log("cart");
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setCart(items);
    }
  }, [localStorage.getItem("cart")]);

  useEffect(() => {
    console.log("addressList");
    const items = JSON.parse(localStorage.getItem("addressList"));
    if (items) {
      setAddressList(items);
    }
  }, [localStorage.getItem("addressList")]);

  cart.map((key) => {
    price = price + key.qty * key.itemId.price;
    qty = qty + key.qty;
  });

  return (
    <div className="accordion">
      <h2 class="accordion-header" id="headingOne">
        <button
          class="accordion-button "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#shippingAddress"
          aria-expanded="true"
          aria-controls="shippingAddress"
        >
          Shipping Address
        </button>
      </h2>

      <div class="collapse show me-2" id="shippingAddress">
        <div className="col-sm-7">
          <AddAddress />
        </div>
        <div class="card-body p-3">
          <div className="row">
            <div class="col-sm-7" onChange={(e) => setAddress(e.target.value)}>
              {addressList.map((k) => {
                return (
                  <div className="">
                    <input
                      type="radio"
                      name="flexRadioDefault"
                      id="address"
                      value={k.id}
                      class="col-md-1"
                    />
                    <label class="col-md-11" for="address">
                      <AddressCart address={k} />
                    </label>
                  </div>
                );
              })}
            </div>

            <div className="card col-sm-5">
              <h2 class="" id="headingOne">
                <button
                  class="accordion-button "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#cartSummary"
                  aria-expanded="true"
                  aria-controls="shippingAddress"
                >
                  Shipping Items
                </button>
              </h2>

              <div class="collapse show" id="cartSummary">
                <div class="card-body ">
                  <h4 className="fw-bolder">Cart Summary</h4>
                  <h5 className="row">
                    <div className="col-sm-3"></div>
                    <span className="col-sm-3 col-md-4 fw-bold">Item</span>
                    <span className="col-sm-2 col-md-2 fw-bold">Qty</span>
                    <span className="col-sm-3 col-md-3 text-end fw-bold">
                      Price
                    </span>
                  </h5>
                  {cart.map((k) => {
                    return (
                      <div>
                        <p className="row">
                          <a 
                            className="col-sm-3"
                            href={`/items/${k.itemId.id}`}
                          >
                            <img
                              className="col-sm-12"
                              src= {k.itemId.imgUrl[0]}
                            />
                          </a>
                          <span className="col-sm-3 col-md-4 ">
                            {k.itemId.productName}
                          </span>
                          <span className="col-sm-2 col-md-1">{k.qty}</span>
                          <span className="col-sm-3 col-md-4 text-end">
                            Rs.{" "}
                            {(k.itemId.price * k.qty)
                              .toFixed(2)
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="card card-footer">
                  <h5 className="row">
                    <span className="col-sm-6 col-md-6 fw-bold">Total</span>
                    {/* <span className="col-sm-3 col-md-1 fw-bold">{qty}</span> */}
                    <span className="col-sm-3 col-md-5 fw-bold">
                      Rs.{" "}
                      {price
                        .toFixed(2)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                    </span>
                  </h5>
                </div>
              </div>
              <OrderButton address={address} cart={cart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};