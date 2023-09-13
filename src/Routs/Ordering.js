import React, { useEffect, useState } from "react";
import { AddAddress } from "../Component/AddAddress";
import { AddressCart } from "../Component/AddressCart";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { OrderButton } from "../Component/OrderButton";


export const Ordering = () => {
  const [cart, setCart] = useState([]);
  const [addressList, setAddressList] =  useState([]);
  const [address, setAddress] = useState();
  console.log(cart)
  let price =0
  let qty=0

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
    price = price + key.qty*(key.itemId.price)
    qty =qty + key.qty
  })


  return (
    <div className="accordion">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#shippingAddress" aria-expanded="true" aria-controls="shippingAddress">
        Shipping Address
        </button>
      </h2>

      <div class="collapse show" id="shippingAddress">
        <div class="card-body p-3">
          <div className="row">
          <div class="col-sm-10" onChange={(e) => setAddress(e.target.value)}>
            {
              addressList.map((k) => {
                return(
                  <div className="">
                    <input 
                      type="radio" 
                      name="flexRadioDefault" 
                      id="address"
                      value= {k.id}
                      class="col-md-1"
                      />
                    <label class="col-md-10" for="address">
                      <AddressCart address={k}/>
                    </label>
                  </div>
                )
              })
            }
            </div>
            <div className="col-sm-2">
              <AddAddress />
            </div>
          </div>
       
        </div>
      </div>

      <h2 class="" id="headingOne">
        <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#cartSummary" aria-expanded="true" aria-controls="shippingAddress">
          Shipping Items
        </button>
      </h2>

      <div class="collapse show" id="cartSummary">
        <div class="card-body p-3">
          <h4 className="fw-bolder">Cart Summary</h4>
          <h5 className="row">
            <span className="col-sm-6 col-md-4 fw-bold">Item</span> 
            <span className="col-sm-3 col-md-5 fw-bold">Qty</span> 
            <span className="col-sm-3 col-md-3 text-end fw-bold">Price</span>
          </h5>
          {cart.map((k) => {
             return (
              <div>
                <h5 className="row">
                  <span className="col-sm-6 col-md-4 ">{k.itemId.productName}</span> 
                  <span className="col-sm-3 col-md-5">x {k.qty}</span> 
                  <span className="col-sm-3 col-md-3 text-end">Rs. {(k.itemId.price*k.qty).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
                </h5>
              </div>
             )
          })}
        </div>
        <div className="card card-footer">
        <h5 className="row">
            <span className="col-sm-6 col-md-4 fw-bold">Total</span> 
            <span className="col-sm-3 col-md-5 fw-bold">{qty}</span> 
            <span className="col-sm-3 col-md-3 text-end fw-bold">Rs. {price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
          </h5>
        </div>
      </div>
      <OrderButton address= {address} cart= {cart}/>
    </div>
  )
}
