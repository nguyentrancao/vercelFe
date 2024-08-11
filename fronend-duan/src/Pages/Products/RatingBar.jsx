import React from "react";
import "./Productbox.css";

const RatingBar = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <i key={i} className="fas fa-star" style={{ color: "orange" }}></i>,
      );
    }
    if (hasHalfStar) {
      stars.push(
        <i
          key={filledStars}
          className="fas fa-star-half-alt"
          style={{ color: "orange" }}
        ></i>,
      );
    }
    return stars;
  };

  return <div className="rating-bar">{renderStars()}</div>;
};

export default RatingBar;
