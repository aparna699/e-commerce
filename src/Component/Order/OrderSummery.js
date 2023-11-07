import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";

import { CheckoutForm } from "./CheckoutForm";

const STRIPE_PUBLISHABLE_KEY = "pk_test_51O2ptpSDQwswy4FigEMzva0hH8HGBb5uUlxOGhgmzkmDdt4pHvQZyLiVwAmk89w8ys4NbdpbQLlKJNeJIOpGlRy700TmQsH95z"
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export const OrderSummery = (props) => {
  const [delevaryPrice, setDelevaryPrice] = useState(0);
  const cartList = props.cart;
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'inr',
    // Customizable with appearance API.
    appearance: {/*...*/},
  };
  return (
    <div className="col-md-4 ">
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
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
       
      </div>
    </div>
  );
};
