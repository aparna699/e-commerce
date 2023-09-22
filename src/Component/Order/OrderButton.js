import React from 'react'

export const OrderButton = (props) => {
    const address = props.address
    const cart = props.cart

    const order = (e) => {
        e.preventDefault()
        console.log(address)
        console.log(cart);
       }

  return (
    <div className='row p-3'>
        <div className="col-sm-9"></div>
        <button onClick={order} className='btn btn-dark col-sm-3'>
            Pay
        </button>
    </div>
  )
}
