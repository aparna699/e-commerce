import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";
import HomeIcon from '@mui/icons-material/Home';

const AddressSelect = () => {
  const [address, setAddress] = useState([]);
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const userId = Cookies.get("userId")
  const [selected, setSelected] = useState()
  

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
    return () => {
      isMounted = false;
      controller.abort();
    };
  },[])

  // useEffect(() => {
  //   console.log("addressId", selected)
  //   Cookies.set('addressId', selected,{expires: 1/48})
  // },[selected])

  const changeSelector = (event) =>
    setSelected(event.target.value)
    console.log("addressId", selected)
    Cookies.set('addressId', selected,{expires: 1/48})

  return (
    <div class="d-flex py-2" style={{'width': '250px'}}>
      <select value= {selected}  
        onChange={(event) => changeSelector(event)}
        class="form-select me-2">
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
