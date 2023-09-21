import Cookies from 'js-cookie';
import React from 'react'
import axios from '../api/axios';

export const DeleteReview = (props) => {
    const id = props.reviewId;
    const token = Cookies.get("token")

    const deleteReview = async (e) => {
        e.preventDefault();

        let isMounted = true
        console.log(`Delete ${id}`)
        try {
            const header = {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            };
            const response = await axios.delete(
                `/api/review/${id}` , {
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
    <button
        className='btn btn-outline-dark'
        onClick={deleteReview}
    >
        Delete
    </button>
  )
}
