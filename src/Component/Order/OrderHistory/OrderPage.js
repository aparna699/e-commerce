import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderAction } from "../../../store/Order/orderSlice";

import dateFormat from "dateformat";
import { OrderTraker } from "./OrderTraker";
import Cookies from "js-cookie";

export const OrderPage = (props) => {
  const order = props.order;
  // console.log("orders", order);

  const role = Cookies.get("role")
  const [orders, setOrders] = useState([]);
  const orderList = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderAction.getItemsByOrderId(order.id));

  }, []);
  useEffect(() => {
    if (orderList.isSuccess && !orderList.isLoading) {
      setOrders(orderList.items);
      console.log(orderList);
    }
  }, [orderList]);
  return (
    <div className="px-4 py-2">
      {/* OrderPage: {order.id} */}
      {console.log(orders)}
      <div className="card my-2">
        <div className="row p-2">
          <div className="col-sm-6">
            {" "}
            <h5>
              <span className="fw-bold"> Order ID: </span> {order.id}
            </h5>
          </div>
          <div className="col-sm-6 d-flex justify-content-end">
            <h5>
              <span className="fw-bold"> Status: </span> {order.statusId}
            </h5>
          </div>
        </div>
        <div className="px-2 py-1 d-flex justify-content-end">
          <span className="fw-bold">Placed: </span>{" "}
          {dateFormat(order.orderDate, "mmm dS, yyyy")}
        </div>
      </div>

      <div className="card my-2 p-2">
        <h5>
          <span className="fw-bold">Shipping Address</span>
        </h5>
        <p>{`${order.addressId.unit} ${order.addressId.line1} ${order.addressId.line2}, ${order.addressId.city} ${order.addressId.state} ${order.addressId.country} - ${order.addressId.pinCode}`}</p>
      </div>
      
      {(role == "ROLE_ADMIN")?(
        <div className="card my-2 p-2">
        <h5><span className="fw-bold">User</span></h5>
        <div className="row">
          <div className="col-2">
              <span className="fw-bold">User ID: </span> {order.userId.id}
          </div>
          <div className="col-4">
              <span className="fw-bold">Name: </span> {order.userId.firstName} {order.userId.lastName}
          </div>
          <div className="col-4">
              <span className="fw-bold">Phone Number: </span> {order.userId.phoneNumber}
          </div>
          <div className="col-2">
              <span className="fw-bold">DOB: </span> {dateFormat(order.userId.dOB, "mmm dS, yyyy")}
          </div>
        </div>
      </div>
      ):(
        <div></div>
      )}

      {/* Traker */}
      <OrderTraker statusId={order.statusId}/>
      
      {/* Order card */}
      <h5 className="p-2 fw-bold">Orders</h5>
      {orders.map((k) => {
        return (
          <div className="card m-2">
            <div className="row">
              <div className="col-2">
                <img
                  src={k.itemId.imgUrl[0]}
                  class="card-img-top"
                  alt="..."
                  style={{ height: "100px", width: "200px" }}
                />
              </div>
              <div className="col-4 p-2">
                <h6 className="fw-bold">Product Name</h6>
                <p>{k.itemId.productName}</p>
              </div>
              <div className="col-3 d-flex justify-content-end">
                <div>
                  <h6 className="fw-bold">Qty</h6>
                  <p className="d-flex justify-content-center">{k.qty}</p>
                </div>
              </div>
              <div className="col-3 d-flex justify-content-end ">
                <div>
                  <h6 className="fw-bold d-flex justify-content-end px-4">
                    Price
                  </h6>
                  <p className="d-flex justify-content-end px-4">
                    Rs.{" "}
                    {k.price
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="d-flex justify-content-end p-2">
      <h5>
        <span className="fw-bold"> Total: </span>
        Rs.
        {order.totalCost.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
      </h5>
      </div>
    </div>
  );
};
