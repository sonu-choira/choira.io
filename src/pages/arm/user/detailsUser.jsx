import axios from "axios";
import React, { useEffect, useState } from "react";
import "./user.scss";
import { httpUrl } from "../../../restservice";

export default function DetailsUser(props) {
  const { userId, goBack } = props;
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(httpUrl + "customer/" + userId).then((responce) => {
      setData(responce.data);
      console.log(responce.data);
    });
  }, [userId]);

  return (
    <div className="card">
      <div className="card-body ">
        <div className="col-md-12 col-sm-12 col-xs-12 text-capitalize">
          <div className="panel panel-default cart-border">
            <div className="panel-heading panel-style">
              <h3 style={{ color: "#ffc701" }}>
                <span style={{ float: "left" }}>User Details</span>
                <span
                  onClick={() => {
                    goBack();
                  }}
                  style={{ color: "white", float: "right", cursor: "pointer" }}
                >
                  Back
                </span>
              </h3>

              {/* <h1 onClick={() => {goBack()}} >This is details page==={userId}</h1> */}
            </div>

            <div className="panel-body">
              <div style={{ padding: "24px" }}>
                <span style={{ fontSize: "19px", float: "left" }}>
                  Personal Details :
                </span>
              </div>

              <div className="grid-container">
                <div className="grid-item">
                  Name: <label>{data.name}</label>
                </div>

                <div className="grid-item">
                  Email: <label>{data.email}</label>
                </div>

                <div className="grid-item">
                  Phone: <label>{data.phone}</label>
                </div>

                <div className="grid-item">
                  City: <label>{data.city}</label>
                </div>
                {data.login ? (
                  <div className="grid-item">
                    Signup Type: <label>{data.login.signuptype}</label>
                  </div>
                ) : null}
                <div className="grid-item">
                  Assign Manager: <label>{data.managername}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
