import React, { Component } from "react";
import Swal from 'sweetalert2'
import ReactPlayer from "react-player"
import axios from 'axios';
import '../../dashboard/produce/project/project.scss'
import { httpUrl, docServerUrl } from '../../../restservice'

let lengthdefine
let random1
class DetailsFormProject extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.state = {
      projects: [],
      url: '',
      data: [],
      custdata: [],
      linkdata: [],
      photo: {},
      setScreenOpen: 0,
      selectedFile: null,
      handleResponse: null,
      imageUrl: null,
      cname: '',
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
    const endpoint = httpUrl + 'project/' + this.props.selectProject;
    fetch(endpoint, { headers })
      .then(response => response.json())
      .then(json => {
        if (json.links) {
          this.setState({
            projects: json,
            linkdata: [...json.links],
          });
        } else {
          this.setState({
            projects: json
          });
        }

      });

  };

  customerid() {
    axios.get(httpUrl + 'customer/' + this.props.username)
      .then(responce => {
        this.state.custdata = responce.data
        this.state.cname = responce.data.name
        console.log(this.state.cname)
        console.log(responce.data)
      });
  }
  componentDidMount() {
    this.loadData();
    this.customerid();
    // this.updateTable()
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
        this.opensweetalert(json.Status);
      });
    this.loadData();
    this.setState({ setScreenOpen: 0 });
  }

  deleteProject(id) {
    const endpoint = httpUrl + 'project/' + id;
    fetch(endpoint, { method: 'DELETE' })
      .then(response => response.json())
      .then(json => {
        this.opensweetalert(json.Status);
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
            <ReactPlayer controls={true} width='300px' height='100px'
              url={link}>
            </ReactPlayer>
          </td>

        </tr>
      )
    })
  }

  getToTitles(str) {
    if (str !== undefined) {
      let string = str.replace(/_/g, ' ');
      return this.toTitles(string);;
    }
    else {
      return ""
    }

  }

  toTitles(s) { return s.replace(/\w\S*/g, function (t) { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); }); }

  // updateTable = () => {
  //   axios.get(httpUrl +  'project?customer=' + this.props.username)
  //       .then(responce => {
  //         lengthdefine = responce.data.length
  //         console.log(responce.data)
  //         console.log(lengthdefine)
  //       });
  // }

  onChangeFile = event => {
    var digits = '0123456789';
    random1 = '';
    for (let i = 0; i < 2; i++) {
      random1 += digits[Math.floor(Math.random() * 2)];
    }
    console.log(random1)
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
    formData.append('doc', selectedFile, random1 + '_' + this.state.selectedFile.name);
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


  render() {
    const { imageUrl } = this.state;
    return (
      <div className="clearfix">
        {this.state.setScreenOpen === 0 ?
          <div className="row">
            <div className="col-md-4 animated fadeIn" key={this.state.projects.id}>
              <div className="card">
                <h3 style={{ display: "flex", justifyContent: "space-between", padding: 20 }}>
                  <span>Project Details</span>
                  <span onClick={() => { this.props.Back() }} style={{ color: "white" }}>
                    <button>
                      Back
                    </button>
                  </span>

                </h3>
                <table id='projects'>
                  <tbody>
                    {this.renderTableHeader()}
                    <tr>
                      <td>
                        <ul><span>Name:</span>{this.state.projects.name}</ul>
                        <ul><span>Customer Name:</span>{this.state.cname}</ul>
                        <ul><span>Genre:</span>{this.getToTitles(this.state.projects.genre)}</ul>
                        <ul><span>Project Type:</span>{this.getToTitles(this.state.projects.projecttype)}</ul>
                        <ul><span>Needs Help With:</span>{this.getToTitles(this.state.projects.faqs)}</ul>
                        <ul><span>Price Type:</span>{this.getToTitles(this.state.projects.projectprice)}</ul>
                        <ul><span>Payment Status:</span>{this.getToTitles(this.state.projects.paymentstatus)}</ul>
                        {/* <ul><span>Manager:</span>{managername}</ul> */}
                        <ul><span>Details:</span><li>{this.getToTitles(this.state.projects.details)}</li></ul>
                      </td>
                      <td className="text-align-center">
                        <audio controls
                          preload="auto"
                          src={this.state.docServer + this.state.projects.file?.docpath}>
                        </audio>
                      </td>

                    </tr>
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
                  <div className="paddi"><h3>Project Update</h3></div>
                  <hr />
                  <form onSubmit={this.handleUpdateSubmit}>
                    <ul>
                      <label className="label" >Details: </label><br />
                      <textarea ref={(ref) => { this.Details = ref }} type="text" className="sampleTextarea" name="details" /></ul>

                    <div style={{ padding: '10px 20px 0px 20px' }}>
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
                      <div className="paddi"><h3>Add Reference Link</h3></div>
                      <hr />
                      <ul>
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

export default DetailsFormProject;
