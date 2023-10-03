import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Cookies from "js-cookie";
import axios from '../../api/axios'

export const WriteReview = (props) => {
  const id = props.id;
  const userId = Cookies.get("userId");
  const [rate, setRate] = useState();
  const [title, setTitle] = useState();
  const [comment, setComment] = useState();

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const reviewDate = `${year}${"-"}${month < 10 ? `0${month}` : `${month}`}${"-"}${
    date < 10 ? `0${date}` : `${date}`
  }`;

  const addReview = async(e) => {
    e.preventDefault()

    const data = {
        userId: userId,
        itemId: id,
        rate: rate,
        title: title,
        comment: comment,
        date: reviewDate
    }
    console.log(data)
    const header = {
        "Content-Type": "application/json",
      }
      try {
        const response = await axios.post(
            "/api/review", 
            data, { headers: header });
        console.log(response);
        console.log("Add Review");
        window.location.reload(true)
      } catch (err) {
        console.log(err);
      }
  }

  return (
    <div>
      <div className="accordion my-2">
        <h5 class="accordion-header fw-bold'" id="headingOne">
          <button
            class="accordion-button"
            style={{ border: "1px solid", borderRadius: "10px" }}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#writeReview"
            aria-expanded="true"
            aria-controls="shippingAddress"
          >
            Write Review
          </button>
        </h5>
        <div className="collapse my-2 px-10" id="writeReview">
          <div className="my-2 mx-5">
            <form action="">
              <div className="row ">
                <Rating
                  name="simple-controlled "
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  precision={0.5}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                  style= {{"padding": "0px"}}
                />
                {/* {console.log(rate)} */}
                <input
                  className="my-2 p-2 rounded border-1"
                  type="text"
                  placeholder="Write Title ..."
                  value= {title}
                  onChange= {(e) => setTitle(e.target.value)}
                  style={{ 
                        "--bs-border-opacity": ".5"}}
                />
                <textarea
                  className="my-2 p-2 rounded  border-1"
                  type="text"
                  placeholder="Write Review ..."
                  value= {comment}
                  onChange = {(e) => setComment(e.target.value)}
                  style={{ "--bs-border-opacity": ".5" }}
                />
                <button type="submit" onClick={addReview} className="btn btn-dark my-2"> Submit </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
