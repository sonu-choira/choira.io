import React, { Component } from "react";
import Swal from 'sweetalert2'
import ReactPlayer from "react-player"
import axios from 'axios';
import './project.scss'
import { httpUrl, docServerUrl } from '../../../../restservice'
import sprite from "../../../../assets/icons/sprite.svg";

let managername
let random1
class FormProject extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.state = {
      projects: [],
      url: '',
      data: [],
      linkdata: [],
      photo: {},
      setScreenOpen: 0,
      selectedFile: null,
      handleResponse: null,
      imageUrl: null,
      docServer: docServerUrl,
      updateSelectionAsPhoto: true
    };
  }


  isShowPopup = (status) => {
    this.setState({ showModalPopup: status });
  };

  openSweetAlert(data, subData) {
    Swal.fire({
      icon: 'success',
      title: data,
      text: subData,
      type: 'success',
    }).then(function () {
      window.location.reload();
    })
  }

  openSweetAlertDanger(data) {
    Swal.fire({
      icon: 'warning',
      title: "OOPS! File upload failed",
      text: data,
      type: 'warning',
    }).then(function () {
      window.location.reload();
      // this.setState({ setScreenOpen: 1 });
    })
  }

  // loadData() {
  //   const headers = { 'Content-Type': 'application/json' }
  //   // const id = JSON.parse(localStorage.getItem("userData")).id;
  //   let id = this.props.projectid
  //   // alert(this.props.projectid)
  //   const endpoint = httpUrl + 'project/${id}`;
  //   fetch(endpoint, { headers })
  //     .then(response => response.json())
  //     .then(json => {
  //       this.setState({
  //         projects: json,
  //         linkdata: json.links,
  //       });
  //       console.log(this.state.projects)
  //     });

  // };
  loadData() {
    // alert(this.props.projectid)
    let id = this.props.projectid
    axios.get(httpUrl + 'project/' + id)
      .then(responce => {
        this.setState({
          projects: responce.data,
          linkdata: responce.data.links,
          scrolling: false,

        });
        console.log(responce.data)
        console.log(responce.data.links)
        console.log('linkdata')
        console.log(this.state.linkdata)
      });

  };

  customerdata() {
    let userid = JSON.parse(localStorage.getItem("userData")).id;
    axios.get(httpUrl + 'customer/' + userid)
      .then(responce => {
        this.setState({
          data: responce.data,
          scrolling: false,

        });
        console.log('Response', responce)
        managername = responce.data.managername
        console.log('Response', managername)
      });
  }



  componentDidMount() {
    this.customerdata();
    this.loadData();
  }

  updateProject() {
    this.setState({ setScreenOpen: 1 });
  }

  updateCancel() {
    this.setState({ setScreenOpen: 0 });
  }

  addYoutubeUrl() {
    this.setState({ setScreenOpen: 2 });
  }

  handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: this.state.projects.id, links: [{ link: this.firstName.value }] })
    };

    const endpoint = httpUrl + 'project/link/add';
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(json => {
        this.openSweetAlert("Added Successfully", "Link Added successfully!");
      });
    this.loadData();
    this.setState({ setScreenOpen: 0 });
  }

  deleteProject(id) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      type: 'Warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        const page = this.props.projectid;
        const endpoint = httpUrl + 'project/' + page;
        fetch(endpoint)
          .then(response => response.json())
          .then(json => {
            console.log("AFter delete the project 1st:",json)
            if (json.status === "IN_ACTIVE") {
              this.deleteProjectAPI(id)
            } else {
              Swal.fire({
                icon: 'error',
                title: "OOPS! Your Project Is Active.",
                type: 'error',
              })
            }
          }).catch((e) => {
            Swal.fire({
              icon: 'error',
              title: "OOPS! Currently we are unable to delete your project",
              type: 'error',
            })
          }
          );
      }
    });
  }

  deleteProjectAPI(id) {
    const endpoint = httpUrl + 'project/' + id;
    fetch(endpoint, { method: 'DELETE' })
      .then(response => response.json())
      .then(json => {
        if(json.status === "FAILED"){
          Swal.fire({
            icon: 'error',
            title: "OOPS! Currently we are unable to delete your project",
            type: 'error',
          })
        }else{
          this.openSweetAlert("Project Deleted!", "This Project deleted successfully.");
        }
        
      });
    this.props.goback()
  }

  deleteLink(id) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ container: this.state.projects.id, ids: [id] })
    };

    const endpoint = httpUrl + 'project/link/delete';
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(json => {
        
        this.openSweetAlert("Link Deleted", "This Link deleted successfully!");
      });
  }

  renderTableHeader() {
    return (
      <tr>
        <th style={{ width: '500px' }}>Details</th>
        <th style={{ width: '350px' }}>video/Audio</th>
        <th style={{ width: '200px' }}>action</th>
      </tr>
    )
  }

  renderTableRecommendHeader() {
    return (
      <tr>
        <th style={{ width: '500px' }}>Artist Name</th>
      </tr>
    )
  }

  renderTableDataYoutube() {
    return this.state.linkdata.map((project, index) => {
      const { id, link } = project
      return (
        <tr >
          <td>{link}</td>
          <td className="text-align-center">
            <ReactPlayer controls={true} width='70%' height='100px' className="reactPlayer"
              url={link}>
            </ReactPlayer>
          </td>
          <td className="text-align-center" style={{ width: '200px' }}>
            <button className="my-svg-delete"
              onClick={e => {
                this.deleteLink(id);
              }}
            >
            </button>
          </td>
        </tr>
      )
    })
  }

  renderTableDataRecommend() {
    let arts = ["Abhijay Sharma",
    "Abhinav Arora",
    "Chandan Tridandabani",
    "Elisha Roy",
    "Abhishek Suryanarayan",
    "Leo Soorya",
    "Keyur Patel",
    "Aditya Havnur",
    "Shikar Arora"];    
      // const { id, link } = project

    let randomValue = arts[Math.floor(Math.random() * arts.length)];


      return (
        <>
        <tr >
          {/* <td>{link}</td> */}
          <td className="text-align-center">
            {/* <ReactPlayer controls={true} width='70%' height='100px' className="reactPlayer"
              url={link}>
            </ReactPlayer> */}

          {arts[Math.floor(Math.random() * arts.length)]}
            

          </td>

        
        </tr>
        <tr>
          <td className="text-align-center">

          {randomValue}

          </td>
        </tr>
        </>
      )

  }

  getToTitles(str) {
    if (str) {
      let string;
      if (str !== ' ') {
        string = str.replace(/_/g, ' ');
      } else {
        string = str;
      }
      return this.toTitles(string);
    }
  }

  toTitles(s) { return s.replace(/\w\S*/g, function (t) { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); }); }

  onChangeFile = event => {
    var digits = '0123456789';
    random1 = '';
    for (let i = 0; i < 2; i++) {
      random1 += digits[Math.floor(Math.random() * 2)];
    }
    // console.log(random1)

    this.setState({ selectedFile: event.target.files[0] })
    if (event.target.files[0] !== '') {
      var reader = new FileReader();
      reader.onload = (eve) => {
        this.setState({ imageUrl: eve.target.result });
      }
      reader.readAsDataURL(event.target.files[0]);
      this.setState({
        photo: {
          docname: event.target.files[0].name,
          doctype: 'Audio',
          docpath: "Project/" + this.state.projects.customer + '/' + random1 + '_' + event.target.files[0].name
        }
      })
    }
  }

  handleUpload = () => {
    const BASE_URL = httpUrl + 'common/doc/upload';
    const { selectedFile } = this.state;
    if (!selectedFile) {
      this.setState({
        handleResponse: {
          isSuccess: false,
          message: "Please select audio to upload."
        },
        updateSelectionAsPhoto: false
      });
      return false;
    }

    const formData = new FormData();
    formData.append('doc', selectedFile, random1 + '_' + this.state.selectedFile.name);
    formData.append('name', "Project/" + this.state.projects.customer);
    formData.append('width', '')
    formData.append('height', '')
    axios.post(BASE_URL, formData).then(response => {
      console.log("response--------------")
      console.log(response)
      if (response.status === 200) {
        this.openSweetAlert("Project Updated Successfully", "");
      }
      else {
        this.openSweetAlertDanger("File Not Uploaded!");
      }
      this.setState({
        handleResponse: {
          isSuccess: response.status === 200,
          message: response.data.message
        },
        updateSelectionAsPhoto: true
        // imageUrl: BASE_URL + response.data.file.path
      });
    }).catch(err => {
      this.openSweetAlertDanger("The maximum file size allowed is 25MB!");
    });
  }

  handleUpdateSubmit(event) {
    event.preventDefault();
    this.handleUpload();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.projects.id, details: this.Details.value,
        file: this.state.photo
      })
    };

    const endpoint = httpUrl + 'project/update';
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(json => {
        if (!this.state.updateSelectionAsPhoto) {
          this.openSweetAlert("Project Updated Successfully", "");
        } else {
          console.log("Doc uploaded")
        }
      });
    this.loadData();
    setTimeout(() => {
      this.loadData();
    }, 5000);
    this.setState({ setScreenOpen: 0 });
  }

  renderTableDataProject() {
    return (
      <tr>
        <td>
          <ul><span>Name:</span>{this.state.projects.name}</ul>
          <ul><span>Genre:</span>{this.getToTitles(this.state.projects.genre)}</ul>
          <ul><span>Project Type:</span>{this.getToTitles(this.state.projects.projecttype)}</ul>
          <ul><span>Project Status:</span>{this.getToTitles(this.state.projects.status)}</ul>
          <ul><span>Needs Help With:</span>{this.getToTitles(this.state.projects.faqs)}</ul>
          <ul><span>Price Type:</span>{this.getToTitles(this.state.projects.projectprice)}</ul>
          <ul><span>Payment Status:</span>{this.getToTitles(this.state.projects.paymentstatus)}</ul>
          <ul><span>Manager:</span>{managername}</ul>
          <ul><span>Details:</span><li>{this.state.projects.details}</li></ul>
        </td>
        <td className="text-align-center">
          <audio controls style={{ width: '100%' }}
            preload="auto"
            src={this.state.docServer + this.state.projects.file?.docpath}>
          </audio>
        </td>
        <td className="text-align-center">
          <button className="my-svg-edit"
            onClick={e => {
              this.updateProject();
            }}
          >
          </button>&nbsp;
          <button className="my-svg-delete"
            onClick={e => {
              this.deleteProject(this.props.projectid);
            }}
          >
          </button>
        </td>
      </tr>
    )
  }

  render() {
    const { imageUrl } = this.state;
    return (

      <div className="clearfix">
        <div className="content__heading">
          <h1>
            <svg>
              <use href={sprite + "#icon-folder"}></use>
            </svg>
            {this.state.projects.name}
          </h1>
        </div>
        {this.state.setScreenOpen === 0 ?
          <div className="row">
            <div className="col-md-4 animated fadeIn">
              <div className="card">
                <h3 style={{ display: "flex", justifyContent: "space-between", padding: 10, alignItems: "center" }}>
                  <span style={{ color: "white", float: "left" }}>
                    <label>Project Details</label>
                  </span>
                  <span onClick={() => { this.props.goback() }} style={{ color: "white", float: "right" }}>
                    <button style={{ fontWeight: "600" }}>
                      Back
                    </button>
                  </span>



                </h3>
                <table id='projects'>
                  <tbody>
                    {this.renderTableHeader()}
                    {this.renderTableDataProject()}
                  </tbody>
                </table>
                {/* <table id='projects'>
                  <tbody>
                    {this.renderTableHeader()}
                    {this.renderTableDataProject()}
                  </tbody>
                </table> */}
              </div>
            </div>
          </div>
          : null}

        {this.state.setScreenOpen === 0 ?
          <div className="row">
            <div className="col-md-4 animated fadeIn">
              <div className="card">
                {/* <div className="btn-align-down">
                  <button className="my-svg-add"
                    onClick={e => {
                      this.addYoutubeUrl();
                    }}
                  >
                  </button>
                </div> */}
                
                <div>
                  <h3 className="paddi">Recommended Artists</h3>
                  <table id='projects'>
                    <tbody>
                      {this.renderTableRecommendHeader()}
                      {this.renderTableDataRecommend()}
                    </tbody>
                  </table>
                </div>

                <div>
                <div className="btn-align-down">
                  <button className="my-svg-add"
                    onClick={e => {
                      this.addYoutubeUrl();
                    }}
                  >
                  </button>
                </div>
                  <h3 className="paddi">Reference Links</h3>
                  <table id='projects'>
                    <tbody>
                      {this.renderTableHeader()}
                      {this.renderTableDataYoutube()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          :
          this.state.setScreenOpen === 1 ?
            <div className="row">
              <div className="card-body">
                <div className="card">
                  <div className="paddi"><h3>Project Edit</h3></div>
                  <hr />
                  <form onSubmit={this.handleUpdateSubmit}>
                    <ul>
                      <label className="label" >Details: </label><br />
                      <textarea ref={(ref) => { this.Details = ref }} type="text" className="sampleTextarea" name="details" /></ul>

                    <div style={{ padding: '10px 20px 0px 20px' }}>
                      <span style={{ float: 'left' }}>Select Audio File:</span>
                      <span style={{ marginBottom: 10 }}>
                        <input type="file" onChange={this.onChangeFile} />
                      </span>
                      <div className="up-img">
                        {imageUrl &&
                          <audio controls
                            autoplay preload="auto"
                            src={imageUrl}>
                          </audio>
                        }
                      </div>
                    </div>

                    <div className="btn-margin">
                      <button className="btn-primary btn-small">
                        Submit
                      </button>
                      <button className="btn-primary btn-small"
                        onClick={e => {
                          this.updateCancel();
                        }}
                      >Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            :
            this.state.setScreenOpen === 2 ?
              <div className="col-xs-2">
                <div className="card-body">
                  <div className="card">
                    <form onSubmit={this.handleSubmit}>
                      <div className="paddi" style={{ textAlign: "left" }}><h3>Add Reference Link</h3></div>
                      <hr />
                      <ul style={{ paddingTop: 30 }}>
                        <label className="label" >Reference Link: </label>
                        <input type="text" ref={(ref) => { this.firstName = ref }} placeholder="Enter Youtube Url" name="url" className="inputs" /></ul>

                      <div className="btn-margin">
                        <button type="Submit" className="btn-primary btn-small"
                        >
                          Submit
                        </button>
                        <button className="btn-primary btn-small"
                          onClick={e => {
                            this.updateCancel();
                          }}
                        >Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              : null
        }

      </div>
    );

  }
}

export default FormProject;
