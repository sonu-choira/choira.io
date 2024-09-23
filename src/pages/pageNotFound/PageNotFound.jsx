import React from "react";
import "./pnf.css";
import { useNavigate } from "react-router-dom";
import Button from "../admin/layout/Button";
function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="pnfMain">
      <section className="page404">
        <div>
          <h1>404</h1>
        </div>
        <div className="four_zero_four_bg"></div>
        <div className="contant_box_404">
          <h3 className="h2">Look like you're lost</h3>

          <p>the page you are looking for not avaible!</p>
          <div className="link_404Div">
            <Button
              name={"Login Admin"}
              style={{ height: "80%" }}
              onClick={() => navigate("/signin")}
            />
            <Button
              name={"Login Partner"}
              style={{ height: "80%" }}
              onClick={() => navigate("/partner")}
            />
            {/* <a href="" className="link_404" onClick={() => navigate("/signin")}>
              Login Admin
            </a>
            <a
              href=""
              className="link_404"
              onClick={() => navigate("/partner")}
            >
              Login Partner
            </a> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PageNotFound;
