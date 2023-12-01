import axios from 'axios';
import React from 'react';
import './addemployee.scss';
import Swal from 'sweetalert2';
import { httpUrl } from '../../../restservice'

let custid = 0;
class Addemployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            photo: {},
            selectedFile: null,
            handleResponse: null,
            imageUrl: null,
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
                    docpath: "Employee/" + event.target.files[0].name,
                    urllink: ''
                }
            });
        }
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
            designation: "Manager",
            email: this.state.fields.email,
            city: this.state.fields.city,
            status: 'ACTIVE',
            login: {
                email: this.state.fields.email,
                password: this.state.fields.password,
                type: "ARTIST_MANAGER",
                signuptype: "EMAIL",
            }


        }
        projectdata.login.email = projectdata.email
        projectdata.login.password = btoa(projectdata.login.password)

        axios.post(httpUrl + 'employee', projectdata)
            .then(responce => {
                // this.state.fields = fields
                this.setState({
                    fields: fields

                })
                custid = responce.data.id
                console.log('idd')
                console.log(custid)
                this.handleUpload(custid)
                console.log(responce.data)
                Swal.fire({
                    icon: 'success',
                    title: 'Submitted',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.props.goBack()
            }).catch(error => {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: "Duplicate Employee",
                });
            })



    }


    handleUpload = (custid) => {
        console.log('custid')
        console.log(custid)
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
        formData.append('name', "Employee/" + custid);
        formData.append('width', '400')
        formData.append('height', '400')
        axios.post(BASE_URL, formData).then(response => {
            this.updateEmployee(custid)
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

    updateEmployee(empId) {
        let updateAbleData = {
            id: empId,
            photo: {
                docname: this.state.selectedFile.name,
                doctype: 'Profile',
                docpath: "Employee/" + empId + "/" + this.state.selectedFile.name,
                urllink: ''
            }
        }

        axios.post(httpUrl + 'employee/update', updateAbleData)
            .then(responce => {
                // this.state.fields = fields 
                Swal.fire({
                    icon: 'success',
                    title: 'Submitted',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.props.goBack()

                console.log(responce.data)
            }).catch(error => {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: "Duplicate User",
                });


            })
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
                                    <span style={{ float: "left" }}>Add Artist Manager</span></h3>

                            </div>


                            <div className="panel-body">
                                <div className="table-responsive table-style">
                                    <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >
                                        <div className="row">
                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <p style={{ textAlign: "left", marginBottom: "8px" }}>Name</p>
                                                    <input type="text" name="name" className='textstyle' required value={this.state.fields.name} onChange={this.handleChange} />
                                                </div>
                                                <div style={{ marginTop: "8px" }}>
                                                    <p style={{ textAlign: "left", marginBottom: "8px" }}>Phone</p>
                                                    <input type="number" className='textstyle' required name="phone" value={this.state.fields.phone} onChange={this.handleChange} />
                                                </div>

                                            </div >
                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <p style={{ textAlign: "left", marginBottom: "8px" }}>City</p>
                                                    <input type="text" className='textstyle' required name="city" value={this.state.fields.city} onChange={this.handleChange} />
                                                </div>
                                                {/* <div style={{ marginTop: "8px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>Designation</label>
                                                    <input type="text" name="designation" value={this.state.fields.designation} onChange={this.handleChange} />
                                                </div> */}
                                            </div>
                                        </div>
                                        {/* <h3>Login Details</h3> */}
                                        <div className="row">
                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <p style={{ textAlign: "left", marginBottom: "8px" }}>Email</p>
                                                    <input type="text" className='textstyle' required name="email" value={this.state.fields.Email} onChange={this.handleChange} />
                                                </div>

                                            </div >
                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <p style={{ textAlign: "left", marginBottom: "8px" }}>Password</p>
                                                    <input type="password" className='textstyle' required name="password" value={this.state.fields.password} onChange={this.handleChange} />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}> <span>Select Image:</span></label>
                                                    <input type="file" className='textstyle' required required onChange={this.onChangeFile} />
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
                                                        Submit
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


export default Addemployee;
