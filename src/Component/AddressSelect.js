import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";
import HomeIcon from '@mui/icons-material/Home';

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
    <div class="d-flex py-2" style={{'width': '250px'}}>
      <div class= "px-2" style={{'margin-top':'auto', 'margin-bottom': 'auto'}}>
        <a href="/address">
        <HomeIcon />
        </a>
      </div>
      <select class="form-select me-2">
        <option selected>Select Address </option>
        {address.map((key) => {
          return (
            <option value={key.id}>
              {key.unit} {key.line1}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default AddressSelect;
