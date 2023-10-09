import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AddressCart } from "../Component/Address/AddressCart";
import { useSelector, useDispatch } from "react-redux";

import { AddAddress } from "../Component/Address/AddAddress";
import { addressActions } from "../store/Address/addressSlice";

const Address = () => {
  const [address, setAddress] = useState([])
  const userId = Cookies.get("userId");
  const addressList = useSelector((state) => state.address);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addressActions.getAllAddress(userId));
  }, []);
  useEffect(() => {
    setAddress(addressList.data);
  }, [addressList]);

  
  return (
    <div className="container">
      <div><strong>Is Loading: </strong>{JSON.stringify(addressList.isLoading)}</div>
      <div><strong>Is Success: </strong>{JSON.stringify(addressList.isSuccess)}</div>
      <div><strong>Error Message: </strong>{JSON.stringify(addressList.errorMessage)}</div>
      <div><strong>Data: </strong>{JSON.stringify(addressList.data)}</div>
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
