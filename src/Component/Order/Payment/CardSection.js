import React, { useState, useEffect } from 'react'

import {
  useStripe, 
  useElements, 
  PaymentElement, 
  LinkAuthenticationElement
} from '@stripe/react-stripe-js';
import Cookies from 'js-cookie';

export const CardSection = (props) => {
  const defaultEmail = props.email
  const body = props.body

  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  
  useEffect(() => {
    console.log("body",JSON.parse(body))
    // dispatch(paymentAction.createPaymentIntent(JSON.parse(body)))
  }, []);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/payment-comletion",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const options = {
    layout: {
      type: 'accordion',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: true
    }
  };

  return (
    <form onSubmit={handleSubmit}> 
      <LinkAuthenticationElement id="link-authentication-element"
        options={{defaultValues: {email: `${defaultEmail}`}}}
      />
      <PaymentElement options={options} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}

{/* <div className="">
            <div className="row">
                <div className="col-12">
                    <label className="col-12">
                        Card number
                        <CardNumberElement
                          className='card-element'
                        // onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="col-8 ">
                    <label className="col-12">
                        Expiration date
                        <CardExpiryElement
                          className='card-element'
                        // onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="col-4">
                    <label className="col-12" >
                        CVC
                        <CardCvcElement 
                          className='card-element'
                        // onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
        </div>  */}
