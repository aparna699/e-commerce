import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import CartItemCard from "../Component/Cart/CartItemCard";
import { getCartList } from "../store/Cart/actions";
import { cartActions } from "../store/Cart/cartSlice";

const Cart = () => {
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);

  const cartList = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartActions.getCartList(userId));
  }, []);

  useEffect(() => {
    setCart(cartList.data);
    setPrice(cartList.totalPrice)
  }, [cartList]);
  


  return (
    <div className="container">
      {/* <div><strong>Is Loading: </strong>{JSON.stringify(cartList.isLoading)}</div>
      <div><strong>Is Success: </strong>{JSON.stringify(cartList.isSuccess)}</div>
      <div><strong>Error Message: </strong>{JSON.stringify(cartList.errorMessage)}</div> */}
      <h1 className="fw-bolder">My Cart</h1>
      <div className="row">
        {cart.map((key) => {
          return <CartItemCard cart={key} />;
        })}
      </div>
      <div className="text-end  mt-3">
        <h5><span className="fw-bold">Total Cost:</span> Rs. {price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h5>
        {console.log(price)}
      </div>
      <div className="row my-3">
        <div className="col-md-9"></div>
        <a className="col-md-3" href="/ordering"><button className="btn btn-dark col-md-12">Proceed To Order</button></a>
      </div>
    </div>
  );
};

export default Cart;
