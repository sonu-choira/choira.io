import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import ct1 from "../../assets/img/chooseType-img/ct1.png";
import ct2 from "../../assets/img/chooseType-img/ct2.jpeg";
import ct3 from "../../assets/img/chooseType-img/ct3.png";
import ct4 from "../../assets/img/chooseType-img/ct4.jpeg";
import ct5 from "../../assets/img/chooseType-img/ct5.jpeg";
import ct6 from "../../assets/img/chooseType-img/ct6.jpeg";
import ct7 from "../../assets/img/chooseType-img/ct7.jpeg";

const cardData = [
  {
    image: ct1,
    title: "ORIGINAL SONG",
    description:
      "An original song is a unique and original piece of music written, composed, and performed by the songwriter to express their personal experiences, emotions, or ideas, and can be commercially released.",
  },
  {
    image: ct2,
    title: "COVER SONG",
    description:
      "A cover song is a new artist's interpretation of a previously released song, using their own interpretation and style, and can be commercially released as a tribute or to introduce a new audience to a classic.",
  },
  {
    image: ct3,
    title: "RAP SONG",
    description:
      "Rap is a music genre with spoken lyrics and a beat, featuring themes related to urban life, social issues, and personal struggles. It has various sub-genres known for their dynamic beats and cultural impact.",
  },
  {
    image: ct4,
    title: "BGM/INSTRUMENTAL",
    description:
      "Background music / instrumental music is used to enhance a scene or activity, composed of melodies without vocals. It's found in various media, creating a relaxing or stimulating mood and evoking emotions.",
  },
  {
    image: ct5,
    title: "AD JINGLE",
    description:
      "An ad jingle is a catchy tune or phrase used in advertising to promote a product. It's memorable and recognizable, used in various types of media to create brand recognition and increase consumer loyalty.",
  },
  {
    image: ct6,
    title: "MICROCONTENT/REEL",
    description:
      "Microcontent/reel songs are short musical compositions less than a minute long for social media, featuring catchy hooks and upbeat rhythms, created by indie artists and popular on platforms like Instagram, TikTok.",
  },
  {
    image: ct7,
    title: "MIX-MASTER",
    description:
      "A mix-master edits and blends recorded music or soundtracks, using specialized equipment and software to achieve a polished sound. They collaborate with artists and producers in various music genres and media.",
  },
];

export default function ChooseType({ onNext }) {
  const handleContinue = () => {
    // Perform any necessary actions in this component
    // ...

    // Call the callback to trigger navigation to the next component
    onNext();
  };
  return (
    <>
      <div className="project-div2">
        <div>
          <h2>Choose Type</h2>
        </div>
        <div className="choose-type-div">
          {cardData
            .reduce((rows, card, index) => {
              if (index % 4 === 0) {
                rows.push([]);
              }
              rows[rows.length - 1].push(card);
              return rows;
            }, [])
            .map((row, rowIndex) => (
              <div className="choose-type-div-card" key={rowIndex}>
                {row.map((card, cardIndex) => (
                  <div key={cardIndex}>
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
          <button onClick={handleContinue}>
            Continue <FaAngleRight />
          </button>
        </div>
      </div>
    </>
  );
}
