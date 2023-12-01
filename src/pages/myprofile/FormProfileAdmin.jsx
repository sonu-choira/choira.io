import React, { Component } from "react";
import './profile.scss'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { httpUrl, docServerUrl } from '../../restservice'

class FormProjectAdmin extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      localData: {},
      data: [],
      photo: {},
      fields: {},
      setScreenOpen: 0,
      selectedFile: null,
      handleResponse: null,
      imageUrl: null,
      fieldss: {},
      setotppage: 0,
      otpdata: {},
      otp: 1234,
      fieldsss: {},
    };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitpassword = this.submitpassword.bind(this);

  }


  docServer = docServerUrl;
  uppercase = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  opensweetalert(data) {
    Swal.fire({
      title: data,
      type: 'success',

    }).then(function () {
      window.location.reload();
    })
  }

  loadData = () => {
    const page = JSON.parse(localStorage.getItem('userData')).id;
    const endpoint = httpUrl + 'employee/' + page;
    fetch(endpoint)
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: [{ ...json }],
          scrolling: false,
        });
      }).catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Account Inactive',
          text: 'Your account has now been deactivated.',
          showConfirmButton: false,
          timer: 5500
        })
        setTimeout(() => {
          this.logoutUser();
          window.location.href = "/"
        }, 2000);
      }
      );
  };

  handleChange2(e) {
    let fieldsss = this.state.fieldsss;
    fieldsss[e.target.name] = e.target.value;
    this.setState({
      fieldsss
    });

  }
  otpfunction = () => {

    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    console.log(OTP)

    let sendotp = {
      toMobile: '91' + this.state.fieldss.phone,
      message: "Your OTP for verification is: " + OTP + ". Choira"
    }

    axios.post(httpUrl + 'sms/send', sendotp)
      .then(responce => {
        this.setState({
          otpdata: responce.data,
          scrolling: false,
          otp: OTP
        });
        console.log(responce.data)
        this.setState({ setotppage: 3 })
      }).catch(error => {
        console.log(error, "something went wrong")
        this.setState({ setotppage: 1 })
      });

  }
  updatemployee = () => {
    // alert('otp')
    console.log(this.state.otp)
    let idd = JSON.parse(localStorage.getItem('userData')).id;
    let updateemp = {
      id: idd,
      phone: this.state.fieldss.phone
    }
    console.log('otp')
    console.log(this.state.fieldsss.otpnum)
    console.log(this.state.otp)
    if (this.state.fieldsss.otpnum === this.state.otp) {

      axios.post(httpUrl + 'employee/update', updateemp)
        .then(responce => {
          console.log(responce.data)
        });
      Swal.fire({
        icon: "success",
        title: 'Phone Number Updated',
        showConfirmButton: false,
        timer: 1500
      })
      this.setState({ setScreenOpen: 0 });

    }
    else {
      Swal.fire({
        icon: "error",
        title: 'Your OTP Is Incorrect',
        showConfirmButton: false,
        timer: 1500
      })
    }


  }
  backpage() {
    this.setState({ setScreenOpen: 0 })
  }
  handleChange1(e) {
    let fieldss = this.state.fieldss;
    fieldss[e.target.name] = e.target.value;
    this.setState({
      fieldss
    });
    if (this.state.fieldss.phone) {
      this.setState({ setotppage: 1 });
    }
    console.log(this.state)
  }

  updateProfile = () => {
    this.setState({ setScreenOpen: 1 });
  };

  logoutUser() {
    localStorage.clear();
  }

  renderTableHeader() {
    let header = Object.keys(this.state.data[0])
    return header.map((key, index) => {
      return <label key={index} className="labelStyle" >{key.toUpperCase()}</label>
    })
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
          docpath: "Customer/" + this.state.data[0].id + '/' + event.target.files[0].name,
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
    formData.append('name', "Customer/" + this.state.data[0].id);
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

  componentDidMount() {
    this.loadData();
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.City.value === '' && this.state.selectedFile == null) {
      return;
    }
    this.handleUpload();
    localStorage.setItem("photo", JSON.stringify(this.state.photo));
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.data[0].id, phone: this.Phone.value, city: this.City.value,
        photo: this.state.photo
      })
    };

    const endpoint = httpUrl + 'employee/update';
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(json => {
        this.opensweetalert(json.Status);
      });
    this.setState({ setScreenOpen: 0 });
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }

  updatepass = () => {
    this.setState({ setScreenOpen: 2 });
  }

  submitpassword(e) {
    e.preventDefault();

    let fields = {
      oldpassword: "",
      newpassword: "",
      confirmpassword: ""
    }
    console.log(this.state.fields)
    // console.log(fields)

    let id = JSON.parse(localStorage.getItem('userData')).id;
    let loginid = JSON.parse(localStorage.getItem('userData')).login.id
    let passjson = {
      id: id,
      login: {
        id: loginid,
        password: btoa(this.state.fields.newpassword)
      },

    }

    let setpass = JSON.parse(localStorage.getItem('userData')).login.password;
    setpass = atob(setpass)
    if (setpass !== this.state.fields.oldpassword) {

      Swal.fire({
        icon: 'error',
        title: 'Does Not Match old Password',
      })
    }
    else if (setpass === this.state.fields.newpassword) {

      Swal.fire({
        icon: 'error',
        title: 'You Are Using Old Password Add New Password',
      })
    }
    else if (this.state.fields.newpassword !== this.state.fields.confirmpassword) {

      Swal.fire({
        icon: 'error',
        title: 'New Passowrd And Confirm Password Does Not Match',
      })
    }
    else {

      axios.post(httpUrl + 'employee/update', passjson)
        .then(responce => {
          // this.state.fields = fields

          this.setState({
            fields: fields
          })
          console.log(responce.data)
          Swal.fire({
            icon: 'success',
            title: 'Your Password Has Been Changed Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.setState({ setScreenOpen: 0 });
        }).catch(error => {
          console.log(error)

        })
    }






  }




  render() {
    const { imageUrl } = this.state;
    return (
      <div className="clearfix">
        <div className="row animateBox">
          {this.state.data.map(data => (
            <div className="col-md-4 animated fadeIn" key={data.id.value}>
              <div className="card">
                <div className="card-body">
                  <div className="avatar">
                    {
                      data.photo?.docpath !== null ?
                        (
                          <img
                            src={this.docServer + data.photo?.docpath}
                            className="card-img-top"
                            alt=""
                          />
                        ) : (
                          <img
                            src={data.photo.urllink}
                            className="card-img-top"
                            alt=""
                          />
                        )
                    }

                  </div>
                  <ul>
                    <h5 className="card-title">
                      {data.name}
                    </h5>
                  </ul>
                  <ul className="card-text">
                    <span>Location:</span>
                    {data.city}
                  </ul>
                  <ul>
                    <span className="phone">Phone:</span>{data.phone}
                  </ul>
                  <ul>
                    <span className="phone">Email:</span>{data.email}
                  </ul>


                </div>
                <div>
                  {this.state.setScreenOpen === 0 ?

                    <div className="btn_margin">

                      <div className="row">
                        <div style={{ width: "33.33%", float: "left" }} >
                          <a href='/#/home'>
                            <button onClick={e => {
                              this.logoutUser();
                            }}> Log Out </button>
                          </a>
                        </div>
                        <div style={{ width: "33.33%", float: "left", textAlign: "center" }} >

                          <button
                            onClick={() => {
                              this.updatepass();
                            }}
                          >
                            Change Password
                          </button>
                        </div>
                        <div style={{ width: "33.33%", float: "left", textAlign: "right" }} >
                          <button
                            onClick={e => {
                              this.updateProfile();
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                      <div>

                      </div>


                    </div>
                    : null}
                </div>
              </div>


              {this.state.setScreenOpen === 2 ?
                <div className="col-xs-2">
                  <form onSubmit={this.submitpassword}>
                    <div className="card-body">
                      <ul>
                        <label className="label" >Old Password</label><br />
                        <input type="password" required name="oldpassword" className="input" value={this.state.fields.oldpassword} onChange={this.handleChange} />
                      </ul>
                      <ul>
                        <label className="label" >New Password</label><br />
                        <input type="password" required name="newpassword" className="input" value={this.state.fields.newpassword} onChange={this.handleChange} />
                      </ul>
                      <ul>
                        <label className="label" >Confirm Password</label><br />
                        <input type="password" required name="confirmpassword" className="input" value={this.state.fields.confirmpassword} onChange={this.handleChange} /></ul>
                    </div>

                    <div className="btn_margin" style={{ margin: '0px 25px' }}>
                      {this.state.setScreenOpen === 2 ?
                        <button type="Submit" className="btn btn-light btn-block w-50 mx-auto" >
                          Submit
                        </button>
                        : null}
                    </div>
                  </form>
                </div>
                : null}

              {this.state.setScreenOpen === 1 ?
                <div className="col-xs-2">
                  <form onSubmit={this.handleSubmit}>
                    <div className="card-body">
                      <ul>
                        <label className="label" >Phone</label><br />
                        <input type="text" className="input" name="phone" value={this.state.fieldss.phone} onChange={this.handleChange1} ref={(ref) => { this.Phone = ref }} placeholder={data.phone} />
                      </ul>
                      {
                        this.state.setotppage === 1 ?
                          <ul>
                            <button type="submit" className="otpchange" onClick={() => { this.otpfunction() }} >Send OTP</button>
                            <button className="otpchange1" onClick={() => { this.backpage() }} >Cancel</button>
                            <br />
                          </ul>
                          : null}
                      {
                        this.state.setotppage === 3 ?
                          <ul>
                            <input type="number" className="input" name="otpnum" required placeholder="Enter OTP" value={this.state.fieldsss.otpnum} id="otpnum" onChange={this.handleChange2} />
                            <br />
                            <button type="submit" value="Submit" className="otpchange1" onClick={() => { this.updatemployee() }} >Submit</button>
                            <br />
                          </ul>

                          : null}
                      {
                        this.state.setotppage === 0 ?
                          <ul>
                          </ul>
                          : null
                      }
                      <ul>
                        <label className="label" >City</label><br />
                        <input type="text" className="input" ref={(ref) => { this.City = ref }} placeholder={data.city} name="city" /></ul>
                    </div>
                    <div style={{ padding: '15px 20px 0px 20px', textAlign: "center", display: "flex", flexDirection: "row" }}>
                      <span style={{ fontSize: '13px' }}>Select Image:</span>
                      <span style={{ marginBottom: 10 }}>
                        <input style={{ fontSize: '12px', width: 'auto' }} type="file" onChange={this.onChangeFile} />
                      </span>
                      <div className="up-img">
                        {imageUrl &&
                          <img
                            src={imageUrl}
                            className="card-img-bottom"
                            alt=""
                          />
                        }
                      </div>
                    </div>
                    <div className="btn_margin" style={{ margin: '0px 20px' }}>
                      {this.state.setScreenOpen === 1 ?
                        <button type="Submit" className="btn btn-light btn-block w-50 mx-auto" >
                          Submit
                        </button>
                        : null}
                    </div>
                  </form>
                </div>
                : null}
              {/* {this.state.setScreenOpen === 1 ?
                <div className="col-xs-2">
                  <form onSubmit={this.handleSubmit}>
                    <div className="card-body">
                      <ul>
                        <label className="label" >Phone</label><br />
                        <input type="text" className="input" ref={(ref) => { this.Phone = ref }} placeholder={data.phone} name="phone" /></ul>
                      <ul>
                        <label className="label" >City</label><br />
                        <input type="text" className="input" ref={(ref) => { this.City = ref }} placeholder={data.city} name="city" /></ul>
                    </div>
                    <div style={{ padding: '15px 20px 0px 20px', textAlign: "center", display: "flex", flexDirection: "row"}}>
                      <span style={{ fontSize: '13px' }}>Select Image:</span>
                      <span style={{ marginBottom: 10 }}>
                        <input style={{ fontSize: '12px', width: 'auto' }} type="file" onChange={this.onChangeFile} />
                      </span>
                      <div className="up-img">
                        {imageUrl &&
                          <img
                            src={imageUrl}
                            className="card-img-bottom"
                            alt=""
                          />
                        }
                      </div>
                    </div>
                    <div className="btn_margin" style={{ margin: '0px 25px' }}>
                      {this.state.setScreenOpen === 1 ?
                        <button type="Submit" className="btn btn-light btn-block w-50 mx-auto" >
                          Submit
                        </button>
                        : null}
                    </div>
                  </form>
                </div>
                : null} */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FormProjectAdmin;
