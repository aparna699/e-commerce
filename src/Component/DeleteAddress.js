import Cookies from 'js-cookie'
import React from 'react'
import axios from '../api/axios'

export const DeleteAddress = (props) => {
    const id = props.id
    const token = Cookies.get('token')
    
    const deleteAddress = async(e) => {
        e.preventDefault()
        let isMounted = true
        console.log(`Delete ${id}`)
        try {
            const header = {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            };
            const response = await axios.delete(
                `/api/address/${id}` , {
              headers: header,
              withCredentials: false
            });
            console.log(response);
            isMounted && window.location.reload(true);
            console.log("delete");
          } catch (err) {
            console.log(err);
          }
    }
  return (
    <div>
        <button onClick={deleteAddress} className='btn btn-dark col-sm-12 my-2'>Delete</button>
    </div>
  )
}
