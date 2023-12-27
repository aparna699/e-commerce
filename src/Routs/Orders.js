import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderAction } from "../store/Order/orderSlice";

import SearchIcon from "@mui/icons-material/Search";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import dateFormat from "dateformat";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");

  const orderList = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderAction.getAllOrders());
  }, []);
  useEffect(() => {
    if (!orderList.isLoading && orderList.isSuccess) {
      setOrders(orderList.orders);
    }
  }, [orderList]);

  return (
    <div className="px-4">
      <div className=" py-1">
        <form class="d-flex my-2">
          <div
            class="p-2 card rounded-start border-1 bg-light"
            style={{
              borderRadius: "0%",
            }}
          >
            <SearchIcon style={{ fill: "gray" }} />
          </div>
          <input
            class="form-control rounded-end"
            type="search"
            style={{ borderRadius: "0%" }}
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
          />
        </form>
      </div>
      <div className="card my-2 ">
        <div className="card m-0 py-2 bg-light border-0">
          <div className="row  mx-1">
            <div className="col-sm-1">
              <h6 className="fw-bold">Order ID</h6>
            </div>
            <div className="col-sm-1">
              <h6 className="fw-bold">Date</h6>
            </div>
            <div className="col-sm-1">
              <h6 className="fw-bold">User ID</h6>
            </div>
            <div className="col-sm-2">
              <h6 className="fw-bold">User Name</h6>
            </div>
            <div className="col-sm-2">
              <h6 className="fw-bold">Pin Code</h6>
            </div>
            <div className="col-sm-2">
              <h6 className="fw-bold">Total Cost</h6>
            </div>
            <div className="col-sm-2">
              <h6 className="fw-bold">Status</h6>
            </div>
          </div>
        </div>
        <div>
          {orders
            .filter((post) => {
              const searchList =
                post.id +
                post.userId.firstName +
                post.userId.lastName +
                post.addressId.pinCode;
              if (query === "") {
                //if query is empty
                return post;
              } else if (
                searchList.toLowerCase().includes(query.toLowerCase())
              ) {
                //returns filtered array
                return post;
              }
            })
            .map((k) => {
              return (
                <div className="row mx-1 border-bottom">
                  <div className="col-sm-1">
                    <small>{k.id}</small>
                  </div>
                  <div className="col-sm-1">
                    <small>{dateFormat(k.orderDate, "dd/mm/yy")}</small>
                  </div>                  
                  <div className="col-sm-1">
                    <small>{k.userId.id}</small>
                  </div>
                  <div className="col-sm-2">
                    <small>
                      {k.userId.firstName} {k.userId.lastName}
                    </small>
                  </div>
                  <div className="col-sm-2">
                    <small>{` ${k.addressId.line1} ${k.addressId.line2}, ${k.addressId.city} ${k.addressId.state} ${k.addressId.country} - ${k.addressId.pinCode}`}</small>
                  </div>
                  <div className="col-sm-2">
                    <small>
                      {"Rs " +
                        k.totalCost
                          .toFixed(2)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                    </small>
                  </div>
                  <div className="col-sm-2">
                    <small>{k.statusId.replace("_", " ")}</small>
                  </div>
                  <div className="col-sm-1">
                    <a href={`Orders/${k.id}`}>
                      <button className="btn">
                        <NavigateNextIcon />
                      </button>
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
