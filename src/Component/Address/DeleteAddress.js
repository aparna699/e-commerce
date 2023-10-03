import Cookies from 'js-cookie'
import React from 'react'
import axios from '../../api/axios'

import DeleteIcon from '@mui/icons-material/Delete';

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
    <div className="d-flex justify-content-end">
        <button onClick={deleteAddress} className='btn border-0 my-2'>
          <DeleteIcon />
        </button>
    </div>
  )
}
