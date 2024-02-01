import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import cg1 from "../../assets/img/chooseType-img/cg1.jpeg";
import cg2 from "../../assets/img/chooseType-img/cg1.jpeg";
import cg3 from "../../assets/img/chooseType-img/cg3.jpeg";
import cg4 from "../../assets/img/chooseType-img/cg4.jpeg";
import cg5 from "../../assets/img/chooseType-img/cg5.jpeg";
import cg6 from "../../assets/img/chooseType-img/cg6.jpeg";
import cg7 from "../../assets/img/chooseType-img/cg1.jpeg";

const cardData = [
  {
    image: cg1,
    title: "HIPHOP",
    description:
      "Hip-hop is genre that emerged in the Bronx in 1970s with rapping. DJing,breakdancing, and graffiti. It has dynamic beats, socially conscious lyrics, and notable sub-genres like gangsta rap, conscious rap, and trap-",
  },
  {
    image: cg2,
    title: "BOLLYWOOD/POP",
    description:
      "Bollywood[pop is a fusion genre of traditbnal Indian music with modern pop and Western-style production, commonly heard in Bollywood fibn:s with catchy melodies, upbeat rhythms, and Jove-centered lyrics,",
  },
  {
    image: cg3,
    title: "SUFI/FOLK",
    description:
      "Sufi/folk blends traditional folk music and Sufi poetry with regional language lyrics about love and spirituaUty. It uses instruments like the harmonium. and tablar and has a rich history in South Asia.",
  },
  {
    image: cg4,
    title: "INDIE POP",
    description:
      "Background music / instrumental music is used to enhance a scene or activity, composed of melodies without vocals. It's found in various media, creating a relaxing or stimulating mood and evoking emotions.",
  },
  {
    image: cg5,
    title: "EXPERIMENTAL/NEW AGE",
    description:
      "An ad jingle is a catchy tune or phrase used in advertising to promote a product. It's memorable and recognizable, used in various types of media to create brand recognition and increase consumer loyalty.",
  },
  {
    image: cg6,
    title: "DANCE/EDM",
    description:
      "Microcontent/reel songs are short musical compositions less than a minute long for social media, featuring catchy hooks and upbeat rhythms, created by indie artists and popular on platforms like Instagram, TikTok.",
  },
];

export default function ChooseGenre({
  onNext,
  setUserProjectData,
  onBack,
  selectedCardGenre,
  setSelectedCardGenre,
}) {
  const handleCardClick = (card) => {
    setSelectedCardGenre(card);
  };
  const handleContinue = () => {
    if (selectedCardGenre) {
      // Show alert with the selected card's name
      // alert(`Selected Card: ${selectedCardGenre.title}`);
      setUserProjectData((prevData) => ({
        ...prevData,
        GenreOfMusic: selectedCardGenre.title,
      }));

      onNext();
    } else {
      alert("Please choose type of music before continuing.");
    }
  };
  const handelBack = () => {
    onBack();
  };
  return (
    <>
      <div className="project-div2">
        <div>
          <h2>Choose Genre</h2>
        </div>
        <div className="choose-type-div">
          {cardData
            .reduce((rows, card, index) => {
              if (window.innerWidth >= 768 && index % 4 === 0) {
                rows.push([]);
              } else if (window.innerWidth < 768 && index % 2 === 0) {
                rows.push([]);
              }
              rows[rows.length - 1].push(card);
              return rows;
            }, [])
            .map((row, rowIndex) => (
              <div className="choose-type-div-card" key={rowIndex}>
                {row.map((card, cardIndex) => (
                  <div
                    key={cardIndex}
                    style={{
                      border:
                        selectedCardGenre &&
                        selectedCardGenre.title === card.title
                          ? "2px solid #FFC701"
                          : "none",
                    }}
                    id={`card-${card.title}`}
                    onClick={() => handleCardClick(card)}
                  >
                    <div style={{ backgroundImage: `url(${card.image})` }}>
                      <div className="card-overlay">
                        <p>{card.description}</p>
                      </div>
                    </div>
                    <h3>{card.title}</h3>
                  </div>
                ))}
              </div>
            ))}
        </div>

        <div className="project-div2-btn">
          <button onClick={handelBack}>
            <FaAngleLeft /> Back
          </button>
          <button onClick={handleContinue}>
            Continue <FaAngleRight />
          </button>
        </div>
      </div>
    </>
  );
}
