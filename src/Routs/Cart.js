import Cookies from 'js-cookie';
import React from 'react'

const Cart = () => {
    const addressId = Cookies.get('addressId')
  return (
    <div>Cart: {`${addressId}`}</div>
  )
}

export default Cart;