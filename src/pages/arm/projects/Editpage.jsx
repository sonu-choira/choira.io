import React, { Component } from "react";
import Swal from 'sweetalert2'
import ReactPlayer from "react-player"
import axios from 'axios';
import './project.scss'
import { httpUrl, docServerUrl } from '../../../restservice'

let cname;
let lengthdefine
let random1
class Editpage extends Component {

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
      custdata: [],
      setScreenOpen: 0,
      selectedFile: null,
      handleResponse: null,
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
    }).then(() => {
      // window.location.reload();
      this.loadData();
    })
  }

  opensweetalertdanger(data) {
    Swal.fire({
      icon: 'warning',
      title: "OOPS! File upload failed",
      text: data,
      type: 'warning',
    }).then(function () {
      // window.location.reload();
      // this.setState({ setScreenOpen: 1 });
    })
  }

  loadData() {
    const headers = { 'Content-Type': 'application/json' }
    let receivedid = this.props.projectId
    const endpoint = httpUrl + 'project/' + receivedid;
    fetch(endpoint, { headers })
      .then(response => response.json())
      .then(json => {
        this.setState({
          projects: [json],
          linkdata: [...json.links],
        });
      });

  };

  customerid() {
    axios.get(httpUrl + 'customer/' + this.props.username)
      .then(responce => {
        this.state.custdata = responce.data
        cname = responce.data.name
        console.log(responce.data)
      });
  }

  componentDidMount() {
    this.loadData();
    this.customerid();
    // this.updateTable();
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
      body: JSON.stringify({ id: this.state.projects[0].id, links: [{ link: this.firstName.value }] })
    };

    const endpoint = httpUrl + 'project/link/add';
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(json => {
        this.opensweetalert(json.Status);
        this.loadData();
      });
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
        const endpoint = httpUrl + 'project/' + id;
        fetch(endpoint, { method: 'DELETE' })
          .then(response => response.json())
          .then(json => {
            this.opensweetalert(json.Status);
          });
        this.loadData();
        setTimeout(() => {
          this.loadData();
        }, 1000);
        this.setState({ setScreenOpen: 0 });
      }
    });
  }

  deleteLink(id) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ container: this.state.projects[0].id, ids: [id] })
    };

    const endpoint = httpUrl + 'project/link/delete';
    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(json => {
        this.opensweetalert(json.Status);
      });
    this.loadData();
    setTimeout(() => {
      this.loadData();
    }, 1000);
    this.setState({ setScreenOpen: 0 });
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
            <ReactPlayer controls={true} width='300px' height='100px'
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

  getToTitles(str) {
    let string = str.replace(/_/g, ' ');
    return this.toTitles(string);;
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
          docpath: "Project/" + this.state.projects[0].customer + '/' + random1 + '_' + event.target.files[0].name
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
    formData.append('name', "Project/" + this.state.projects[0].customer);
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
        id: this.state.projects[0].id, details: this.Details.value,
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
    }, 1000);
    this.setState({ setScreenOpen: 0 });
  }

  renderTableDataProject() {
    return this.state.projects.map((project, index) => {
      const { id, name, projecttype, details, faqs, file, managername, projectprice, paymentstatus, genre } = project
      return (
        <tr>
          <td>
            <ul><span>Name:</span>{name}</ul>
            <ul><span>Customer Name:</span>{cname}</ul>
            <ul><span>Genre:</span>{this.getToTitles(genre)}</ul>
            <ul><span>Project Type:</span>{this.getToTitles(projecttype)}</ul>
            <ul><span>Needs Help With:</span>{this.getToTitles(faqs)}</ul>
            <ul><span>Price Type:</span>{this.getToTitles(projectprice)}</ul>
            <ul><span>Payment Status:</span>{this.getToTitles(paymentstatus)}</ul>
            <ul><span>Manager:</span>{managername}</ul>
            <ul><span>Details:</span><li>{this.getToTitles(details)}</li></ul>
          </td>
          <td className="text-align-center">
            <audio controls
              preload="auto"
              src={this.state.docServer + file?.docpath}>
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
                this.deleteProject(id);
              }}
            >
            </button>
          </td>
        </tr>
      )
    })
  }

  render() {
    const { imageUrl } = this.state;
    return (
      <div className="clearfix">
        {this.state.setScreenOpen === 0 ?
          <div className="row">
            {this.state.projects.map(data => (
              <div className="col-md-4 animated fadeIn" key={data.id.value}>
                <div className="card">

                  <div className="btn-align-down">
                    <button className="btn-small"
                      onClick={() => { this.props.Back() }} style={{ color: "white" }}
                    >Back
                    </button>
                  </div>

                  <h3 className="paddi">Project Details</h3>

                  <table id='projects'>
                    <tbody>
                      {this.renderTableHeader()}
                      {this.renderTableDataProject()}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          : null}

        {this.state.setScreenOpen === 0 ?
          <div className="row">
            {this.state.projects.map(data => (
              <div className="col-md-4 animated fadeIn">
                <div className="card">
                  <div className="btn-align-down">
                    {/* <button className="my-svg-add"
                      onClick={e => {
                        this.addYoutubeUrl();
                      }}
                    >
                    </button> */}
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
            ))}
          </div>
          :
          this.state.setScreenOpen === 1 ?
            <div className="row">
              {this.state.projects.map(data => (
                <div className="card-body">
                  <div className="card">
                    <div className="paddi"><h3>Project Edit</h3></div>
                    <hr />
                    <form onSubmit={this.handleUpdateSubmit}>
                      <ul>
                        <label className="label" >Details: </label><br />
                        <textarea ref={(ref) => { this.Details = ref }} type="text" name="details" /></ul>

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
                        <button className="btn-primary btn-small" style={{ padding: '5px 20px' }}>
                          Submit
                        </button>
                        <button className="btn-primary btn-small" style={{ padding: '5px 20px' }}
                          onClick={e => {
                            this.updateCancel();
                          }}
                        >Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ))}
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
                        <button type="Submit" className="btn-primary btn-small" style={{ padding: '5px 20px' }}
                        >
                          Submit
                        </button>
                        <button className="btn-primary btn-small" style={{ padding: '5px 20px' }}
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

export default Editpage;
