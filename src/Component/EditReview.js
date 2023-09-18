import React, { useState } from 'react'
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import axios from '../api/axios';

export const EditReview = (props) => {
  const review = props.review
  const [title, setTitle] = useState();
  const [comment, setComment] = useState();
  const [rate, setRate] = useState();

  const edit = async (e) => {
    e.preventDefault();
    let isMounted = true;
    console.log(review.id,"edit Review")
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const reviewDate = `${year}${"-"}${month < 10 ? `0${month}` : `${month}`}${"-"}${
      date < 10 ? `0${date}` : `${date}`
    }`;

    const data = {
      rate: rate,
      title: title,
      comment: comment,
      date: reviewDate
    }

    const header = {
      "Content-Type": "application/json",
    }

    try {
      const response = await axios.put(
          `/api/review/${review.id}`, 
          data, { headers: header });
      console.log(response);
      console.log("Edit Review");
      isMounted && window.location.reload(true);
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div>
      <button
        type="button"
        class="btn btn-dark btn-sm"
        data-bs-toggle="modal"
        data-bs-target={`#Review${review.id}`}
      >
        Edit
      </button>

      <div
        class="modal fade"
        id={`Review${review.id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Review</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <form onSubmit={edit}>
                <Rating
                  name="simple-controlled"
                  value={rate}
                  defaultValue={review.rate}
                  onChange={(e) => setRate(e.target.value)}
                  precision={0.5}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                />
                <input
                  className="col-sm-12 opacity-60 p-2 my-2"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Title"
                  defaultValue={review.title}
                />
                <textarea
                  className="col-sm-12 opacity-60 p-2 my-2"
                  type="text"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  placeholder="Comment"
                  defaultValue={review.comment}
                />
                
                <div class="modal-footer">
                  <button
                    type="submit"
                    class="btn btn-dark"
                    data-bs-dismiss="modal"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
