import React from "react";

import c1 from "../../assets/img/content-img/c1.png";
import c2 from "../../assets/img/content-img/c2.png";
import c3 from "../../assets/img/content-img/c3.png";
import c4 from "../../assets/img/content-img/c4.png";
import c5 from "../../assets/img/content-img/c5.png";
import c6 from "../../assets/img/content-img/c6.png";
import c7 from "../../assets/img/content-img/c7.png";

const contentData = [
  { imageSrc: c1, title: "Muskurane ki wajah tum ho OST" },
  { imageSrc: c2, title: "Muskurane ki wajah tum ho OST" },
  { imageSrc: c3, title: "Muskurane ki wajah tum ho OST" },
  { imageSrc: c4, title: "Muskurane ki wajah tum ho OST" },
  { imageSrc: c5, title: "Muskurane ki wajah tum ho OST" },
  { imageSrc: c6, title: "Muskurane ki wajah tum ho OST" },
  { imageSrc: c7, title: "Muskurane ki wajah tum ho OST" },
  { imageSrc: c6, title: "Muskurane ki wajah tum ho OST" },
  { imageSrc: c6, title: "Muskurane ki wajah tum ho OST" },
  { imageSrc: c6, title: "Muskurane ki wajah tum ho OST" },
  { imageSrc: c6, title: "Muskurane ki wajah tum ho OST" },
];

const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    console.log("----", array.slice(i, i + chunkSize));
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};
function Menu() {
  const chunkedData = chunkArray(contentData, 4);
  console.log(chunkedData);
  return (
    <>
      <div className="menu">
        <div className="back">
          <h3> {"<"} Back</h3>
        </div>
        <div>
          <div className="content-main">
            <div className="content">
              <div>
                <h3>Tv Serial {">"}</h3>
              </div>

              <div>
                {chunkedData.map((row, rowIndex) => (
                  <div key={rowIndex} className="content-div1">
                    {row.map((item, index) => (
                      <div className="content-img-div" key={index}>
                        <img src={item.imageSrc} alt="" />
                        <div className="content-title">
                          <b>{item.title}</b>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
