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
  const clientSecret = Cookies.get("clientSecret")

  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    console.log("clientSecret: ", clientSecret)
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);
    elements.submit()

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
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
    // <form onSubmit={handleSubmit}> 
    //   <LinkAuthenticationElement id="link-authentication-element"
    //     options={{defaultValues: {email: `${defaultEmail}`}}}
    //   />
    //   <PaymentElement options={options} />

    //   <button disabled={isProcessing || !stripe || !elements} id="submit">
    //     <span id="button-text">
    //       {isProcessing ? <div className="spinner" id="spinner"></div> : "Pay now"}
    //     </span>
    //   </button>
    //   {/* Show any error or success messages */}
    //   {message && <div id="payment-message">{message}</div>}
    // </form>
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <div className="d-flex justify-content-end">
      <button className='btn btn-dark mt-2 ' disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text" style={{color: "white"}}>
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      </div>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}

