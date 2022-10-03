import React from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";

const Reviews = (review) => {
  const { id } = useParams();
  const [name, setname] = useState("");
  const [data, setdata] = useState([]);
  const [rating, setRating] = useState(0);
  const [message, setmessage] = useState("");
  const [isloading, setisloading] = useState(false);
  const history = useHistory();

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    var review = { name, message, rating };
    setisloading(true);

    fetch("http://localhost:8001/review", {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        console.log("new enquiry sent");
        setisloading(false);
        // history.go(-1);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
    //redirect to home page
    // window.location.href = "/";
  };

  const getreviews = () => {
    // setisloading(true);
    fetch("http://localhost:8001/review", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
        console.log(data);
        setisloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getreviews();

  return (
    <div className="create">
      <h2>How was your experience!🏥</h2>
      <form onSubmit={handlesubmit}>
        <label>
          <h3>NAME</h3>
        </label>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        ></input>

        <label>
          <h3>MESSAGE</h3>
        </label>
        <textarea
          required
          columns="30"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
        ></textarea>
        <div className="rating">
          <Rating
            onClick={handleRating}
            ratingValue={rating} /* Available Props */
          />
        </div>

        {!isloading && <button className="submitBtn">SUBMIT</button>}
        {isloading && <button restricted>Submitting review...</button>}
      </form>
      <div>
        <h2>{name}</h2>
        <p>{message}</p>
        <p> {rating} </p>
      </div>

      <div className="reviews">
        {data.slice(Math.max(data.length - 3, 0)).map((review) => (
          <div className="review" key={review._id}>
            <p className="revname">
              <b className="red">NAME: </b> {review.name}
            </p>
            <p className="revmess">
              <b className="red">MESSAGE: </b> {review.message}
            </p>
            <p className="revrat">
              <b className="red">REVIEW: </b>
              {review.rating}{" "}
            </p>
          </div>
        ))}
      </div>

      <div className="slider">
        <div className="slide">
          <div className="testimonial">
            {data.map((reviews) => (
              <div key={reviews.id}>
                <Link to={`Reviews/${reviews.name}`}></Link>
                <h5 className="testimonial__header">{reviews.name}</h5>
                <p className="testimonial__text">{reviews.message}</p>

                <h6 className="testimonial__name">Rating: {reviews.rating}</h6>
              </div>
            ))}
          </div>
        </div>

        <button className="slider__btn slider__btn--left">&larr;</button>
        <button className="slider__btn slider__btn--right">&rarr;</button>
        <div className="dots"></div>
      </div>
    </div>
  );
};

export default Reviews;
