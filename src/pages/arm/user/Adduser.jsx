import axios from 'axios';
import React from 'react';
import './adduser.scss';
import Swal from 'sweetalert2';
import { httpUrl } from '../../../restservice'

class Adduser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            photo: {},
            setemployeescreen: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

    }

    submituserRegistrationForm(e) {
        e.preventDefault();

        let fields = {
            name: "",
            phone: "",
            email: "",
            city: "",
            password: ""
        }

        console.log("this.state.fields")
        console.log(this.state.fields)


        let projectdata = {
            name: this.state.fields.name,
            phone: this.state.fields.phone,
            email: this.state.fields.email,
            city: this.state.fields.city,
            login: {
                email: this.state.fields.email,
                password: btoa(this.state.fields.password),
                type: "CUSTOMER",
                signuptype: "EMAIL",
            },
            photo: {   
                "docname": "",
                "docdesc": "employee profile photo",
                "doctype": "PROFILE",
                "urllink": "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }

        }
        projectdata.login.email = projectdata.email
        axios.post(httpUrl +  'customer', projectdata)
            .then(responce => {
                // this.state.fields = fields
                this.setState({
                    fields: fields
                })
                console.log(responce.data)
            });
        Swal.fire({
            icon: 'success',
            title: 'Submitted',
            showConfirmButton: false,
            timer: 1500
        })
        this.props.goBack()


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
        return (

            <div className="card">
                <div className="card-body ">
                    <div className="col-md-12 col-sm-12 col-xs-12 text-capitalize">
                        <div className="panel panel-default cart-border">
                            <div className="panel-heading panel-style">

                                <span>
                                    <h3 style={{ color: "#ffc701" }}>
                                        <span style={{ float: "left" }}>Add User</span></h3>
                                </span>
                            </div>


                            <div className="panel-body">
                                <div className="table-responsive table-style">
                                    <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >
                                        <div className="row">
                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>Name</label>
                                                    <input type="text" name="name" value={this.state.fields.username} onChange={this.handleChange} />
                                                </div>
                                                <div style={{ marginTop: "8px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>Phone</label>
                                                    <input type="number" name="phone" value={this.state.fields.username} onChange={this.handleChange} />
                                                </div>

                                            </div >
                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>City</label>
                                                    <input type="text" name="city" value={this.state.fields.city} onChange={this.handleChange} />
                                                </div>
                                                {/* <div style={{ marginTop: "8px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>Designation</label>
                                                    <input type="text" name="designation" value={this.state.fields.designation} onChange={this.handleChange} />
                                                </div> */}
                                            </div>
                                        </div>
                                        {/* <h3><span >Login Details</span></h3> */}
                                        <div className="row">
                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>Email</label>
                                                    <input type="text" name="email" value={this.state.fields.Email} onChange={this.handleChange} />
                                                </div>

                                            </div >
                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>Password</label>
                                                    <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
                                                </div>
                                            </div>

                                        </div>

                                        {/* <div className="row">
                                            <div className="column" >
                                                <div style={{ padding: '15px 20px 0px 20px', textAlign: "center" }}>
                                                    <span>Select Image:</span>
                                                    <span style={{ marginBottom: 10 }}>
                                                        <input type="file" onChange={this.onChangeFile} />
                                                    </span>
                                                    <div className="up-img">
                                                        {imageUrl &&
                                                            <img
                                                                src={imageUrl}
                                                                className="card-img-top"
                                                                alt=""
                                                            />
                                                        }
                                                    </div>
                                                </div>

                                            </div >


                                        </div> */}

                                        <div className="row">
                                            <div className="column" >
                                                <div style={{ marginTop: "8px", float: "left" }}>
                                                    <button type="submit" className='btn-primary' style={{ color: "White" }}>
                                                        Submit
                                                    </button>
                                                    &nbsp;
                                                    &nbsp;
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


export default Adduser;
