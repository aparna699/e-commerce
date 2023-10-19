import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddAddress } from "../Component/Address/AddAddress";
import { AddressCart } from "../Component/Address/AddressCart";
import CartItemCard from "../Component/Cart/CartItemCard";
import { addressActions } from "../store/Address/addressSlice";

export const Checkout = () => {
  const [address, setAddress] = useState();
  const [addresses, setAddresses] = useState();
  const [delevaryPrice, setDelevaryPrice] = useState(0);

  const dispatch = useDispatch();
  const addressList = useSelector((state) => state.address);
  const cartList = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(addressActions.getAllAddress());
  }, []);

  useEffect(() => {
    setAddresses(addressList.data);
  }, [addressList]);

  useEffect(() => {
    console.log(address);
  }, [address]);

  return (
    // <div className='container'>
    <div className="row px-4">
      <div className="col-md-4 my-3">
        <div className="">
          <h3 className="fw-bolder ">Address</h3>
          <div className="d-flex justify-content-end">
            <AddAddress />
          </div>
        </div>
        <div className="" onChange={(e) => setAddress(e.target.value)}>
          {addressList.data.map((k) => {
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
      </div>
      <div className="col-md-4 my-2">
        <div className="p-2">
          <h3 className="fw-bolder">Order</h3>
          <h5 className="row">
            <div className="col-sm-3"></div>
            <span className="col-sm-3 col-md-4 fw-bold">Item</span>
            <span className="col-sm-2 col-md-2 fw-bold">Qty</span>
            <span className="col-sm-3 col-md-3 text-end fw-bold">Price</span>
          </h5>
          {cartList.data.map((k) => {
            return (
              <div>
                <p className="row">
                  <a className="col-sm-3" href={`/items/${k.itemId.id}`}>
                    <img
                      className="col-sm-12"
                      src={k.itemId.imgUrl[0]}
                      style={{ height: "80px" }}
                    />
                  </a>
                  <span className="col-sm-3 col-md-4 ">
                    {k.itemId.productName}
                  </span>
                  <span className="col-sm-2 col-md-1">{k.qty}</span>
                  <span className="col-sm-3 col-md-4 text-end">
                    Rs.
                    {(k.itemId.price * k.qty)
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </span>
                </p>
              </div>
            );
          })}

          <h6 className="row">
            <span className="col-sm-9 col-md-7 fw-bold">Total: </span>
            {/* <span className="col-sm-3 col-md-1 fw-bold">{qty}</span> */}
            <span className="col-sm-3 col-md-5 fw-bold text-end">
              Rs.{" "}
              {cartList.totalPrice
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </span>
          </h6>
        </div>
      </div>
      {/* Order Summary */}
      <div className="col-md-4 my-3">
      <h3 className="fw-bolder">Summary</h3>
        <div className="card my-2 p-2">
          <div className="row">
            <div className="col-md-7">Subtotal</div>
            <div className="col-md-5 ">
              <span className="d-flex justify-content-end">
                Rs.{" "}
                {cartList.totalPrice
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7">Delevary Cost</div>
            <div className="col-md-5 ">
              <span className="d-flex justify-content-end">
                Rs.{" "}
                {delevaryPrice
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7">Taxes</div>
            <div className="col-md-5 ">
              <span className="d-flex justify-content-end">
                Rs.{" "}
                {delevaryPrice
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
              </span>
            </div>
          </div>
          <div className="card" />
          <div className="row fw-bolder">
            <div className="col-md-7">Total</div>
            <div className="col-md-5 ">
              <span className="d-flex justify-content-end">
                Rs.{" "}
                {cartList.totalPrice
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};
