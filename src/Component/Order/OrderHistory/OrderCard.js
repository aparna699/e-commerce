import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { orderAction } from '../../../store/Order/orderSlice';

export const OrderCard = (props) => {
    const [orders , setOrders] = useState([]);

    const orderId = props.order.id;
    const totalCost = props.order.totalCost;
    const orderDate = new Date(props.order.orderDate);
    const status = props.order.statusId
    
    const orderList = useSelector((state) => state.order)
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(orderAction.getOrderItems(orderId));
    }, []);
    useEffect(() => {
      if(!orderList.isOrderListLoading && orderList.isOrderListSuccess){
        const order = orderList.orderLines.filter((k) => k.orderId.id == orderId);
        setOrders(order)
      }
    }, [orderList]);

  return (
    <div className='card p-2 bg-light my-2'>
        <div className='row'>
          <div className='col-md-12'>
            <h5><spam className="fw-bold">Order ID: </spam>{orderId}</h5>
          </div>
          <div className='col-md-6'>
            <h6><spam className="fw-bold">Total Cost: </spam>{'Rs. ' + totalCost.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h6>
          </div>
          <div className='col-md-3'>
            <h6 className='text-end'><spam className="fw-bold">Ordered On: </spam>{orderDate.getDate()+" "+orderDate.toLocaleString('en-us',{month:'short'})+" "+orderDate.getFullYear()}</h6>
          </div>
          <div className='col-md-3'>
            <h6 className='text-end'><spam className="fw-bold">Order Status: </spam>{status}</h6>
          </div>
        </div>
        <div className="card"></div>
        <div className="row row-flex">
        <div className='col-md-10'>
          {/* <h1>{orders.length}</h1> */}
          <div className="row row-flex p-3">
            {orders.map((k) => {
              return( 
                <div className=' col-md-2'>
                  <div className="card card-img">
                    <a href={`/items/${k.itemId.id}`}> 
                    <img
                      src={k.itemId.imgUrl[0]}
                      class="card-img-top"
                      alt="..."
                      style={{height: "125px"}}
                    />
                    </a>
                    </div>
                    <div className="card-body-text p-1">
                      <p className='fs-6 text'>{k.itemId.productName}</p>
                    </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="col-md-2">
          
          <div className='d-flex justify-content-end p-2'>
            <a href={`Orders/${orderId}`}>
            <button className='btn btn-outline-dark' >Track order</button>
            </a>
          </div>
         
        </div>
        </div>
        
    </div>
  )
}
