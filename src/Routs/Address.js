import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AddressCart } from "../Component/Address/AddressCart";
import { useSelector, useDispatch } from "react-redux";

import { AddAddress } from "../Component/Address/AddAddress";
import { getAddressLsit } from "../store/Address/actions";

const Address = () => {
  const [address, setAddress] = useState([])
  const userId = Cookies.get("userId");
  const addressList = useSelector((state) => state.address);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAddressLsit(userId));
  }, []);
  useEffect(() => {
    setAddress(addressList.data);
  }, [addressList]);

  
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
