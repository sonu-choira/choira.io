import axios from 'axios';
import React from 'react';
import './genre.scss';
import Swal from 'sweetalert2';
import { httpUrl, docServerUrl } from '../../../restservice'

class Editgenre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: {},
            selectedFile: null,
            handleResponse: null,
            imageUrl: null,
            genrestatus: "",
            docServer: docServerUrl,
            data: []

        }

        this.handleStatusChange = this.handleStatusChange.bind(this)
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    componentDidMount() {
        this.initfun();
    }

    initfun = () => {
        let genreid = this.props.genreid
        axios.get(httpUrl + 'genre/' + genreid)
            .then(responce => {
                this.setState({
                    data: responce.data,
                    scrolling: false,
                    genrestatus: responce.data.genre
                });

                console.log('status', responce.data.status);

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
                    doctype: 'genre',
                    docpath: "genre/" + this.props.genreid + '/' + event.target.files[0].name,
                    docdesc: "genre photo"
                }
            });
        }
    }

    handleUpload = () => {
        let genreid = this.props.genreid
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
        formData.append('name', "genre/" + genreid);
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

    submituserRegistrationForm(e) {
        e.preventDefault();
        let genreid = this.props.genreid
        let updateAbleData = {
            id: genreid,
            genre: this.state.genrestatus,
            photo: {}
        }
        updateAbleData.photo = this.state.photo
        axios.post(httpUrl + 'genre/update', updateAbleData)
            .then(responce => {
                // this.state.fields = fields 
                Swal.fire({
                    icon: 'success',
                    title: 'Updated',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.handleUpload()
                this.props.Backgenre()

                console.log(responce.data)
            }).catch(error => {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: "Duplicate Genre",
                });


            })
    }

    handleStatusChange(e) {
        let value = e.target.value;
        this.setState({
            genrestatus: value
        })
    }

    render() {
        const { imageUrl } = this.state;
        return (
            <div>
                <div className="card">
                    <div className="card-body ">
                        <div className="col-md-12 col-sm-12 col-xs-12 text-capitalize">
                            <div className="panel panel-default cart-border">
                                <div className="panel-heading panel-style">

                                    <span>
                                        <h3 style={{ color: "#ffc701" }}>
                                            <span style={{ float: "left" }}>Edit Genre</span></h3>
                                    </span>
                                </div>


                                <div className="panel-body">
                                    <div className="table-responsive table-style">
                                        <form method="post" name="genredit" onSubmit={this.submituserRegistrationForm}>
                                            <div>
                                                <div >
                                                    <div style={{ marginTop: "8px" }} className='genestyle'>
                                                        <p style={{ fontSize: "19px", marginBottom: "9px", textAlign: "left" }}>Select</p>
                                                        <select id="dropdown" name="id" value={this.state.genrestatus} onChange={this.handleStatusChange} style={{ width: "100%", padding: "14px", borderRadius: "12px" }}>
                                                            <option value="HIP_HOP">HIP HOP</option>
                                                            <option value="BOLLYWOOD">BOLLYWOOD</option>
                                                            <option value="POP">POP</option>
                                                            <option value="HIP_POP">HIP POP</option>
                                                            <option value="BOLLYWOOD_POP">BOLLYWOOD POP</option>
                                                            <option value="INDIE_POP">INDIE POP</option>
                                                            <option value="ROCK">ROCK</option>
                                                            <option value="SUFI">SUFI</option>
                                                            <option value="LOFI">LOFI</option>
                                                            <option value="COUNTRY">COUNTRY</option>
                                                            <option value="EDM">EDM</option>
                                                            <option value="INDIAN_CLASSICAL">INDIAN CLASSICAL</option>
                                                        </select>
                                                    </div>
                                                </div >

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
                                                        <input type="file" className='textstyle' onChange={this.onChangeFile} />
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
                                                <div style={{ margin: "15px", float: "left" }}>
                                                    <button type="submit" className='btn-primary' style={{ color: "White" }}>
                                                        Update
                                                    </button>
                                                </div>

                                                <div style={{ margin: "15px", float: "right" }}>
                                                    <button type="cancel" onClick={() => { this.props.Backgenre() }} className='btn-primary' style={{ color: "White" }}>
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
            </div>

        );
    }


}


export default Editgenre;
