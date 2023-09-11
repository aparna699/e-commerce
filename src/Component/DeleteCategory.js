import React from 'react'
import axios from "../api/axios";
import Cookies from "js-cookie";

const DeleteCategory =  (props) => {
    const id = props.id
    const token = Cookies.get("token")

    const deleteCategory = async (e) => {
        e.preventDefault()
        let isMounted = true
        console.log(`Delete ${id}`)
        try {
            const header = {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            };
            const response = await axios.delete(
                `/api/category/${id}` , {
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
    <button onClick={deleteCategory} className='btn btn-outline-dark'>Delete</button>
  )
}

export default DeleteCategory;