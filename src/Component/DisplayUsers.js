import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";
import { DeleteUser } from "./DeleteUser";

export const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const url = `/api/users`;

    const getUsers = async () => {
      console.log("get Users");
      try {
        const header = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(url, {
          headers: header,
        });

        console.log("users", response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="card p-2 m-2">
      <div className="row">
        <div className="col-sm-1">
          <h6 className="fw-bold">ID</h6>
        </div>
        <div className="col-sm-2">
          <h6 className="fw-bold">Name</h6>
        </div>
        <div className="col-sm-3">
          <h6 className="fw-bold">Email</h6>
        </div>
        <div className="col-sm-2">
          <h6 className="fw-bold">Phone</h6>
        </div>
        <div className="col-sm-2">
          <h6 className="fw-bold">DOB</h6>
        </div>
        <div className="col-sm-2">
          <h6 className="fw-bold">Role</h6>
        </div>
      </div>
      <div className="col-sm-12 card my-2"></div>
      {users.map((user) => {
        return (
          <div className="row">
            <div className="col-sm-1">
              <h6>{user.id}</h6>
            </div>
            <div className="col-sm-2">
              <h6>{user.firstName} {user.lastName}</h6>
            </div>
            <div className="col-sm-3">
              <h6>{user.email}</h6>
            </div>
            <div className="col-sm-2">
              <h6>{user.phoneNumber}</h6>
            </div>
            <div className="col-sm-2">
              <h7>{user.dOB.substring(0,10)}</h7>
            </div>
            <div className="col-sm-1">
              {
                (user.role === 'ROLE_ADMIN')?(
                  <h7 className="fw-bold col-sm-6">ADMIN</h7>
                ):(
                  <h7 className="col-sm-6">CUSTOMER</h7>
                )
              }
              
            </div>
            <div className="col-sm-1 mb-2">
              <DeleteUser userId = {user.id}/>
            </div>
            
          </div>
        );
      })}
    </div>
  );
};
