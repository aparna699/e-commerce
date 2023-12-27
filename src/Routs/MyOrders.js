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
    if(orderList.isSuccess && !orderList.isLoading){
      setOrders(orderList.items);
    }
  }, [orderList]);
  return (
    <div className='px-4'>
      <h1>MyOrders</h1>
      {/* {console.log(orders)}  */}
      {orders.map((k) => {
        return <OrderCard order={k} />
      })}
    </div>
    
  )
}

export default MyOrders;