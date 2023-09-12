import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AddressCart } from "../Component/AddressCart";
import axios from "../api/axios";
import { AddAddress } from "../Component/AddAddress";

const Address = () => {
  const id = Cookies.get("userId");
  const [address, setAddress] = useState([])
  const token = Cookies.get("token");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log(id);
    const url = `/api/address/user/${id}`;

    const getAddress = async () => {
      console.log("get Address");
      console.log(id);
      try {
        const header = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(url, {
          headers: header,
        });

        console.log(response.data);
        isMounted && setAddress(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAddress();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
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
