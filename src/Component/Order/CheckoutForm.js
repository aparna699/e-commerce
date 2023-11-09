import React, { useState ,useEffect } from 'react';
import {
  useStripe, 
  useElements, 
  ExpressCheckoutElement,
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement
} from '@stripe/react-stripe-js';
import { CardSection } from './Payment/CardSection';
import { CardElement } from "@stripe/react-stripe-js";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import { useDispatch, useSelector } from "react-redux";
import { usersActions } from '../../store/Users/usersSlice';
import { paymentAction } from '../../store/Payment/paymentSlice';
import { Loading } from '../Loading';
import Cookies from 'js-cookie';
import { json } from 'react-router-dom';



export const CheckoutForm = () => {
  //get user email
  const [email, setEmail] = useState();
  const [body, setBody] = useState();

  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.users)
  useEffect(() => {
    dispatch(usersActions.getProfileInfo())
  }, []);
  useEffect(() => {
    if(usersList.isSuccess && !usersList.isLoading){
      setEmail(usersList.user.email)
    }
  },[usersList])
  
  //create payment intint
  
  useEffect(() => {
    const items = Cookies.get("items");
    const amount = Cookies.get("amount");
    setBody({
      items: JSON.parse(items),
      amount: amount
    })
    // dispatch(paymentAction.createPaymentIntent(body))
  }, []);


  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();

 
  const stripePromise = loadStripe('pk_test_51O2ptpSDQwswy4FigEMzva0hH8HGBb5uUlxOGhgmzkmDdt4pHvQZyLiVwAmk89w8ys4NbdpbQLlKJNeJIOpGlRy700TmQsH95z');

  return (
    <div className='my-2'>
      {/* {cartList.isSuccess ? (
        <p>Success</p>
      ):(
        <p>not Success</p>
      )} */}
      {
        body != undefined ? (
          <CardSection email={email} body={JSON.stringify(body)}/>
        ):(
          <Loading/>
        )
      }
    </div>
  )
}
