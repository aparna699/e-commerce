import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import { ReviewCard } from './ReviewCard';
import Rating from "@mui/material/Rating";
import StarIcon from '@mui/icons-material/Star';
import Cookies from 'js-cookie';
import { WriteReview } from './WriteReview';

export const Review = (props) => {
    const id = props.id
    const userId = Cookies.get("userId")
    const [review, setReview] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const url = `/api/review/item/${id}`

        const getReview = async() => {
            try {
                const header = {
                    "Content-Type": "application/json",  
                };
                const response = await axios.get(
                    url,{
                    headers: header,
                })
                
                console.log(response.data)
                isMounted && setReview(response.data);
            } catch (err) {
                console.log(err)
            }
        }
        getReview()
        return () => {
            isMounted = false;
            controller.abort();
          };
    },[])
  return (
    <div className='p-3'>
        <h5 className='fw-bold'>Customer Reviews</h5>
        
        {
            (review.length != 0)?(
                review.map((key) => {
                    return <ReviewCard review={key}/>
                })
            ):(
                <div>No Reviewes</div>
            )
        }

        {
            (userId === undefined )? (
                <div/>
            ):(
                <WriteReview
                    id={id}
                />
            )
        }
    </div>
  )
}
