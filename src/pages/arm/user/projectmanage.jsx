import React, { Component } from "react";
import Swal from 'sweetalert2'
import ReactPlayer from "react-player"
import axios from 'axios';
import '../../dashboard/produce/project/project.scss'
import folderIcon from "../../../assets/foldershow1.jpg";
import "./project.scss"
import { httpUrl, docServerUrl } from '../../../restservice'

let projectid
let lengthdefine
let random1
class Projectmanage extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.state = {
      projects: {},
      url: '',
      data: [],
      linkdata: [],
      photo: {},
      setScreenOpen: 0,
      setmnanageproject: 1,
      selectedFile: null,
      handleResponse: null,
      getbyidproject: [],
      imageUrl: null,
      docServer: docServerUrl
    };
  }


  isShowPopup = (status) => {
    this.setState({ showModalPopup: status });
  };

  opensweetalert(data) {
    Swal.fire({
      icon: 'success',
      title: data,
      type: 'success',
    }).then(function () {
      window.location.reload();
    })
  }

  opensweetalertdanger(data) {
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

  loadData() {
    const headers = { 'Content-Type': 'application/json' }
    const endpoint = httpUrl + 'project/' + projectid;
    fetch(endpoint, { headers })
      .then(response => response.json())
      .then(json => {
        this.setState({
          projects: json,
          linkdata: [...json.links],
        });

      });

    console.log(this.state.projects)
  };
  backpagescreen(projectidd) {
    projectid = projectidd
    this.loadData()
    this.setState({ setmnanageproject: 2 });
  }


  chnageproject() {
    let id = this.props.userId;
    axios.get(httpUrl + 'project?customer=' + id)
      .then(responce => {
        this.setState({
          getbyidproject: responce.data,
          scrolling: false,

        });

      });

  };
  componentDidMount() {
    this.chnageproject()
    // this.loadData();
    // this.updateTable()
  }

  updateProject() {
    this.setState({ setScreenOpen: 1 });
  }

  backpage() {
    this.setState({ setmnanageproject: 1 })
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
      body: JSON.stringify({ id: this.state.projects[0].id, links: [{ link: this.firstName.value }] })
    };

    const endpoint = httpUrl + 'project/link/add';
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(json => {
        this.opensweetalert(json.Status);
      });
    this.loadData();
    this.setState({ setScreenOpen: 0 });
  }

  deleteProject(id) {

    Swal.fire({
      title: 'Project Is Active !',
      text: 'Are You Sure You Want To Delete Project? You Can Not Recover Data',
      type: 'Warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        const endpoint = httpUrl + 'project/' + id;
        fetch(endpoint, { method: 'DELETE' })
          .then(response => response.json())
          .then(json => {
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
            this.props.goBack();
          });


      }
    });


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
        this.opensweetalert(json.Status);
      });
  }

  renderTableHeader() {
    return (
      <tr>
        <th style={{ width: '550px' }}>Details</th>
        <th style={{ width: '330px' }}>video/Audio</th>
        <th style={{ width: '200px' }}>action</th>
      </tr>
    )
  }

  renderTableDataYoutube() {
    return this.state.linkdata.map((project, index) => {
      const { id, link } = project
      return (
        <tr>
          <td>{link}</td>
          <td className="text-align-center">
            <ReactPlayer controls={true} width='100%' height='100px'
              url={link}>
            </ReactPlayer>
          </td>
          <td className="text-align-center" style={{ width: '200px' }}>
            <button title="Delete Link" className="my-svg-delete"
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
  updateTable = () => {
    axios.get(httpUrl + 'project?customer=' + this.props.userId)
      .then(responce => {
        lengthdefine = responce.data.length
        console.log(responce.data)
        console.log(lengthdefine)
      });
  }

  // randommno = () => {

  //   var digits = '0123456789';
  //    random1 = '';
  //   for (let i = 0; i < 2; i++) {
  //     random1 += digits[Math.floor(Math.random() * 2)];
  //   }
  //   console.log(random1)
  // }
  onChangeFile = event => {
    var digits = '0123456789';
    random1 = '';
    for (let i = 0; i < 2; i++) {
      random1 += digits[Math.floor(Math.random() * 2)];
    }
    console.log(random1)
    // let text = lengthdefine + 1
    this.setState({ selectedFile: event.target.files[0] })
    if (event.target.files[0] !== '') {
      var reader = new FileReader();
      reader.onload = (eve) => {
        this.setState({ imageUrl: eve.target.result });
      }
      reader.readAsDataURL(event.target.files[0]);
      this.setState({
        photo: {
          docname: random1 + '_' + event.target.files[0].name,
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
        }
      });
      return false;
    }

    const formData = new FormData();
    formData.append('doc', selectedFile, this.state.selectedFile.name);
    formData.append('name', "Project/" + this.state.projects.customer);
    formData.append('width', '')
    formData.append('height', '')
    axios.post(BASE_URL, formData).then(response => {
      this.setState({
        handleResponse: {
          isSuccess: response.status === 200,
          message: response.data.message
        },
        // imageUrl: BASE_URL + response.data.file.path
      });
    }).catch(err => {
      this.opensweetalertdanger(err.message);
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
        this.opensweetalert(json.Status);
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
          <ul><span>Customer Name:</span>{this.props.username}</ul>
          <ul><span>Genre:</span>{this.getToTitles(this.state.projects.genre)}</ul>
          <ul><span>Project Type:</span>{this.getToTitles(this.state.projects.projecttype)}</ul>
          <ul><span>Needs Help With:</span>{this.getToTitles(this.state.projects.faqs)}</ul>
          <ul><span>Price Type:</span>{this.getToTitles(this.state.projects.projectprice)}</ul>
          <ul><span>Payment Status:</span>{this.getToTitles(this.state.projects.paymentstatus)}</ul>
          {/* <ul><span>Manager:</span>{managername}</ul> */}
          <ul><span>Details:</span><li>{this.state.projects.details}</li></ul>
        </td>
        <td className="text-align-center">
          <audio controls
            preload="auto" style={{ width: '100%' }}
            src={this.state.docServer + this.state.projects.file?.docpath}>
          </audio>
        </td>
        <td className="text-align-center">
          <button title="Project Update" className="my-svg-edit"
            onClick={e => {
              this.updateProject();
            }}
          >
          </button>&nbsp;
          <button title="Project Delete" className="my-svg-delete"
            onClick={e => {
              this.deleteProject(this.state.projects.id);
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
      <div>
        {this.state.setmnanageproject === 1 ?
          <div>
            <div className="contenttype">
              <h2>
                <span style={{ float: "left" }} >Project List</span>
                <span style={{ float: "right", cursor: "pointer" }} onClick={() => { this.props.goBack() }}>Back</span>
              </h2>
            </div>
            {/* <h2 style={{ textAlign: "right" }} onClick={() => { this.props.goBack() }}>Back</h2> */}
            <div className='trackMainBox'>
              <div className="showMasterFolder">
                {this.state.getbyidproject.map(entry => (
                  <div key={entry.id} style={{ cursor: "pointer" }} className="folderHover" onClick={() => { this.backpagescreen(entry.id) }}>
                    <h4 >
                      <img src={folderIcon} style={{ cursor: "pointer" }} alt="folder" className='iconFolder' />
                    </h4>
                    <label style={{ cursor: "pointer" }}>{entry.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          : null}
        {
          this.state.setmnanageproject === 2 ?
            <div className="clearfix">
              {this.state.setScreenOpen === 0 ?
                <div className="row">
                  <div className="col-md-4 animated fadeIn">
                    <div className="card">
                      <h3 style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
                        <span>Project Details</span>
                        <span onClick={() => { this.backpage() }} style={{ color: "white" }}>
                          <button>
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
                    </div>
                  </div>
                </div>
                : null}

              {this.state.setScreenOpen === 0 ?
                <div className="row">
                  <div className="col-md-4 animated fadeIn">
                    <div className="card">
                      <div className="btn-align-down">
                        <button title="Add You Tube Urls" className="my-svg-add"
                          onClick={e => {
                            this.addYoutubeUrl();
                          }}
                        >
                        </button>
                      </div>
                      <div>
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

                          <div style={{ padding: '10px 20px 0px 20px', textAlign: "left" }}>
                            <span>Select Audio File:</span>
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
                            <button style={{ padding: "1px 25px" }} className="btn-primary btn-small" style={{ height: "37px" }}>
                              <span> Submit</span>
                            </button>
                            <button style={{ padding: "1px 25px" }} className="btn-primary btn-small" style={{ height: "37px" }}
                              onClick={e => {
                                this.updateCancel();
                              }}
                            ><span>Cancel</span>
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
                            <div className="paddi"><h3>Add Reference Link</h3></div>
                            <hr />
                            <ul>
                              <label className="label" >Reference Link: </label>
                              <input type="text" ref={(ref) => { this.firstName = ref }} placeholder="Enter Youtube Url" name="url" className="inputs" /></ul>

                            <div className="btn-margin">
                              <button style={{ padding: "1px 25px" }} type="Submit" className="btn-primary btn-small"
                              >
                                Submit
                              </button>
                              <button style={{ padding: "1px 25px" }} className="btn-primary btn-small"
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
            : null}


      </div>
    );

  }
}

export default Projectmanage;
