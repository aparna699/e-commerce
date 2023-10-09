import Cookies from 'js-cookie'
import React from 'react'
import axios from '../../api/axios'
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from '@mui/icons-material/Delete';
import { addressActions } from '../../store/Address/addressSlice';

export const DeleteAddress = (props) => {
    const id = props.id
    const dispatch = useDispatch();
    const addressList = useSelector((state) => state.address);
    
    const deleteAddress = async(e) => {
        e.preventDefault()
        console.log(`Delete ${id}`)
        dispatch(addressActions.deleteAddress(id))
        if(addressList.isSuccess && !addressList.isLoading) {
          window.location.reload(true)
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
