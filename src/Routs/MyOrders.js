import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { OrderCard } from '../Component/Order/OrderHistory/OrderCard';
import { orderAction } from '../store/Order/orderSlice';

const MyOrders = () => {
  const [orders , setOrders] = useState([]);
  const orderList = useSelector((state) => state.order)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderAction.getOrders());
  }, []);
  useEffect(() => {
    setOrders(orderList.orders);
  }, [orderList]);
  return (
    <div className='px-4'>
      <h1>MyOrders</h1> 
      {orders.map((k) => {
        return <OrderCard order={k} />
      })}
    </div>
    
  )
}

export default MyOrders;