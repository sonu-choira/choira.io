import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import './addtrack.scss'
import { httpUrl, docServerUrl } from '../../../restservice'

// let trackid
let uploadedby = JSON.parse(localStorage.getItem("userData")).name;
let rname = Math.random().toString(36).substring(7) + new Date().getTime();
class Edittrack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      photo: {},
      selectedImage: null,
      selectedAudio: null,
      handleResponse: null,
      imageUrl: null,
      track: {},
      data: {},
      projectid: "",
      projectvalue: [],
      imageUrl1: null,
      docServer: docServerUrl,
      tracktypess: "",
      // statustrack:"SUBMITTED"
    }

    this.handleChange = this.handleChange.bind(this);
    this.updatedata = this.updatedata.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handletrackstatus = this.handletrackstatus.bind(this)


  };

  componentDidMount() {
    this.getdata();
    this.getdatabyid();
  }

  getdatabyid = () => {
    let getbyidtrack = this.props.trackId
    axios.get(httpUrl +  'soundTrack/' + getbyidtrack)
      .then(responce => {
        this.setState({
          data: responce.data,
          scrolling: false,
          tracktypess: responce.data.tracktype,
          projectid: responce.data.genre
        });
        // dataid = responce.data[0].id
        console.log(responce.data)
      });
  }

  getdata = () => {
    axios.get(httpUrl +  'genre')
      .then(responce => {
        this.setState({
          projectvalue: responce.data,
          scrolling: false,
        });
        // dataid = responce.data[0].id
        // console.log(dataid)
        console.log(responce.data)
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
      projectid: value
    })
  }
  handletrackstatus(e) {
    let value = e.target.value;
    this.setState({
      tracktypess: value
    })
  }



  onChangeFile1 = event => {
    this.setState({ selectedAudio: event.target.files[0] })
    if (event.target.files[0] !== '') {
      var reader = new FileReader();
      reader.onload = (eve) => {
        this.setState({ imageUrl1: eve.target.result });
      }
      reader.readAsDataURL(event.target.files[0]);
      this.setState({
        track: {
          docname: event.target.files[0].name1,
          doctype: 'track',
          docpath: "Soundtrack/" + rname + event.target.files[0].name1,
          docdesc: "track"
        }
      })
    }

  }



  updatedata(e) {
    e.preventDefault();
    const uploadedby = JSON.parse(localStorage.getItem("userData")).name;
    let fields = {
      name: "",
      composer: "",
      description: "",
      price: ""
      // uploadedby:""
    }
    this.photoUpload()
    this.audioUpload()
    console.log("this.state.fields")
    console.log(this.state.fields)
    console.log(this.state.statustrack)
    console.log(this.state.projectid)


    let projectdata = {
      id: this.props.trackdetailId,
      name: this.state.fields.name,
      tracktype: this.state.tracktypess,
      composer: this.state.fields.composer,
      description: this.state.fields.description,
      price: this.state.fields.price,
      status: 'SUBMITTED',
      genre: this.state.projectid,
      uploadedby: uploadedby,
      photo: {
        docname: this.state.selectedImage.name,
        doctype: 'soundtrack',
        docpath: "soundtrack/Photo/" + rname + this.state.selectedImage.name,
        docdesc: 'soundtrack'
      },
      track: {
        docname: this.state.selectedAudio.name,
        docpath: "soundtrack/Audio/" + rname + this.state.selectedAudio.name,
        docdesc: "track",
        doctype: "track"
      }
    }

    console.log('projectdata')
    console.log(this.state.projectid)

    // var ext = this.state.track.docname.substr(this.state.track.docname.lastIndexOf('.') + 1);
    // if (ext === 'mp3' || ext === 'mp4') {
    // projectdata.photo = this.state.photo
    axios.post(httpUrl +  'soundTrack/update', projectdata)
      .then(responce => {

        this.setState({
          fields: fields
        })
        console.log(responce)
        // this.phoadd()
        // this.handleUpload1()

      });


    Swal.fire({
      icon: 'success',
      title: 'Submitted',
      showConfirmButton: false,
      timer: 1500
    })
    this.props.goBack()
    // this.refreshdata()

  }
  // else {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Please Upload Mp3 Or Mp4 File',
  //     showConfirmButton: false,
  //     timer: 1500
  //   })
  // }
  // }


  photoUpload = () => {
    // console.log(trackid)
    const BASE_URL = httpUrl + 'common/doc/upload';
    const { selectedImage } = this.state;
    if (!selectedImage) {
      this.setState({
        handleResponse: {
          isSuccess: false,
          message: "Please select image to upload."
        }
      });
      return false;
    }

    const formData = new FormData();
    formData.append('doc', selectedImage, rname + this.state.selectedImage.name);
    formData.append('name', "soundtrack/Photo");
    formData.append('width', '400')
    formData.append('height', '400')
    axios.post(BASE_URL, formData).then(response => {
      // this.updatephoto()
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

  audioUpload = () => {
    const BASE_URL = httpUrl + 'common/doc/upload';
    const { selectedAudio } = this.state;
    if (!selectedAudio) {
      this.setState({
        handleResponse: {
          isSuccess: false,
          message: "Please select audio to upload."
        }
      });
      return false;
    }

    const formData = new FormData();
    formData.append('doc', selectedAudio, rname + this.state.selectedAudio.name);
    formData.append('name', "Soundtrack/Audio");
    formData.append('width', '')
    formData.append('height', '')
    axios.post(BASE_URL, formData).then(response => {
      // this.updateaudio();
      this.setState({
        handleResponse: {
          isSuccess: response.status === 200,
          message: response.data.message
        },
        // imageUrl: BASE_URL + response.data.file.path
      });
    }).catch(err => {
      // this.opensweetalertdanger(err.message);
    });
  }

  onChangeFile = event => {
    this.setState({ selectedImage: event.target.files[0] })

    if (event.target.files[0] !== '') {
      // this.file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (eve) => {
        this.setState({ imageUrl: eve.target.result });
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  render() {
    const { imageUrl, imageUrl1 } = this.state;
    return (
      <div className="card">
        <div className="card-body ">
          <div className="col-md-12 col-sm-12 col-xs-12 text-capitalize">
            <div className="panel panel-default cart-border">

              <div className="panel-heading panel-style">


                <h3 style={{ color: "#ffc701" }} >
                  <span style={{ float: "left" }}>Edit Sound Track</span>
                </h3>

              </div>


              <div className="panel-body">
                <div className="table-responsive table-style">
                  <form method="post" name="userRegistrationForm" onSubmit={this.updatedata} >
                    <div className="row1">
                      <div className="column1" >
                        <div style={{ marginTop: "19px" }}>
                          <label style={{ float: "left", marginBottom: "8px" }}>Name</label>
                          <input type="text" className='textstyle' name="name" id="name" defaultValue={this.state.data.name} onChange={this.handleChange} />
                        </div>
                        <div style={{ marginTop: "25px" }}>
                          <label style={{ float: "left", marginBottom: "8px" }}>Artist</label>
                          <input type="text" className='textstyle' name="composer" id="composer" defaultValue={this.state.data.composer} onChange={this.handleChange} />
                        </div>

                        <div style={{ marginTop: "25px" }}>
                          <label style={{ float: "left", marginBottom: "8px" }}>Select Genre</label>
                          <select required name='status' value={this.state.projectid} onChange={this.handleStatusChange} id="status" style={{ borderRadius: "10px", padding: "8px", width: "100%" }} >
                            <option value="0">Select</option>

                            {this.state.projectvalue.map((entry) => {
                              return <option value={entry.name}>{entry.genre}</option>
                            })
                            }

                          </select>
                        </div>
                        {
                          this.state.tracktypess === 'FEATURED' ?
                            <div style={{ marginTop: "25px" }}>
                              <label style={{ float: "left", marginBottom: "8px" }}>Price</label>
                              <input type="number" className='textstyle' id="price" name="price" defaultValue={this.state.data.price} onChange={this.handleChange} />
                            </div>
                            : null}


                      </div >
                      <div className="column1" >

                        <div style={{ marginTop: "19px" }}>
                          <label style={{ float: "left", marginBottom: "8px" }}>Track Type</label>
                          <select name='tracktype' value={this.state.tracktypess} onChange={this.handletrackstatus} id="trackstatus" style={{ borderRadius: "10px", padding: "8px", width: "100%" }} >
                            {/* <option value="0">select</option> */}
                            <option value="NON_FEATURED">NON_FEATURED</option>
                            <option value="FEATURED">FEATURED</option>
                          </select>
                        </div>
                        <div style={{ marginTop: "25px" }}>
                          <label style={{ float: "left", marginBottom: "8px" }}>Description</label>
                          <input type="text" className='textstyle' id="description" name="description" defaultValue={this.state.data.description} onChange={this.handleChange} />
                        </div>

                        <div style={{ marginTop: "25px" }}>
                          <label style={{ float: "left", marginBottom: "8px" }}>Uploaded By</label>
                          <input type="text" readOnly className='textstyle' id="uploadedby" name="uploadedby" value={uploadedby} />
                        </div>



                      </div>





                    </div>

                    <div className="row">
                      <div className="column" >
                        <div style={{ marginTop: "8px" }}>
                          <label style={{ float: "left", marginBottom: "8px" }}> <span>Photo:</span></label>
                          <img style={{ height: "200px", width: "200px" }}
                            src={this.state.docServer + this.state.data.photo?.docpath}
                            className="card-img-top"

                          />
                        </div>

                      </div >

                      <div className="column" >
                        <div style={{ marginTop: "8px" }}>
                          <label style={{ float: "left", marginBottom: "8px" }}> <span>Audio:</span></label>
                          <audio controls preload="auto" src={this.state.docServer + this.state.data.track?.docpath}>
                          </audio>
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
                        <div style={{ marginTop: "8px" }}>
                          <label style={{ float: "left", marginBottom: "8px" }}> <span>Select Audio File:</span></label>
                          <input required type="file" onChange={this.onChangeFile1} />
                        </div>

                      </div >

                      <div className="column" >
                        <div style={{ marginTop: "8px" }}>
                          <audio controls required accept="audio/*"
                            autoPlay preload="auto"
                            src={imageUrl1}>
                          </audio>


                        </div>
                      </div>
                    </div>
                    <div className="row">

                      <div style={{ margin: "15px", float: "left" }}>
                        <button type="submit" className='btn-primary' style={{ color: "White" }}>
                          Update
                        </button>
                      </div>



                      <div style={{ margin: "15px", float: "right" }}>
                        <button type="cancel" onClick={() => { this.props.goBack() }} className='btn-primary' style={{ color: "White" }}>
                          Cancel
                        </button>
                      </div>




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


export default Edittrack;
