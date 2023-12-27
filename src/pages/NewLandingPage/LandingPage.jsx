import React, { useEffect, useState } from "react";
// import React, {  } from "react-router-dom";
import "../NewLandingPage/LandingPage.css";
import logo from "../../assets/img/logo-choira.svg";
import o4 from "../../assets/img/o4.png";
import { FaBars } from "react-icons/fa6";
import page1footer from "../../assets/img/company-footer.svg";
import stripe from "../../assets/img/stripe.svg";
import phonepay from "../../assets/img/phonepe.svg";
import nbc from "../../assets/img/nbc.svg";
import cbs from "../../assets/img/cbs.svg";
import nasa from "../../assets/img/nasa.svg";
import primeVideo from "../../assets/img/prime-video.svg";
import display from "../../assets/img/landingPageImg/future_of_music.png";
import talented from "../../assets/img/landingPageImg/talented.svg";
import trusted from "../../assets/img/landingPageImg/trusted.png";
import best from "../../assets/img/landingPageImg/best.png";
import produce from "../../assets/img/landingPageImg/Produce.png";
import ai from "../../assets/img/landingPageImg/AI.png";
// import ai from "../../assets/img/landingPageImg/AI.png";;sonu333
import jamming from "../../assets/img/landingPageImg/Jamming.png";
import studio from "../../assets/img/landingPageImg/studio.png";
import line from "../../assets/img/landingPageImg/Line.png";
import marl from "../../assets/img/landingPageImg/marl.png";
import tech from "../../assets/img/landingPageImg/tech.png";
import sine from "../../assets/img/landingPageImg/sine.png";
import insta from "../../assets/img/landingPageImg/insta.png";
import facebook from "../../assets/img/landingPageImg/facebook.svg";
import tweeter from "../../assets/img/landingPageImg/tweter.svg";
import linkedin from "../../assets/img/landingPageImg/linkedin.svg";
import p1 from "../../assets/img/landingPageImg/p1.png";
import p2 from "../../assets/img/landingPageImg/p2.png";
import p3 from "../../assets/img/landingPageImg/p3.png";
import p4 from "../../assets/img/landingPageImg/p4.png";
import p5 from "../../assets/img/landingPageImg/p5.png";
import mobfooter1 from "../../assets/img/landingPageImg/mopfooter1.png";
import mobfooter2 from "../../assets/img/landingPageImg/mopfooter2.png";

import { ImCross } from "react-icons/im";
import { FaChevronRight } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
  const currentYear = new Date().getFullYear();
  const [counter, setCounter] = useState(0);
  const slides = document.querySelectorAll(".slide");
  const slidesData = [
    {
      title: "Choira create",
      subtitle: "Sound like a pro. Create Commercial quality tracks.",
      content:
        "Lorem ipsum dolor sit amet consectetur. Sed id id eget volutpat. Mauris amet leo vulputate massa ultrices velit. Vel sed quam mattis integer consequat. Consectetur odio risus venenatis urna non nulla sed. Ultrices tincidunt magna ut lacus enim ac consequat. Vivamus vel massa elit gravida hendrerit mi posuere velit. Suspendisse risu.",
      image: produce,
    },
    {
      title: "Choira create",
      subtitle: "Record your next Hit. Book Studio instantly.",
      content:
        "Lorem ipsum dolor sit amet consectetur. Sed id id eget volutpat. Mauris amet leo vulputate massa ultrices velit. Vel sed quam mattis integer consequat. Consectetur odio risus venenatis urna non nulla sed. Ultrices tincidunt magna ut lacus enim ac consequat. Vivamus vel massa elit gravida hendrerit mi posuere velit. Suspendisse risu",
      image: studio,
    },
    {
      title: "Choira create",
      subtitle: "Real-time Jam. Remote jam like you’re in the same room.",
      content:
        "Lorem ipsum dolor sit amet consectetur. Sed id id eget volutpat. Mauris amet leo vulputate massa ultrices velit. Vel sed quam mattis integer consequat. Consectetur odio risus venenatis urna non nulla sed. Ultrices tincidunt magna ut lacus enim ac consequat. Vivamus vel massa elit gravida hendrerit mi posuere velit. Suspendisse risu.",
      image: jamming,
    },
    {
      title: "Choira create",
      subtitle: "Turn your words into amazing music with AI music Gen.",
      content:
        "Lorem ipsum dolor sit amet consectetur. Sed id id eget volutpat. Mauris amet leo vulputate massa ultrices velit. Vel sed quam mattis integer consequat. Consectetur odio risus venenatis urna non nulla sed. Ultrices tincidunt magna ut lacus enim ac consequat. Vivamus vel massa elit gravida hendrerit mi posuere velit. Suspendisse risu.",
      image: ai,
    },
  ];

  useEffect(() => {
    const slides = document.querySelectorAll(".slide");
    console.log("Slides:", slides);

    if (slides) {
      slides.forEach((slide, index) => {
        slide.style.left = `${index * 100}%`;
      });
    }

    const intervalId = setInterval(() => {
      setCounter((prevCounter) => {
        const newCounter = prevCounter >= 3 ? 0 : prevCounter + 1;

        slides.forEach((slide) => {
          slide.style.transform = `translateX(-${newCounter * 100}%)`;
        });

        return newCounter;
      });
    }, 8000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const changeSlide = (count) => {
    setCounter(count);

    const slides = document.querySelectorAll(".slide"); // Ensure you have access to slides
    slides.forEach((slide) => {
      slide.style.transform = `translateX(-${count * 100}%)`;
    });
  };
  const [combinedClasses, setCombinedClasses] = useState("list");

  const smallNav = () => {
    // Check if "smalllist" class is present in the current state
    if (combinedClasses.includes("smalllist")) {
      // If present, remove "smalllist"
      setCombinedClasses((prevClasses) =>
        prevClasses.replace(" smalllist", "")
      );
    } else {
      // If not present, add "smalllist"
      setCombinedClasses((prevClasses) => prevClasses + " smalllist");
    }
  };
  const navigate = useNavigate();
  const gotoDashboard = () => {
    navigate("/dashboard");
  };
  const testimonials = [
    {
      name: "Floyd Miles",
      designationAndCity: "Singer, Sydney",
      title: "The best Solution to book a studio!",
      description:
        "“Arcu at dictum sapien, mollis. Vulputate sit id accumsan, ultricies. In ultrices malesuada elit mauris etiam odio. Duis tristique lacus, et blandit viverra nisl velit. Sed mattis rhoncus, diam suspendisse sit nunc, gravida eu. Lectus eget eget ac dolor neque lorem sapien, suspendisse aliquam.”",
      image: p1,
    },
    {
      name: "John Doe",
      designationAndCity: "Designer, New York",
      title: "Fantastic Experience with Choira!",
      description:
        "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum hendrerit turpis at varius tincidunt. Integer gravida, ligula sit amet efficitur sodales, libero nisi ultricies odio, et malesuada mauris turpis id mi.”",
      image: p2,
    },
    {
      name: "Alice Johnson",
      designationAndCity: "Developer, San Francisco",
      title: "Easy-to-use and Effective Platform!",
      description:
        "“Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse ac venenatis turpis. In dictum vestibulum nisl eget volutpat.”",
      image: p3,
    },
    {
      name: "Bob Smith",
      designationAndCity: "Manager, London",
      title: "Incredible Features and User-Friendly!",
      description:
        "“Vestibulum consequat ipsum nec tortor vulputate, nec fringilla turpis hendrerit. Sed in lacus non tortor blandit feugiat ac et elit.”",
      image: p4,
    },
    {
      name: "Eva Davis",
      designationAndCity: "Engineer, Berlin",
      title: "Highly Recommend Choira!",
      description:
        "“Ut tristique, libero id congue fermentum, odio tortor ultricies felis, ut interdum arcu odio vel odio.”",
      image: p5,
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [testimonials.length]);

  const visibleImages = [
    testimonials[(startIndex + 4) % 5],
    testimonials[startIndex % 5],
    testimonials[(startIndex + 1) % 5],
    testimonials[(startIndex + 2) % 5],
    testimonials[(startIndex + 3) % 5],
  ];

  const visibleTestimonial = visibleImages[1];

  const [sidebarVisible, setSidebarVisible] = useState(false);
  return (
    <>
      <div id="landing-page1">
        <div className="navbar">
          <div>
            <img src={logo} alt="Choira Logo" style={{ cursor: "pointer" }} />
          </div>
          <div className={combinedClasses}>
            <h3>Home</h3>
            <h3>Studio</h3>
            <h3>Jamming</h3>
            <h3 onClick={gotoDashboard}>AI Music Gen</h3>
            <h3>Signin</h3>

            <img
              className="o4"
              style={{ cursor: "pointer" }}
              src={o4}
              alt=""
              onClick={smallNav}
            />
          </div>
        </div>
        {/* mobile navbar start here------------------- */}
        <div className="mobile-navbar">
          <div>
            <img src={logo} alt="Choira Logo" style={{ cursor: "pointer" }} />
          </div>
          <div>
            <FaBars
              onClick={() => {
                setSidebarVisible((prevState) => !prevState); // Toggle the state
              }}
            />
          </div>
        </div>

        {/* mobile navbar end here------------------- */}

        {/* sidebar-----------=-- */}
        <div className={`lpSidebar ${sidebarVisible ? "lpSidebar-after" : ""}`}>
          {/* <div className="lpSidebar lpSidebar-after"> */}
          <div>
            <img src={logo} alt="Choira Logo" style={{ cursor: "pointer" }} />
            <ImCross
              onClick={() => {
                setSidebarVisible((prevState) => !prevState); // Toggle the state
              }}
            />
          </div>
          <div>
            <div>Home</div>
            <div>Studio</div>
            <div>Jamming</div>
            <div onClick={gotoDashboard}>AI Music Gen</div>
            <div>Signin</div>
          </div>
        </div>
        {/* sidebar end -------------------------- */}

        <div className="page1-main">
          <div>
            <div className="page1-main-content">
              <div>
                <h1>
                  <span>Music</span> Ecosystem <br />
                  for the <span>Digital</span> Age
                </h1>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur. <br /> Metus diam eget
                  mollis eget in dignissim nibh. <br /> In nibh lectus enim eu
                  adipiscing eget pulvinar.
                </p>
              </div>
              <div>
                <button>Get Started</button>
                <p style={{ cursor: "pointer" }}>
                  watch video <FaChevronRight />
                </p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div className="page1-footer">
          <div></div> {/* shadow effect div */}
          <div>
            <div>
              <img src={stripe} alt="" />
            </div>
            <div>
              <img src={phonepay} alt="" />
            </div>
            <div>
              <img src={nbc} alt="" />
            </div>
            <div>
              <img src={cbs} alt="" />
            </div>
            <div>
              <img src={nasa} alt="" />
            </div>
            <div>
              <img src={primeVideo} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="mob-page1-footer">
        <div></div> {/* shadow effect div */}
        <div>
          <div>
            <div>
              <img src={stripe} alt="" />
            </div>
            <div>
              <img src={phonepay} alt="" />
            </div>
          </div>

          <div>
            <div>
              <img src={nbc} alt="" />
            </div>
            <div>
              <img src={cbs} alt="" />
            </div>
          </div>
          <div>
            <div>
              <img src={nasa} alt="" />
            </div>
            <div>
              <img src={primeVideo} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="landing-page-2">
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className={`landing-page-2-main slide ${
              index === counter ? "active" : ""
            }`}
          >
            <div className={index % 2 === 1 ? "rowReverse" : ""}>
              <div>
                <div className="landing-page-2-content">
                  <div>
                    <span>{slide.title}</span>
                  </div>
                  <div>
                    <p>{slide.subtitle}</p>
                  </div>
                  <div>
                    <p>{slide.content}</p>
                  </div>
                  <div>
                    <button>create</button>
                  </div>
                </div>
              </div>
              <div className="landing-page-2-img">
                <img src={slide.image} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="landing-page2-bullets">
        {slidesData.map((_, i) => (
          <div
            style={{
              backgroundColor: i === counter ? "#FFC701" : "",
            }}
            className="slider-btn"
            key={i}
            onClick={() => changeSlide(i)}
          ></div>
        ))}
      </div>

      <div className="landing-page-3">
        <div className="landing-page-3-main">
          <div>
            <h2>The Future of Music</h2>
          </div>

          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur. Interdum augue nam vitae
              mi tempor ut. Posuere nunc adipiscing fermentum br in. Sem
              ullamcorper venenatis ut metus.
            </p>
          </div>
          <div>
            <img src={display} alt="" />
          </div>
          <div>
            <button>open</button>
          </div>
        </div>
      </div>
      {/* mobile version  */}
      <div className="mob-landing-page-4-main">
        <div>
          <div>
            <div>
              <img src={talented} alt="" />
            </div>
            <div>
              <h3>Top talents</h3>
              <br />
            </div>
          </div>
          <div>
            Work with award winning talents across the globe, we deliver an
            unparalleled combination of timeless expertise, proven results,
            long-term stability and trust.
          </div>
        </div>
        <div>
          <div>
            <div>
              <img src={trusted} alt="" />
            </div>
            <div>
              <h3>Trusted Studio Profiles</h3>
              <br />
            </div>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur. Interdum augue nam vitae
              mi tempor ut. Posuere nunc adipiscing fermentum in. Sem
              ullamcorper venenatis ut metus. Leo tempor pellentesque eu.
            </p>
          </div>
        </div>
        <div>
          <div>
            <div>
              <img src={best} alt="" />
            </div>
            <div>
              <h3>Create the best</h3>
              <br />
            </div>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur. Interdum augue nam vitae
              mi tempor ut. Posuere nunc adipiscing fermentum in. Sem
              ullamcorper venenatis ut metus. Leo tempor pellentesque eu.
            </p>
          </div>
        </div>
      </div>

      {/* pc-version  */}
      <div id="landing-page-4" className="landing-page-4">
        <div className="landing-page-4-main">
          <div>
            <div>
              <div>
                <img src={talented} alt="" />
              </div>
              <div>
                <h3>Top talents</h3>
              </div>
            </div>
            <div>
              Work with award winning talents across the globe, we deliver an
              unparalleled combination of timeless expertise, proven results,
              long-term stability and trust.
            </div>
          </div>
          <div>
            <div>
              <div>
                <img src={trusted} alt="" />
              </div>
              <div>
                <h3>Trusted Studio Profiles</h3>
              </div>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur. Interdum augue nam vitae
                mi tempor ut. Posuere nunc adipiscing fermentum in. Sem
                ullamcorper venenatis ut metus. Leo tempor pellentesque eu.
              </p>
            </div>
          </div>
          <div>
            <div>
              <div>
                <img src={best} alt="" />
              </div>
              <div>
                <h3>Create the best</h3>
              </div>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur. Interdum augue nam vitae
                mi tempor ut. Posuere nunc adipiscing fermentum in. Sem
                ullamcorper venenatis ut metus. Leo tempor pellentesque eu.
              </p>
            </div>
          </div>
        </div>
        <div id="lp4-testinomal" className="lp4-testinomal">
          <div className="lp4-testinomal-main">
            <div>Testimonial</div>
            <div>What our users say about us?</div>
            <div className="person-title">{visibleTestimonial.title}</div>
            <div>
              <p className="person-decription">
                {visibleTestimonial.description}
              </p>
            </div>
            <div>
              <b className="person-name">{visibleTestimonial.name}</b>
              <small className="person-designationAndCity">
                {visibleTestimonial.designationAndCity}
              </small>
            </div>
            <div>
              {visibleImages.map((testimonial, index) => (
                <div key={index} className={index === 1 ? "visible" : "hidden"}>
                  <img
                    src={testimonial.image}
                    alt={`person-${index + 1}`}
                    className="testimonial-image"
                  />
                </div>
              ))}
            </div>
            <div>
              <button>View More</button>
            </div>
          </div>
        </div>
      </div>
      <div className="landing-page-5">
        <div className="lp5-aiMusic">
          <div>Get started</div>
          <div>Start generating royalty free music with Music-AI</div>
          <div>
            No credit card to start. Enjoy up to 50 high quality music per month
            for free.
          </div>
          <div>
            <button>Start generating for free</button>
            <div>
              Contact sales <FaChevronRight />
            </div>
          </div>
        </div>
        <div className="lp5-backed">
          <div>
            <div>
              &nbsp; Backed By
              <img src={line} alt="" />
            </div>
          </div>
          <div>
            <div>
              <img src={marl} alt="" />
            </div>
            <div>
              <img src={tech} alt="" />
            </div>
            <div>
              <img src={sine} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="landing-page-6">
        <div className="lp6-main">
          <div>
            <div>
              <div>
                <img src={logo} alt="" />
              </div>
              <div>
                Choira is an online ecosystem to <br /> empower you with online
                tools to jam, <br /> produce and explore music.
              </div>
              <div>
                <a
                  href="https://www.instagram.com/choiramusic/"
                  target="_blank"
                >
                  <img src={insta} alt="" />
                </a>
                <a
                  href="https://www.facebook.com/Choira-107074321806949"
                  target="_blank"
                >
                  <img src={facebook} alt="" />
                </a>
                <a href="https://twitter.com/choiramusic" target="_blank">
                  <img src={tweeter} alt="" />
                </a>
                <a
                  href="https://www.linkedin.com/company/choira"
                  target="_blank"
                >
                  <img src={linkedin} alt="" />
                </a>
              </div>
            </div>
            <div>
              <div>
                <h4>Products</h4>
              </div>
              <div>Create</div>
              <div>Studio</div>
              <div>Jam</div>
              <div>Music-AI</div>
            </div>
            <div>
              <div>
                <h4>Company</h4>
              </div>
              <div>
                {" "}
                <a href="#/about">About us</a>
              </div>
              <div>Blog</div>
              <div>
                <a href="https://studio.choira.io/#choira_team">Our team</a>
              </div>
              <div>
                <a href="#lp4-testinomal">Customer stories</a>
              </div>
              <div>Contact us</div>
            </div>
            <div>
              <div>
                <h4>Support</h4>
              </div>
              <div>Help & Support</div>
              <div>
                <a href="#/TermsandCondition">Terms & Conditions</a>
              </div>
              <div>
                <a href="#/Privacypolicy">Privacy Policy</a>
              </div>
              <div>
                <a href="#/refundPolicy">Refund Policy</a>
              </div>
              <div>
                <a href="#/Disclaimer">Disclaimer</a>
              </div>
            </div>
            <div>
              <div>
                Stay connected to us
                <input type="text" placeholder="Your email address" />
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid gray" }}>
            © {currentYear} Choira.io All rights reserved
          </div>
        </div>

        {/* footer for mobile  */}
      </div>
      <div className="mob-lp6-main">
        <div>
          <div>
            <div>
              <div>
                <img src={logo} alt="" />
              </div>
              <div>
                Choira is an online ecosystem to empower you <br /> with online
                tools to jam, produce and explore <br /> music.
              </div>
              <div className="mob-lp6-social">
                <a
                  href="https://www.instagram.com/choiramusic/"
                  target="_blank"
                >
                  <img src={insta} alt="" />
                </a>
                <a
                  href="https://www.facebook.com/Choira-107074321806949"
                  target="_blank"
                >
                  <img src={facebook} alt="" />
                </a>
                <a href="https://twitter.com/choiramusic" target="_blank">
                  <img src={tweeter} alt="" />
                </a>
                <a
                  href="https://www.linkedin.com/company/choira"
                  target="_blank"
                >
                  <img src={linkedin} alt="" />
                </a>
              </div>
            </div>

            <div>
              <div>
                Stay connected to us
                <input type="text" placeholder="Your email address" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h4>Products</h4>
              </div>
              <div>Create</div>
              <div>Studio</div>
              <div>Jam</div>
              <div>Music-AI</div>
            </div>
            <div>
              <div>
                <h4>Company</h4>
              </div>
              <div>
                <a href="#/about">About us</a>
              </div>
              <div>Blog</div>
              <div>
                <a href="https://studio.choira.io/#choira_team">Our team</a>
              </div>
              <div>
                <a href="#lp4-testinomal">Customer stories</a>
              </div>
              <div>Contact us</div>
            </div>
          </div>

          <div>
            <div>
              <h4>Support</h4>
            </div>
            <div>Help & Support</div>
            <div>
              <a href="#/TermsandCondition">Terms & Conditions</a>
            </div>
            <div>
              <a href="#/Privacypolicy">Privacy Policy</a>
            </div>
            <div>
              <a href="#/refundPolicy">Refund Policy</a>
            </div>
            <div>
              <a href="#/Disclaimer">Disclaimer</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid gray" }}>
          © {currentYear} Choira.io All rights reserved
        </div>
      </div>
    </>
  );
}

export default LandingPage;
