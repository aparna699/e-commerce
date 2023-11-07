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



export const CheckoutForm = () => {
  //get user email
  const [email, setEmail] = useState();
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
  


  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();

 
  const stripePromise = loadStripe('pk_test_51O2ptpSDQwswy4FigEMzva0hH8HGBb5uUlxOGhgmzkmDdt4pHvQZyLiVwAmk89w8ys4NbdpbQLlKJNeJIOpGlRy700TmQsH95z');

  return (
    <div className='my-2'>
        <form onSubmit={handleSubmit}>
            <CardSection email={email}/>
          <div className="d-flex justify-content-end my-2">
            <button className="btn btn-dark ">Proceed to Buy</button>
          </div>
        </form>
      </div>
  )
}
