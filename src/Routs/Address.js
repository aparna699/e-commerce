import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AddressCart } from "../Component/Address/AddressCart";
import axios from "../api/axios";
import { AddAddress } from "../Component/Address/AddAddress";

const Address = () => {
  const [address, setAddress] = useState([])
  const token = Cookies.get("token");

  useEffect(() => {
    console.log("addressList");
    const items = JSON.parse(localStorage.getItem("addressList"));
    if (items) {
      setAddress(items);
    }
  }, [localStorage.getItem("addressList")]);

  
  return (
    <div className="container">
      <AddAddress className="my-3"/>
      <div className="row">
        {
          address.map((key) => {
          return <AddressCart address={key}/>
          })
        }
      </div>
    </div>
  );
};

export default Address;
