import React from "react";
import "./testimonial.scss";
import QuoteIcon from "../../assets/quotation-icon.png";

export default function Testimonial({ comment, photoURL, name, details }) {
  return (
    <div className="testimonial">
      <div className="comment">
        <img className="quote-icon" src={QuoteIcon} alt="" />
        <p dangerouslySetInnerHTML={{ __html: comment }}></p>
      </div>
      <div className="author">
        <div className="left">
          <img src={photoURL} alt="" />
        </div>
        <div className="right">
          <div className="name">{name}</div>
          <div className="details">{details}</div>
        </div>
      </div>
    </div>
  );
}
