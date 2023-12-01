import React, { useEffect, useState } from "react";
import "./team-carousel.scss";
import CircledRightArrow from "../../assets/circled-right-arrow.svg";

export default function TeamCarousel(props) {
  const [currentCarousel, setCurrentCarousel] = useState(1);

  useEffect(() => {
    const carouselChangingIntervar = setInterval(() => {
      if (currentCarousel < 4) {
        setCurrentCarousel((c) => c + 1);
      } else {
        setCurrentCarousel(1);
      }
    }, 1000 * 10);
    return () => clearInterval(carouselChangingIntervar);
  });

  return (
    <div className="team-carousel-container">
      <div
        className="content carousel-item"
        style={{ display: currentCarousel === 1 ? "flex" : "none" }}
      >
        <div className="left">
          <h2>
            Where you <span className="color-orange">belong</span> to a
            <span className="color-orange"> community</span>
          </h2>
          <div className="body">
            <p>
              a worldwide music community where you and other musicians like you
              can connect, collaborate and create.
            </p>
            <p>
              A place that makes it easy to connect & jam everyday and create
              awesome music more often.
            </p>
          </div>
          <div onClick={() => props.changePage()} className="action color-orange">
            <span>Join Community</span>
            <img src={CircledRightArrow} alt="Circled right arrow" />
          </div>
        </div>
        <div className="right">
          <div
            className="img-container"
            style={{ backgroundImage: "url(images/image-23.png)" }}
          ></div>
          {/* <img src="images/image-23.png" alt="" /> */}
        </div>
      </div>
      <div
        className="content carousel-item"
        style={{ display: currentCarousel === 2 ? "flex" : "none" }}
      >
        <div className="left">
          <h2>
            Where<span className="color-orange"> jamming</span> out
            <span className="color-orange"> is easy & real-time</span>
          </h2>
          <div className="body">
            <p>
              with 5G low-latency voice and video feels like you’re in the same
              room. Record tracks over a jam session, watch friends perform
              their awesome music!
            </p>
          </div>
          <div onClick={() => props.changePage()} className="action color-orange">
            <span>Start Jamming</span>
            <img src={CircledRightArrow} alt="Circled right arrow" />
          </div>
        </div>
        <div className="right">
          <div
            className="img-container bg-contain"
            style={{ backgroundImage: "url(images/female-singer.png)" }}
          ></div>
          {/* <img src="images/female-singer.png" alt="" /> */}
        </div>
      </div>
      <div
        className="content carousel-item"
        style={{ display: currentCarousel === 3 ? "flex" : "none" }}
      >
        <div className="left">
          <h2>
            <span className="color-orange">Create</span> your own Music
            <span className="color-orange"> with choira</span>
          </h2>
          <div className="body">
            <p>
              Stuck in an endless creative block? Work on your song idea with
              our experienced team of producers, songwriters and engineers
              available online.
            </p>
            <p>
              Choose from top music professionals to help you, from across the
              globe.
            </p>
          </div>
          <div onClick={() => props.moveForward()} className="action color-orange">
            <span>Create Project</span>
            <img src={CircledRightArrow} alt="Circled right arrow" />
          </div>
        </div>
        <div className="right">
          <div
            className="img-container"
            style={{ backgroundImage: "url(images/female-editor.png)" }}
          ></div>
          {/* <img src="images/female-editor.png" alt="" /> */}
        </div>
      </div>
      <div
        className="content carousel-item"
        style={{ display: currentCarousel === 4 ? "flex" : "none" }}
      >
        <div className="left">
          <h2>
            Explore the perfect
            <span className="color-orange"> soundtracks</span> for your
            <span className="color-orange"> project</span>
          </h2>
          <div className="body">
            <p>
              Browse music for your film, webseries or advertisement from the
              diverse repository of label-quality music created by -top talents
              at choira.
            </p>
            <p>
              If you like a track, you can get it tailored the way you want.
            </p>
          </div>

          <div onClick={() => props.changePage()} className="action color-orange">
            <span>Browse Soundtracks</span>
            <img src={CircledRightArrow} alt="Circled right arrow" />
          </div>
        </div>
        <div className="right">
          <div
            className="img-container"
            style={{ backgroundImage: "url(images/man-and-mac.png)" }}
          ></div>
          {/* <img src="images/man-and-mac.png" alt="" /> */}
        </div>
      </div>
      <div className="indicators">
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
        <span
          className={`indicator ${currentCarousel === 4 ? "active" : null}`}
          onClick={() => setCurrentCarousel(4)}
        ></span>
      </div>
    </div>
  );
}
