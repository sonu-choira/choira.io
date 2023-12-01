import axios from "axios";
import React, { useEffect, useState } from "react";
// import "./adetails.scss";
import { httpUrl, docServerUrl } from '../../../restservice'

export default function Adetails(props) {
    const { empid, goBack } = props
    const [data, setData] = useState({});
    const docServer = docServerUrl;

    useEffect(() => {
        const url = httpUrl + 'employee/' + empid;
        axios.get(url)
            .then(responce => {
                setData(responce.data)
                console.log(responce.data)
            });
    }, [empid])

    return (
        <div className="card">
            <div className="card-body ">
                <div className="col-md-12 col-sm-12 col-xs-12 text-capitalize">
                    <div className="panel panel-default cart-border">
                        <div className="panel-heading panel-style">
                            <h3 style={{ color: "#ffc701" }}>
                                <span style={{ float: "left" }}>Artist Details</span>
                                <span onClick={() => { goBack() }} style={{ color: "white", float: "right" }}>
                                    <button>
                                        Back
                                    </button>
                                </span>



                            </h3>


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
                                {
                                    data.login ?
                                        (
                                            <div className="grid-item">
                                                Signup Type: <label>{data.login.signuptype}</label>
                                            </div>
                                        )
                                        : null
                                }
                                <div className="grid-item">
                                    Status: <label>{data.status}</label>
                                </div>
                            </div>

                            <div className="grid-container">
                                {
                                    data.photo ?
                                        (
                                            <div className="grid-item">
                                                <img style={{ height: "100px", width: "100px" }} src={docServer + data.photo?.docpath} />
                                            </div>
                                        )
                                        : null
                                }
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </div>



    )
}
