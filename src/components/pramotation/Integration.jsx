import React from "react";
import style from "../../pages/admin/studios/studio.module.css";
import { FaCode } from "react-icons/fa6";
import Button from "../../pages/admin/layout/Button";
import { FaMeta } from "react-icons/fa6";
import { SiGoogletagmanager } from "react-icons/si";

function Integration() {
  let data = [
    {
      icon: <FaCode />,
      name: "Metatags",
      btnName: "Add",
    },
    {
      icon: <FaMeta />,
      name: "Facebook Meta Pixel",
      btnName: "Add",
    },
    {
      icon: <SiGoogletagmanager />,
      name: "Google Tags",
      btnName: "Add",
    },
  ];
  return (
    <div className={style.IntegrationPage}>
      <div>Integrations:</div>
      <div>
        {data.map((data, index) => (
          <div className={style.integrationMain} key={index}>
            <span>
              {data.icon} &nbsp; {data.name}
            </span>

            <Button name={data.btnName} style={{ height: "40%" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Integration;
