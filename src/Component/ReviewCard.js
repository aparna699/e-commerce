import React from 'react'
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { green, red } from '@mui/material/colors';
import Cookies from 'js-cookie';
import { EditReview } from './EditReview';

export const ReviewCard = (props) => {
    const review = props.review
    const userId = (Cookies.get("userId"))
    
  return (
    <div className='card p-3 mx-5 my-2 '>
        <small className='text-end text-secondary fw-lighter fs-6'>{review.date.substring(0,10)} </small>
        <h6 className='fw-bold p-1'>{review.userId.firstName} {review.userId.lastName}  </h6> 
        <Rating
            name="simple-controlled"
            value={review.rate}
            readOnly
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.55}} />
        }
        style={{"color": "yellow"}}
        />
        <h7 className='fw-bolder p-1'>{review.title}</h7>
        <p className='p-1'>{review.comment}</p>
        {
            ((review.userId.id).toString() === userId)?(
                <EditReview review={review}/>
            ):(
                <div></div>
            )

        }
    </div>
  )
}
