import axios from 'axios';
import React from 'react';
// import React, { useState } from "react";
import './addemployee.scss';
import Swal from 'sweetalert2';
import { httpUrl, docServerUrl } from '../../../restservice'

let photo
let statuschange;
class Editemp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            photo: {},
            selectedFile: null,
            handleResponse: null,
            imageUrl: null,
            docServer: docServerUrl,
            data: [],
            empStatus: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.updatedata = this.updatedata.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this)


    };

    // loadData = () => {
    //     let userid=this.props.empid
    //     const endpoint = httpUrl + 'employee/${userid}`;
    //     fetch(endpoint)
    //       .then(response => response.json())
    //       .then(json => {
    //         this.setState({
    //           data: [{ ...json }],
    //           scrolling: false,
    //         });
    //       });
    //   };



    componentDidMount() {
        this.initfun();
    }

    initfun = () => {
        let userid = this.props.empid
        const url = httpUrl + 'employee/' + userid;
        axios.get(url)
            .then(responce => {
                this.setState({
                    data: responce.data,
                    scrolling: false,
                    empStatus: responce.data.status
                });
                statuschange = responce.data.status;

                console.log('status', responce.data.status);

            });
    }



    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
        console.log(this.state)
    }

    handleStatusChange(e) {
        let value = e.target.value;
        this.setState({
            empStatus: value
        })
        this.state.fields.status = value
    }



    updatedata(e) {
        e.preventDefault();

        let fields = {
            name: "",
            phone: "",
            email: "",
            city: "",
            status: "",
            password: ""
        }

        console.log("this.state.fields")
        console.log(this.state.fields)


        let projectdata = {
            id: this.props.empid,
            name: this.state.fields.name,
            phone: this.state.fields.phone,
            designation: "Manager",
            email: this.state.fields.email,
            city: this.state.fields.city,
            status: this.state.fields.status,
            photo: {}

        }
        projectdata.photo = this.state.photo
        axios.post(httpUrl + 'employee/update', projectdata)
            .then(responce => {
                // this.state.fields = fields
                this.setState({
                    fields: fields
                })
                this.handleUpload()
                console.log(responce.data)
            });
        Swal.fire({
            icon: 'success',
            title: 'Updated',
            showConfirmButton: false,
            timer: 1500
        })
        this.props.goBack()


    }


    onChangeFile = event => {
        this.setState({ selectedFile: event.target.files[0] })

        if (event.target.files[0] !== '') {
            // this.file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = (eve) => {
                this.setState({ imageUrl: eve.target.result });
            }
            reader.readAsDataURL(event.target.files[0]);
            this.setState({
                photo: {
                    docname: event.target.files[0].name,
                    doctype: 'Profile',
                    docpath: "Employee/" + this.props.empid + '/' + event.target.files[0].name,
                    urllink: ''
                }
            });
        }
    }
    handleUpload = () => {
        const BASE_URL = httpUrl + 'common/doc/upload';
        const { selectedFile } = this.state;
        if (!selectedFile) {
            this.setState({
                handleResponse: {
                    isSuccess: false,
                    message: "Please select image to upload."
                }
            });
            return false;
        }

        const formData = new FormData();
        formData.append('doc', selectedFile, this.state.selectedFile.name);
        formData.append('name', "Employee/" + this.props.empid);
        formData.append('width', '400')
        formData.append('height', '400')
        axios.post(BASE_URL, formData).then(response => {
            this.setState({
                handleResponse: {
                    isSuccess: response.status === 200,
                    message: response.data.message
                },
                // imageUrl: BASE_URL + response.data.file.path
            });
        }).catch(err => {
            alert(err.message);
        });
    }


    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Please enter your username.";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["name"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter your email-ID.";
        }

        if (typeof fields["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["emailid"])) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email-ID.";
            }
        }

        if (!fields["phone"]) {
            formIsValid = false;
            errors["phone"] = "*Please enter your mobile no.";
        }

        if (typeof fields["phone"] !== "undefined") {
            if (!fields["phone"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["phone"] = "*Please enter valid mobile no.";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["password"] = "*Please enter secure and strong password.";
            }
        }

        this.setState({
            errors: errors
        });
        return formIsValid;


    }



    render() {
        const { imageUrl } = this.state;
        return (
            <div className="card">
                <div className="card-body ">
                    <div className="col-md-12 col-sm-12 col-xs-12 text-capitalize">
                        <div className="panel panel-default cart-border">

                            <div className="panel-heading panel-style">


                                <h3 style={{ color: "#ffc701" }} >
                                    <span style={{ float: "left" }}>Edit Artist Manager</span>
                                </h3>

                            </div>


                            <div className="panel-body">
                                <div className="table-responsive table-style">
                                    <form method="post" name="userRegistrationForm" onSubmit={this.updatedata} >
                                        <div className="row">
                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>Name</label>
                                                    <input type="text" className='textstyle' name="name" id="name" defaultValue={this.state.data.name} onChange={this.handleChange} />
                                                </div>
                                                <div style={{ marginTop: "8px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>Phone</label>
                                                    <input type="number" className='textstyle' id="phone" name="phone" defaultValue={this.state.data.phone} onChange={this.handleChange} />
                                                </div>

                                            </div >
                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>City</label>
                                                    <input type="text" className='textstyle' name="city" id="city" defaultValue={this.state.data.city} onChange={this.handleChange} />
                                                </div>
                                                <div style={{ marginTop: "8px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>Email</label>
                                                    <input type="text" className='textstyle' name="email" id="email" readOnly value={this.state.data.email} onChange={this.handleChange} />
                                                </div>
                                            </div>
                                            <div className="column" >
                                                <div style={{ marginTop: "-41px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>Status</label>
                                                    <select name='status' value={this.state.empStatus} onChange={this.handleStatusChange} id="status" style={{ borderRadius: "10px", padding: "8px", width: "100%" }} >
                                                        {/* <option value="0">select</option> */}
                                                        <option value="ACTIVE">ACTIVE</option>
                                                        <option value="IN_ACTIVE">INACTIVE</option>
                                                    </select>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="row">

                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>Photo</label>
                                                    <img style={{ height: "200px", width: "200px" }}
                                                        src={this.state.docServer + this.state.data.photo?.docpath}
                                                        className="card-img-top"

                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}> <span>Select Image:</span></label>
                                                    <input type="file" onChange={this.onChangeFile} />
                                                </div>

                                            </div >

                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <img style={{ height: "185px", width: "175px" }}
                                                        src={imageUrl}
                                                        className="card-img-top"

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="column" >
                                                <div style={{ marginTop: "8px", float: "left" }}>
                                                    <button type="submit" className='btn-primary' style={{ color: "White" }}>
                                                        Update
                                                    </button>
                                                </div>

                                            </div >
                                            <div className="column" >
                                                <div style={{ marginTop: "8px", float: "right" }}>
                                                    <button type="cancel" onClick={() => { this.props.goBack() }} className='btn-primary' style={{ color: "White" }}>
                                                        Cancel
                                                    </button>
                                                </div>

                                            </div >


                                        </div>

                                    </form>

                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>

        );
    }


}


export default Editemp;
