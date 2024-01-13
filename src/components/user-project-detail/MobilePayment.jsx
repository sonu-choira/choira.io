import React from "react";

import musicfile from "../../assets/musicfile.svg";

const projectsData = [
  {
    title: "Pran",
    date: "15/04/2023",
    categories: ["Original Song", "Music Production"],
  },
  {
    title: "Choira-Test",
    date: "11/04/2023",
    categories: ["Cover Song", "Music Production"],
  },
  {
    title: "Pran",
    date: "12/04/2023",
    categories: ["Original Song", "Full Production Team"],
  },
];

function MobilePayment() {
  return (
    <>
      <div className="mobileDashboard_project_section">
        {projectsData.map((project, index) => (
          <div key={index}>
            <div>
              <div>
                <img src={musicfile} alt="" />
                <div>{project.title}</div>
              </div>
              <div>{project.date}</div>
            </div>
            <div>
              {project.categories.map((category, catIndex) => (
                <li key={catIndex}>{category}</li>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MobilePayment;
