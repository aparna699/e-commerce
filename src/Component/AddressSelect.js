import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";

const AddressSelect = () => {
  const [address, setAddress] = useState([]);
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const userId = Cookies.get("userId")

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log(userId)
    const url = `/api/address/user/${userId}`

    const getAddress = async () => {
        console.log("get Address")
        console.log(userId)
        try {
            const header = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",  
            };
            const response = await axios.get(url,{
                headers: header,
            })
            
            console.log(response.data)
            isMounted && setAddress(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    getAddress();

  },[])

  return (
    <div class="px-2">
      <select class="form-select" style={{ width: "200px" }}>
        <option selected>Select Address </option>
        {address.map((key) => {
          return (
            <option value={key.id}>
              Deliver to {key.unit} {key.line1}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default AddressSelect;
