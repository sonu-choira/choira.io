import React, { useEffect, useState } from "react";
import img1 from "../../assets/img/sliderImg/img1.png";
import img2 from "../../assets/img/sliderImg/img2.png";
import img3 from "../../assets/img/sliderImg/img3.png";
import img4 from "../../assets/img/sliderImg/img4.png";
import img5 from "../../assets/img/sliderImg/img5.png";
import arrow from "../../assets/img/sliderImg/arrow.png";

const swiperData = [
  {
    title: "Tv Serial",
    imgSrc: img1,
    // onClick: () => {
    //   gotoMenu;
    // },
  },
  {
    title: "Bollywood",
    imgSrc: img2,
    onClick: () => console.log("Clicked on img2"),
  },
  {
    title: "Music Company",
    imgSrc: img3,
    onClick: () => console.log("Clicked on img3"),
  },
  {
    title: "Soloist",
    imgSrc: img4,
    onClick: () => console.log("Clicked on img4"),
  },
  {
    title: "Short Film",
    imgSrc: img5,
    onClick: () => console.log("Clicked on img5"),
  },
  {
    title: "Bollywood",
    imgSrc: img2,
    onClick: () => console.log("Clicked on img2 again"),
  },
  {
    title: "Music Company",
    imgSrc: img3,
    onClick: () => console.log("Clicked on img3 again"),
  },
  {
    title: "Soloist",
    imgSrc: img4,
    onClick: () => console.log("Clicked on img4 again"),
  },
  {
    title: "Short Film",
    imgSrc: img5,
    onClick: () => console.log("Clicked on img5 again"),
  },
];

function Slider(props) {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    var swiper = new window.Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 3,
      coverflowEffect: {
        rotate: 15,
        stretch: 75,
        depth: 300,
        modifier: 1,
        slideShadows: true,
      },
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    // const gotoMenu = () => {
    //   props.setMenu(true);
    // };
    // Cleanup Swiper instance on component unmount
    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <>
      <div className="swiper mySwiper">
        <div className="swiper-wrapper">
          {swiperData.map((item, index) => (
            <div className="swiper-slide" key={index}>
              <h3>{item.title}</h3>
              <img src={item.imgSrc} alt="" onClick={item.onClick} />
            </div>
          ))}
        </div>
      </div>
      <div className="swiper-button-next">
        <img src={arrow} alt="" />
      </div>
      <div className="swiper-button-prev">
        <img src={arrow} alt="" />
      </div>
    </>
  );
}

export default Slider;
