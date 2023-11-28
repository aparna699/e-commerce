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



export const CheckoutForm = (props) => {
  const [email, setEmail] = useState();
  const body = {
    items: JSON.parse(props.items),
    amount:  props.amount
  }

  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.users)
  const paymentList = useSelector((state) => state.payment)
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
    console.log("body", body)
    dispatch(paymentAction.createPaymentIntent(body))
  }, []);
  return (
    <div className='my-2'>
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
