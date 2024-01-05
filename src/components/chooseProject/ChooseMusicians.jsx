import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import cm1 from "../../assets/img/chooseType-img/cm1.jpeg";
import cm2 from "../../assets/img/chooseType-img/cm2.jpeg";
import cm3 from "../../assets/img/chooseType-img/cm3.jpeg";
import cm4 from "../../assets/img/chooseType-img/cm4.jpeg";
import cm5 from "../../assets/img/chooseType-img/cm5.jpeg";
import cm6 from "../../assets/img/chooseType-img/cm6.jpeg";
import cm7 from "../../assets/img/chooseType-img/cm1.jpeg";

const cardData = [
  {
    image: cm1,
    title: "MUSIC PRODUCER",
    description:
      "An original song is a unique and original piece of music written, composed, and performed by the songwriter to express their personal experiences, emotions, or ideas, and can be commercially released.",
  },
  {
    image: cm2,
    title: "SINGER",
    description:
      "A cover song is a new artist's interpretation of a previously released song, using their own interpretation and style, and can be commercially released as a tribute or to introduce a new audience to a classic.",
  },
  {
    image: cm3,
    title: "SONGWRITER",
    description:
      "Rap is a music genre with spoken lyrics and a beat, featuring themes related to urban life, social issues, and personal struggles. It has various sub-genres known for their dynamic beats and cultural impact.",
  },
  {
    image: cm4,
    title: "RAPPER",
    description:
      "Background music / instrumental music is used to enhance a scene or activity, composed of melodies without vocals. It's found in various media, creating a relaxing or stimulating mood and evoking emotions.",
  },
  {
    image: cm5,
    title: "MIX-MASTER",
    description:
      "An ad jingle is a catchy tune or phrase used in advertising to promote a product. It's memorable and recognizable, used in various types of media to create brand recognition and increase consumer loyalty.",
  },
  {
    image: cm6,
    title: "FULL PRODUCTION TEAM",
    description:
      "Microcontent/reel songs are short musical compositions less than a minute long for social media, featuring catchy hooks and upbeat rhythms, created by indie artists and popular on platforms like Instagram, TikTok.",
  },
];
// ... (previous imports and code)

export default function ChooseMusicians({ onNext, setUserProjectData }) {
  const [selectedFullProductionTeam, setSelectedFullProductionTeam] =
    useState(false);
  const [selectedMusicians, setSelectedMusicians] = useState([]);

  const handleMusicianClick = (musician) => {
    if (musician.title === "FULL PRODUCTION TEAM") {
      // If FULL PRODUCTION TEAM is selected, select both "FULL PRODUCTION TEAM" and the musician
      setSelectedMusicians([musician]);
      setSelectedFullProductionTeam(true);
    } else if (selectedFullProductionTeam) {
      // If FULL PRODUCTION TEAM is already selected, unselect it and select the new musician
      setSelectedMusicians([musician]);
      setSelectedFullProductionTeam(false);
    } else {
      // If other musicians are selected, unselect FULL PRODUCTION TEAM
      setSelectedMusicians((prevSelected) => {
        if (prevSelected.includes(musician)) {
          return prevSelected.filter(
            (selectedMusician) => selectedMusician !== musician
          );
        } else {
          return [...prevSelected, musician];
        }
      });
    }
  };

  const handleContinue = () => {
    if (selectedMusicians.length === 5) {
      // If all other musicians are selected, automatically select FULL PRODUCTION TEAM
      setSelectedMusicians([]);
      setSelectedFullProductionTeam(true);
    }

    if (selectedFullProductionTeam || selectedMusicians.length > 0) {
      // Show alert with the selected musicians' names
      const selectedMusicianTitles = selectedFullProductionTeam
        ? ["FULL PRODUCTION TEAM"]
        : selectedMusicians.map((musician) => musician.title);

      // alert(`Selected Musicians: ${selectedMusicianTitles.join(", ")}`);

      // You can update your user data or perform other actions as needed
      setUserProjectData((prevData) => ({
        ...prevData,
        MusicianForProject: [
          ...prevData.MusicianForProject,
          selectedMusicianTitles,
        ],
      }));

      onNext();
    } else {
      alert("Please choose at least one musician before continuing.");
    }
  };

  return (
    <>
      <div className="project-div2">
        <div className="project-div2-title-musican">
          <h2>Choose Musician for your project</h2>
          <p>
            (You can select multiple musician based on your selection your
            budget will be calculated)
          </p>
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
                {row.map((musician, musicianIndex) => (
                  <div
                    key={musicianIndex}
                    style={{
                      border:
                        selectedMusicians.includes(musician) ||
                        (selectedFullProductionTeam &&
                          musician.title !== "FULL PRODUCTION TEAM")
                          ? "2px solid #FFC701"
                          : "none",
                    }}
                    id={`musician-${musician.title}`}
                    onClick={() => handleMusicianClick(musician)}
                  >
                    <div style={{ backgroundImage: `url(${musician.image})` }}>
                      <div className="card-overlay">
                        <p>{musician.description}</p>
                      </div>
                    </div>
                    <h3>{musician.title}</h3>
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
