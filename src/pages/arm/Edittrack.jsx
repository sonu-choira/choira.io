// import React, { Component } from "react";
import  axios from 'axios';
import React from 'react';
// import React, { useState } from "react";
import Swal from 'sweetalert2';
import './addtrack.scss'
import { httpUrl, docServerUrl } from '../../restservice'

let dataid
let Armname=JSON.parse(localStorage.getItem("userData")).name;
class Edittrack extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = {
            fields: {},
            photo: {},
            selectedFile: null,
            selectedFile1: null,
            handleResponse: null,
            imageUrl: null,
            track:{},
            data:{},
            projectid:"",
            projectvalue:[],
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



    componentDidMount(){
        this.getdata();
        this.getdatabyid();
    }

    // initfun = () => {
    //     let userid = this.props.empid
    //     // alert(userid)
    //     // let data
    //     axios.get(httpUrl +  'employee/' + userid)
    //         .then(responce => {
    //             this.setState({
    //                 data: responce.data,
    //                 scrolling: false,
    //                 empStatus: responce.data.status
    //             });
    //             statuschange = responce.data.status;
               
    //            console.log('status',responce.data.status);

    //         });
    // }

    getdatabyid = ()=>{
        let getbyidtrack = this.props.trackdetailId
        axios.get(httpUrl +  'soundTrack/'+getbyidtrack)
                .then(responce => {
                    this.setState({
                        data: responce.data,
                        scrolling: false,
                        tracktypess:responce.data.tracktype,
                        projectid:responce.data.genre
                    });
                    // dataid = responce.data[0].id
                    console.log(responce.data)
                });
    }

  getdata = ()=>{
        axios.get(httpUrl +  'genre')
                .then(responce => {
                    this.setState({
                        projectvalue: responce.data,
                        scrolling: false,
                    });
                    // dataid = responce.data[0].id
                    console.log(dataid)
                    console.log(responce.data)
                });
    }
    refreshdata = ()=>{
         axios.get(httpUrl +  'soundTrack?uploadedby='+Armname)
                .then(responce => {
                    this.setState({
                        data: responce.data,
                        scrolling: false,
                    });
                    // dataid = responce.data[0].id
                    console.log(responce.data)
                });
    }


    
    // axios.get(httpUrl +  'soundTrack?uploadedby='+Armname)






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
        this.setState({ selectedFile1: event.target.files[0] })
       if (event.target.files[0] !== '') {
          var reader = new FileReader();
          reader.onload = (eve) => {
            this.setState({ imageUrl1: eve.target.result });
          }
          reader.readAsDataURL(event.target.files[0]);
          this.setState({
            track: {
              docname:event.target.files[0].name,
              doctype:'track',
              docpath: "soundtrack/Audio/"+ event.target.files[0].name,
              docdesc:"track"
            }
          })
         
        }
        console.log("track")
        console.log(this.state.track)
       
      }



    updatedata(e) {
        e.preventDefault();
        const armname = JSON.parse(localStorage.getItem("userData")).name;
       

        console.log("this.state.fields")
        console.log(this.state.fields)
        console.log(this.state.statustrack)
        console.log(this.state.projectid)


        let projectdata = {
            id:this.props.trackdetailId,
            name: this.state.fields.name,
            tracktype: this.state.tracktypess,
            composer: this.state.fields.composer,
            description: this.state.fields.description,
            price: this.state.fields.price,
            status:'SUBMITTED',
            genre:this.state.projectid,
            uploadedby:armname,
            photo:{},
            track: {
                docname: this.state.selectedFile1.name,
                docpath:"soundtrack/Audio"  + "/" + this.state.selectedFile1.name,
                docdesc:"track",
                doctype:"track"
            }
        }
        console.log('projectdata')
        console.log(this.state.projectid)
       
        var ext = this.state.track.docname.substr(this.state.track.docname.lastIndexOf('.') + 1);
        if(ext ==='mp3' || ext==='mp4'){
            projectdata.photo = this.state.photo
                axios.post(httpUrl +  'soundTrack/update',projectdata)
        .then(responce => {
           
            this.setState({
                fields: fields
            })  
            console.log(responce)
            this.phoadd()
            this.handleUpload1()
           
          
          
        });
       
       
    Swal.fire({
        icon: 'success',
        title: 'Submitted',
        showConfirmButton: false,
        timer: 1500
    })
    this.props.goBack()
    let fields = {
        name: "",
        composer: "",
        description: "",
        price:""
    }
    this.refreshdata()
    
        }
        else{
             Swal.fire({
                        icon: 'error',
                        title: 'Please Upload Mp3 Or Mp4 File',
                        showConfirmButton: false,
                        timer: 1500
                    })
        }
    }
   
  
    phoadd=() => {
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
        formData.append('name', "soundtrack/" + this.props.trackdetailId);
        formData.append('width', '400')
        formData.append('height', '400')
        axios.post(BASE_URL, formData).then(response => {
            // this.updatephoto(trackid)
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

  

   

   
      handleUpload1 = () => {
        const BASE_URL = httpUrl + 'common/doc/upload';
        const { selectedFile1 } = this.state;
        if (!selectedFile1) {
          this.setState({
            handleResponse: {
              isSuccess: false,
              message: "Please select audio to upload."
            }
          });
          return false;
        }
    
        const formData = new FormData();
        formData.append('doc', selectedFile1, this.state.selectedFile1.trackvalue);
        formData.append('name', "soundtrack/Audio");
        axios.post(BASE_URL, formData).then(response => {
            // this.updateaudio(trackid);
          this.setState({
            handleResponse: {
              isSuccess: response.status === 200,
              message: response.data.message
            },
            // imageUrl: BASE_URL + response.data.file.path
          });
        }).catch(err => {
            alert('error')
        //   this.opensweetalertdanger(err.message);
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
                    doctype: 'soundtrack',
                    docpath: "soundtrack/" + this.props.trackdetailId + '/'+ event.target.files[0].name,
                    docdesc: "soundtrack"
                }
            });
        }
    }
     


    



    render() {
        const { imageUrl,imageUrl1 } = this.state;
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
                                                    <input type="text"  className='textstyle' name="name" id="name" defaultValue={this.state.data.name} onChange={this.handleChange} />
                                                </div>
                                                <div style={{ marginTop: "25px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>Artist</label>
                                                    <input type="text"  className='textstyle' name="composer" id="composer" defaultValue={this.state.data.composer} onChange={this.handleChange} />
                                                </div>
                                                
                                                <div style={{ marginTop: "25px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>Select Genre</label>
                                                   <select required  name='status' value={this.state.projectid}  onChange={this.handleStatusChange} id="status"   style={{borderRadius:"10px",padding:"8px",width:"100%"}} >
                                                       <option value="0">Select</option>
                                                      
                                                       {this.state.projectvalue.map((entry) => {
                                                        return <option value={entry.name}>{entry.genre}</option>
                                                        })
                                                        }
                                                      
                                                   </select>
                                                </div>
                                               {
                                                   this.state.tracktypess === 'FEATURED'?
                                                   <div style={{ marginTop: "25px" }}>
                                                   <label style={{ float: "left", marginBottom: "8px" }}>Price</label>
                                                   <input type="number"  className='textstyle' id="price" name="price" defaultValue={this.state.data.price} onChange={this.handleChange} />
                                               </div>
                                               :null}
                                               
                                                
                                            </div >
                                            <div className="column1" >
                                           
                                            <div style={{ marginTop: "19px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>Track Type</label>
                                                   <select name='tracktype' value={this.state.tracktypess}  onChange={this.handletrackstatus} id="trackstatus"   style={{borderRadius:"10px",padding:"8px",width:"100%"}} >
                                                       {/* <option value="0">select</option> */}
                                                       <option value="NON_FEATURED">NON_FEATURED</option>
                                                       <option value="FEATURED">FEATURED</option> 
                                                   </select>
                                                </div>
                                                <div style={{ marginTop: "25px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>Description</label>
                                                    <input type="text"  className='textstyle' id="description" name="description" defaultValue={this.state.data.description} onChange={this.handleChange} />
                                                </div>

                                                <div style={{ marginTop: "25px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}>Uploaded By</label>
                                                    <input type="text" readOnly  className='textstyle' id="uploadedby" name="uploadedby" value={Armname}  />
                                                </div>
                                               
                                                
                                                
                                            </div>
                                            
                                           

                                            
                                            
                                        </div>

                                        <div className="row">
                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}> <span>Photo:</span></label>
                                                    <img style={{ height:"200px",width:"200px"}}
                                                        src={this.state.docServer + this.state.data.photo?.docpath}
                                                        className="card-img-top"
                                                        
                                                    />
                                                </div>

                                            </div >

                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                <label style={{ float: "left", marginBottom: "8px" }}> <span>Audio:</span></label>
                                                <audio controls preload="auto"   src={this.state.docServer + this.state.data.track?.docpath}>
                                                 </audio>
                                                </div>
                                            </div>
                                        </div>
                                       

                                        <div className="row">
                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <label style={{ float: "left", marginBottom: "8px" }}> <span>Select Image:</span></label>
                                                    <input type="file"   onChange={this.onChangeFile} />
                                                </div>

                                            </div >

                                            <div className="column" >
                                                <div style={{ marginTop: "8px" }}>
                                                    <img style={{ height:"185px",width:"175px"}}
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


export default Edittrack;
