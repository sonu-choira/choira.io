import React, { useEffect, useState } from "react";
import "./testimonial-carousel.scss";
import Testimonial from "../testimonial/Testimonial";
import LargeQuoteIcon from "../../assets/large-quotetion.png";


export default function TestimonialCarousel() {
  const [currentCarousel, setCurrentCarousel] = useState(1);

  useEffect(() => {
    const carouselChangingIntervar = setInterval(() => {
      if (currentCarousel < 3) {
        setCurrentCarousel((c) => c + 1);
      } else {
        setCurrentCarousel(1);
      }
    }, 1000 * 10);
    return () => clearInterval(carouselChangingIntervar);
  });

  return (
    <div className="testimonial-carousel-container">
      <div
        className="content carousel-item"
        style={{ display: currentCarousel === 1 ? "flex" : "none" }}
      >
        <div className="left">
          <div className="header">
            <img className="quote-icon" src={LargeQuoteIcon} alt="" />
            <h2 className="title">Try believing</h2>
            <p>
              See what people are saying about our unique and effective process.
            </p>
          </div>

          <Testimonial
            comment="Choira’s remote music production methodology helped me finish the music for my web series in the middle of the pandemic with diversified artists all over the world completely online!"
            name="Nayan Pachori"
            details="Film Director, Mumbai"
            photoURL="images/Nayan.png"
          />
        </div>
        <div className="right">
          <Testimonial
            comment="It was great partnering with Choira to produce a song for my feature film in just 5 days!"
            name="Kundan Sad"
            details="Film Director, Mumbai"
            photoURL="images/Kundan.png"
          />
          <Testimonial
            comment="Choira’s strong backend music production team delivered exciting projects to us with our roster of artists situated all around India via seamless remote collaborations."
            name="Bombay Music Co."
            details="Record Label, Mumbai"
            photoURL="images/Bombay.jpg"
          />
        </div>
      </div>
      <div
        className="content carousel-item"
        style={{ display: currentCarousel === 2 ? "flex" : "none" }}
      >
        <div className="left">
          <div className="header">
            <img className="quote-icon" src={LargeQuoteIcon} alt="" />
            <h2 className="title">Try believing</h2>
            <p>
              See what people are saying about our unique and effective process.
            </p>
          </div>
          <Testimonial
            comment="Choira’s remote music production methodology helped me finish the music for my web series in the middle of the pandemic with diversified artists all over the world completely online!"
            name="Nayan Pachori"
            details="Film Director, Mumbai"
            photoURL="images/Nayan.png" style={{borderRadius: '50px'}}
          />
        </div>
        <div className="right">
          <Testimonial
            comment="It was great partnering with Choira to produce a song for my feature film in just 5 days!"
            name="Kundan Sad"
            details="Film Director, Mumbai"
            photoURL="images/Kundan.png"
          />
          <Testimonial
            comment="Choira’s strong backend music production team delivered exciting projects to us with our roster of artists situated all around India via seamless remote collaborations."
            name="Bombay Music Co."
            details="Record Label, Mumbai"
            photoURL="images/Bombay.jpg"
          />
        </div>
      </div>
      <div
        className="content carousel-item"
        style={{ display: currentCarousel === 3 ? "flex" : "none" }}
      >
        <div className="left">
          <div className="header">
            <img className="quote-icon" src={LargeQuoteIcon} alt="" />
            <h2 className="title">Try believing</h2>
            <p>
              See what people are saying about our unique and effective process.
            </p>
          </div>
          <Testimonial
            comment="Choira’s remote music production methodology helped me finish the music for my web series in the middle of the pandemic with diversified artists all over the world completely online!"
            name="Nayan Pachori"
            details="Film Director, Mumbai"
            photoURL="images/Nayan.png"
          />
        </div>
        <div className="right">
          <Testimonial
            comment="It was great partnering with Choira to produce a song for my feature film in just 5 days!"
            name="Kundan Sad"
            details="Film Director, Mumbai"
            photoURL="images/Kundan.png"
          />
          <Testimonial
            comment="Choira’s strong backend music production team delivered exciting projects to us with our roster of artists situated all around India via seamless remote collaborations."
            name="Bombay Music Co."
            details="Record Label, Mumbai"
            photoURL="images/Bombay.jpg"
          />
        </div>
      </div>

      {/* <div className="indicators">
        <span
          className={`indicator ${currentCarousel === 1 ? "active" : null}`}
          onClick={() => setCurrentCarousel(1)}
        ></span>
        <span
          className={`indicator ${currentCarousel === 2 ? "active" : null}`}
          onClick={() => setCurrentCarousel(2)}
        ></span>
        <span
          className={`indicator ${currentCarousel === 3 ? "active" : null}`}
          onClick={() => setCurrentCarousel(3)}
        ></span>
      </div> */}
    </div>
  );
}
