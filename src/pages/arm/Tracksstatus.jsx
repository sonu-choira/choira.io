import React, { useEffect, useState } from "react";
import "./addtrack.scss";
import axios from "axios";
import Swal from "sweetalert2";
// import { computeHeadingLevel } from "@testing-library/react";
import { httpUrl, docServerUrl } from '../../restservice'

let idtrack
let statustrack
let Armname=JSON.parse(localStorage.getItem("userData")).name;

export default function Managetracks(props) {

    const [data, setData] = useState([]);
    const [datafill, setDatafill] = useState([]);
    const [searchterm, setsearchterm] = useState('');
    const [pagestatus, setpagestatus] = useState('ALL');
    const [trackstatus, settrackstatus] = useState('ALL_TRACK');
    const { showaddtrack, showedittrack } = props
    const [changepage, setchangepage] = useState(0);
    const [changerejectstatus, setchangerejectstatus] = useState(false);
    const [trackdata, settrackdata] = useState([]);

    const [totaltrack, settotaltrack] = useState([]);
    const [totalsold, setotalsold] = useState(0);

    const docServer = docServerUrl
    // let apiCallInit = true;

    useEffect(() => {
        // setpagezero()
        setpagefour()
        setpagetwo()
    }, [])


    function getToTitles(str) {
        let string = str.replace(/_/g, ' ');
        return toTitles(string);
    }
    function toTitles(s) {
        return s.replace(/\w\S*/g, function (t) { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); });
    }

    function getToTitles(str) {
        if (str) {
            let string;
            if (str !== ' ') {
                string = str.replace(/_/g, ' ');
            } else {
                string = str;
            }
            return toTitles(string);
        }
    }

    const chnagepageitem = (id) => {
        setchangerejectstatus(true)
        idtrack = id

    }

    const statussubmit = (e) => {
        // e.preventDefault();

        //  console.log(idstore)
        // const { rejectreason } = values

        let statusupdate = {
            id: idtrack,
            rejectreason: e,
            status: "REJECT"
        }

        axios.post(httpUrl +  'soundTrack/update', statusupdate)
            .then(responce => {
                console.log(responce.data)
                statustrack = pagestatus;
                setpagezeroall()
            });

        Swal.fire({
            icon: 'success',
            title: 'Rejected',
            showConfirmButton: false,
            timer: 1500
        })
        // values.rejectreason = ""
        // setchangerejectstatus(false)

    }


    const showedit = (senidd) => {
        showedittrack(senidd)
    }


    function trackdetails(id) {

        setchangepage(1)
        axios.get(httpUrl +  'soundTrack/' + id)
            .then(responce => {
                settrackdata(responce.data)
                // setidstore(responce.data.id)
                console.log(responce.data)
            });

    }



    function checkstatus(e) {
        let val = e.target.value;
        statustrack = val
        if (val === 'SUBMITTED') {
            setpagestatus(val)
            setpagezeroall()
            // filterItems(val)
        }
        else if (val === 'PUBLISHED') {
            setpagestatus(val)
            setpagezeroall()
            // filterItems(val)
        }
        else if (val === 'SOLD') {
            setpagestatus(val)
            setpagezeroall()
            // filterItems(val)
        }
        else if (val === 'APPROVED') {
            setpagestatus(val)
            setpagezeroall()
            // filterItems(val)
        }
        else if (val === 'REJECT') {
            setpagestatus(val)
            setpagezeroall()
            // filterItems(val)
        }
        else {
            setpagestatus(val)
            setpagefour()
            setpagetwo();
            // filterItems(val)
        }

    }



    function setpagezeroall() {
        if (trackstatus !== 'ALL_TRACK') {
            let strdata = '&status=' + statustrack + '&track=' + trackstatus
            axios.get(httpUrl +  'soundTrack?uploadedby='+Armname+ strdata)
                .then(responce => {
                    setData([...responce.data])
                    setDatafill([...responce.data])
                    console.log(responce.data)
                });

        } else if (statustrack === 'ALL') {
            setpagefour();
            setpagetwo();
        } else {
            let strdata = 'status=' + statustrack

            axios.get(httpUrl +  'soundTrack?uploadedby='+ Armname +'&'+strdata)
                .then(responce => {
                    setData([...responce.data])
                    setDatafill([...responce.data])
                    console.log(responce.data)
                });
        }
    }

    function setpagetwo() {
        axios.get(httpUrl +  'soundTrack?uploadedby='+Armname+'&status=SOLD')
            .then(responce => {
                let jsonData = [...responce.data]
                setotalsold(jsonData.length)
                console.log(responce.data)
            });

    }

    function nonfeatured() {

        axios.get(httpUrl +  'soundTrack?uploadedby='+Armname+'&track=NON_FEATURED')
            .then(responce => {
                setData([...responce.data])
                settrackstatus('NON_FEATURED')
                console.log(responce.data)
            });
    }

    function featured() {

        axios.get(httpUrl +  'soundTrack?uploadedby='+Armname+'&track=FEATURED')
            .then(responce => {
                setData([...responce.data])
                settrackstatus('FEATURED')
                console.log(responce.data)
            });
    }

    function setpagefour() {

        axios.get(httpUrl +  'soundTrack?uploadedby='+Armname)
            .then(responce => {
                let jsonData = [...responce.data]
                setData([...responce.data])
                setDatafill([...responce.data])
                settotaltrack(jsonData.length)
                settrackstatus('ALL_TRACK')
                // console.log(responce.data)
            });

    }

    function deleteemployee(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Sound Track!',
            type: 'Warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {

                axios.delete(httpUrl +  'soundTrack/' + id)
                    .then(responce => {
                        Swal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                        );
                        console.log(responce)
                        statustrack = pagestatus;
                        setpagezeroall()
                    });


            }
        });
    }


    function statuschange(id, status) {

        let updateproject = {
            id: id,
            status: "PUBLISHED"
        }

        console.log("updateproject", updateproject)

        axios.post(httpUrl +  'soundTrack/update', updateproject)
            .then(responce => {
                // setData([...responce.data])
                console.log(responce.data)
                setpagefour()
            });
    }

    function rejectedChange(id, status) {

        Swal.fire({
            title: 'Reject Reason',
            input: 'text',
            inputPlaceholder: 'Enter your Reject Reason',
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.value) {
                console.log("rejectedChange:", result.value)
                statustrack = pagestatus;
                statussubmit(result.value)
            }
        });

        // setchangerejectstatus(true)
        idtrack = id
    }



    return (
        <div>
            {changepage === 0 ?
                <div className="card">
                    <div className="card-body ">
                        <div className="col-md-12 col-sm-12 col-xs-12 text-capitalize">
                            <div className="panel panel-default cart-border">
                                <div className="panel-heading panel-style">
                                    <span>
                                        <h3 style={{ color: "#ffc701" }} >
                                            <span style={{ float: "left" }}>Total Track = {totaltrack} &nbsp;  Total Sold = {totalsold} </span>
                                        </h3>
                                    </span>
                                    <span onClick={() => { showaddtrack() }} title="Add Track" style={{ float: "right",cursor:"pointer" }}>
                                        <i className="fa fa-plus"></i>
                                    </span>
                                </div>
                                <div style={{ float: "left", margin: "12px" }}>
                                    <button onClick={() => { featured() }} className='btn-primary' style={{ color: "White", margin: "0 20px", padding: "6px 32px", fontSize: "15px" }} className={trackstatus === 'FEATURED' ? "active-link" : ""}>FEATURED</button>
                                    <button onClick={() => { nonfeatured() }} className='btn-primary' style={{ color: "White", margin: "0 20px", padding: "6px 32px", fontSize: "15px" }} className={trackstatus === 'NON_FEATURED' ? "active-link" : ""}>NON FEATURED</button>
                                    <button onClick={() => { setpagefour() }} className='btn-primary' style={{ color: "White", margin: "0 20px", padding: "6px 32px", fontSize: "15px" }} className={trackstatus === 'ALL_TRACK' ? "active-link" : ""}>ALL TRACK</button>

                                </div>
                                <div className="dropdownstyle1">
                                    <select name="pagestatus" onChange={checkstatus} id="status">
                                        <option value="ALL">All</option>
                                        <option value="SUBMITTED" >SUBMITTED</option>
                                        <option value="PUBLISHED">PUBLISHED</option>
                                        <option value="SOLD">SOLD</option>
                                        <option value="REJECT">REJECT</option>
                                    </select>
                                </div>
                                <div>
                                    {

                                        pagestatus === 'ALL' ?
                                            <div className="panel-body">
                                                <div className="table-responsive table-style">
                                                    <table id="projects">
                                                        <thead>
                                                            <tr>
                                                                <th >Name</th>
                                                                <th >Track Type</th>
                                                                <th >Genre</th>
                                                                <th >Composer</th>
                                                                <th >Status</th>
                                                                <th >Price</th>
                                                                <th >Action</th>
                                                            </tr>

                                                            <tr>
                                                                <th colSpan="12">
                                                                    <div className='Search'>

                                                                        <input type="text" className="inputetype"

                                                                            onChange={(e) => {
                                                                                setsearchterm(e.target.value);
                                                                            }}
                                                                            placeholder="Search By Name,Composer,Status,Track" name="search" />
                                                                        <button type="submit" className='btn-primary' style={{ color: "White" }}>
                                                                            <i className="fa fa-search"></i>

                                                                        </button>

                                                                    </div>
                                                                </th>
                                                            </tr>

                                                        </thead>
                                                        <tbody>
                                                            {data.filter((val) => {
                                                                if (searchterm === '') {
                                                                    return true;

                                                                }
                                                                else if (val.name.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.tracktype.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.composer.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.status.toLowerCase().includes(searchterm.toLowerCase())) {
                                                                    return true;

                                                                }
                                                                else return false

                                                            }).map(((entry, _index) => (
                                                                <tr key={entry.id}>

                                                                    <td>{entry.name}</td>
                                                                    <td>{entry.tracktype}</td>
                                                                    <td>{getToTitles(entry.genre)}</td>
                                                                    <td>{entry.composer}</td>
                                                                    <td>{entry.status}</td>
                                                                    <td>{entry.price}</td>
                                                                    <td>
                                        
                                                                        {/* {entry.status === 'SUBMITTED' ?
                                                                            <span>
                                                                                <span onClick={() => { statuschange(entry.id, entry.status) }} title="Approved" style={{ color: "white" }}>
                                                                                    <button>
                                                                                        <i className="fa fa-thumbs-up"></i>
                                                                                    </button>
                                                                                </span>
                                                                                &nbsp;
                                                                                &nbsp;
                                                                                
                                                                            </span>
                                                                            : null} */}
                                                                           
                                                                        {/* {entry.status === 'SOLD' ?
                                                                            <span onClick={() => { deleteemployee(entry.id) }} title="Delete" style={{ color: "white" }}>
                                                                                <button>
                                                                                    <i className="fa fa-trash"></i>
                                                                                </button>
                                                                            </span>
                                                                            : null}

                                                                        {entry.status === 'APPROVED' || entry.status === 'PUBLISHED' ?
                                                                            <span onClick={() => { statuschange(entry.id, entry.status) }} title="Submitted" style={{ color: "white" }}>
                                                                                <button>
                                                                                    <i className="fa fa-check"></i>
                                                                                </button>
                                                                            </span>
                                                                            : null
                                                                        }

                                                                        {entry.status === 'REJECT' ?
                                                                            <span onClick={() => { showedit(entry.id) }} title="Track Update" style={{ color: "white" }}>
                                                                                <button>
                                                                                    <i className="fa fa-edit"></i>
                                                                                </button>
                                                                            </span>
                                                                            : null} */}
                                                                             <span onClick={() => { trackdetails(entry.id) }} title="Track Detail" style={{ color: "white" }}>
                                                                            <button>
                                                                                <i className="fa fa-info-circle"></i>
                                                                            </button>
                                                                        </span>
                                                                        &nbsp;
                                                                        &nbsp;
                                                                            {entry.status === 'REJECT' ?
                                                                            <span onClick={() => { showedit(entry.id) }} title="Track Update" style={{ color: "white" }}>
                                                                                <button>
                                                                                    <i className="fa fa-edit"></i>
                                                                                </button>
                                                                            </span>
                                                                            : null} 
                                                                            

                                                                    </td>

                                                                </tr>
                                                            )))}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            : null
                                    }

                                    {

                                        pagestatus === 'SUBMITTED' ?
                                            <div className="panel-body">
                                                <div className="table-responsive table-style">
                                                    <table id="projects">
                                                        <thead>
                                                            <tr>
                                                                <th >Name</th>
                                                                <th >Track Type</th>
                                                                 <th>Genre</th>
                                                                <th >Composer</th>
                                                                <th >Status</th>
                                                                <th >Price</th>
                                                                <th >Action</th>
                                                            </tr>

                                                            <tr>
                                                                <th colSpan="12">
                                                                    <div className='Search'>

                                                                        <input type="text" className="inputetype"

                                                                            onChange={(e) => {
                                                                                setsearchterm(e.target.value);
                                                                            }}
                                                                            placeholder="Search By Name,Composer,Status,Track" name="search" />
                                                                        <button type="submit" className='btn-primary' style={{ color: "White" }}>
                                                                            <i className="fa fa-search"></i>

                                                                        </button>

                                                                    </div>
                                                                </th>
                                                            </tr>

                                                        </thead>
                                                        <tbody>
                                                            {data.filter((val) => {
                                                                if (searchterm === '') {
                                                                    return true;

                                                                }
                                                                else if (val.name.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.tracktype.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.composer.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.status.toLowerCase().includes(searchterm.toLowerCase())) {
                                                                    return true;

                                                                }
                                                                else return false

                                                            }).map(((entry, _index) => (
                                                                <tr key={entry.id}>

                                                                    <td>{entry.name}</td>
                                                                    <td>{entry.tracktype}</td>
                                                                    <td>{getToTitles(entry.genre)}</td>
                                                                    <td>{entry.composer}</td>
                                                                    <td>{entry.status}</td>
                                                                    <td>{entry.price}</td>
                                                                    <td>


                                                                        <span onClick={() => { trackdetails(entry.id) }} title="Track Detail" style={{ color: "white" }}>
                                                                            <button>
                                                                                <i className="fa fa-info-circle"></i>
                                                                            </button>
                                                                        </span>
                                                                        &nbsp;
                                                                        &nbsp;
                                                                        {/* {
                                                                                entry.tracktype === 'FEATURED'?
                                                                                <span onClick={() => { deleteemployee(entry.id) }} style={{ color: "white" }}>
                                                                                <button>
                                                                                    <i className="fa fa-trash"></i>
                                                                                </button>
                                                                            </span>
                                                                            :null}
                                                                             &nbsp;
                                                                             &nbsp; */}
                                                                        {/* <span onClick={() => { deleteemployee(entry.id) }} style={{ color: "white" }}>
                                                                            <button>
                                                                                <i className="fa fa-trash"></i>
                                                                            </button>
                                                                        </span>
                                                                        &nbsp;
                                                                        &nbsp; */}

                                                                        {/* <span onClick={() => { statuschange(entry.id, entry.status) }} title="Approved" style={{ color: "white" }}>
                                                                            <button>
                                                                                <i className="fa fa-thumbs-up"></i>
                                                                            </button>
                                                                        </span>
                                                                       

                                                                        <span onClick={() => { rejectedChange(entry.id, entry.status) }} title="Rejected" style={{ color: "white" }}>
                                                                            <button>
                                                                                <i className="fa fa-thumbs-down"></i>
                                                                            </button>
                                                                        </span> */}
                                                                       

                                                                    </td>

                                                                </tr>
                                                            )))}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            : null
                                    }

                                    {
                                        pagestatus === 'PUBLISHED' ?
                                            <div className="panel-body">
                                                <div className="table-responsive table-style">
                                                    <table id="projects">
                                                        <thead>
                                                            <tr>
                                                                <th >Name</th>
                                                                <th >Track Type</th>
                                                                <th>Genre</th>
                                                                <th >Composer</th>
                                                                <th >Status</th>
                                                                <th >Price</th>
                                                                <th >Action</th>
                                                            </tr>

                                                            <tr>
                                                                <th colSpan="12">
                                                                    <div className='Search'>

                                                                        <input type="text" className="inputetype"

                                                                            onChange={(e) => {
                                                                                setsearchterm(e.target.value);
                                                                            }}
                                                                            placeholder="Search By Name,Composer,Status,Track" name="search" />
                                                                        <button type="submit" className='btn-primary' style={{ color: "White" }}>
                                                                            <i className="fa fa-search"></i>

                                                                        </button>

                                                                    </div>
                                                                </th>
                                                            </tr>

                                                        </thead>
                                                        <tbody>
                                                            {data.filter((val) => {
                                                                if (searchterm === '') {
                                                                    return true;

                                                                }
                                                                else if (val.name.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.tracktype.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.composer.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.status.toLowerCase().includes(searchterm.toLowerCase())) {
                                                                    return true;

                                                                }
                                                                else return false

                                                            }).map(((entry, _index) => (
                                                                <tr key={entry.id}>

                                                                    <td>{entry.name}</td>
                                                                    <td>{entry.tracktype}</td>
                                                                    <td>{getToTitles(entry.genre)}</td>
                                                                    <td>{entry.composer}</td>
                                                                    <td>{entry.status}</td>
                                                                    <td>{entry.price}</td>
                                                                    <td>


                                                                        <span onClick={() => { trackdetails(entry.id) }} title="Track Detail" style={{ color: "white" }}>
                                                                            <button>
                                                                                <i className="fa fa-info-circle"></i>
                                                                            </button>
                                                                        </span>
                                                                        &nbsp;
                                                                        &nbsp;
                                                                        {/* {
                                                                                entry.tracktype === 'FEATURED'?
                                                                                <span onClick={() => { deleteemployee(entry.id) }} style={{ color: "white" }}>
                                                                                <button>
                                                                                    <i className="fa fa-trash"></i>
                                                                                </button>
                                                                            </span>
                                                                            :null} */}

                                                                    </td>

                                                                </tr>
                                                            )))}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            : null
                                    }

                                    {
                                        pagestatus === 'APPROVED' ?
                                            <div className="panel-body">
                                                <div className="table-responsive table-style">
                                                    <table id="projects">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Track Type</th>
                                                                <th>Genre</th>
                                                                <th >Composer</th>
                                                                <th >Status</th>
                                                                <th >Price</th>
                                                                <th >Action</th>
                                                            </tr>

                                                            <tr>
                                                                <th colSpan="12">
                                                                    <div className='Search'>

                                                                        <input type="text" className="inputetype"

                                                                            onChange={(e) => {
                                                                                setsearchterm(e.target.value);
                                                                            }}
                                                                            placeholder="Search By Name,Composer,Status,Track" name="search" />
                                                                        <button type="submit" className='btn-primary' style={{ color: "White" }}>
                                                                            <i className="fa fa-search"></i>

                                                                        </button>

                                                                    </div>
                                                                </th>
                                                            </tr>

                                                        </thead>
                                                        <tbody>
                                                            {data.filter((val) => {
                                                                if (searchterm === '') {
                                                                    return true;

                                                                }
                                                                else if (val.name.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.tracktype.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.composer.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.status.toLowerCase().includes(searchterm.toLowerCase())) {
                                                                    return true;

                                                                }
                                                                else return false

                                                            }).map(((entry, _index) => (
                                                                <tr key={entry.id}>

                                                                    <td>{entry.name}</td>
                                                                    <td>{entry.tracktype}</td>
                                                                    <td>{getToTitles(entry.genre)}</td>
                                                                    <td>{entry.composer}</td>
                                                                    <td>{entry.status}</td>
                                                                    <td>{entry.price}</td>
                                                                    <td>


                                                                        <span onClick={() => { trackdetails(entry.id) }} title="Track Detail" style={{ color: "white" }}>
                                                                            <button>
                                                                                <i className="fa fa-info-circle"></i>
                                                                            </button>
                                                                        </span>
                                                                        &nbsp;
                                                                        &nbsp;
                                                                        {/* {
                                                                                entry.tracktype === 'FEATURED'?
                                                                                <span onClick={() => { deleteemployee(entry.id) }} style={{ color: "white" }}>
                                                                                <button>
                                                                                    <i className="fa fa-trash"></i>
                                                                                </button>
                                                                            </span>
                                                                            :null}
                                                                              &nbsp;
                                                                            &nbsp; */}
                                                                        {/* <span onClick={() => { statuschange(entry.id, entry.status) }} title="Submited" style={{ color: "white" }}>
                                                                            <button>
                                                                                <i className="fa fa-check"></i>
                                                                            </button>
                                                                        </span> */}
                                                                      
                                                                       


                                                                    </td>

                                                                </tr>
                                                            )))}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            : null}

                                    {
                                        pagestatus === 'SOLD' ?
                                            <div className="panel-body">
                                                <div className="table-responsive table-style">
                                                    <table id="projects">
                                                        <thead>
                                                            <tr>
                                                                <th >Name</th>
                                                                <th >Track Type</th>
                                                                <th>Genre</th>
                                                                <th >Composer</th>
                                                                <th >Status</th>
                                                                <th >Price</th>
                                                                <th >Action</th>
                                                            </tr>

                                                            <tr>
                                                                <th colSpan="12">
                                                                    <div className='Search'>

                                                                        <input type="text" className="inputetype"

                                                                            onChange={(e) => {
                                                                                setsearchterm(e.target.value);
                                                                            }}
                                                                            placeholder="Search By Name,Composer,Status,Track" name="search" />
                                                                        <button type="submit" className='btn-primary' style={{ color: "White" }}>
                                                                            <i className="fa fa-search"></i>

                                                                        </button>

                                                                    </div>
                                                                </th>
                                                            </tr>

                                                        </thead>
                                                        <tbody>
                                                            {data.filter((val) => {
                                                                if (searchterm === '') {
                                                                    return true;

                                                                }
                                                                else if (val.name.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.tracktype.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.composer.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.status.toLowerCase().includes(searchterm.toLowerCase())) {
                                                                    return true;

                                                                }
                                                                else return false

                                                            }).map(((entry, _index) => (
                                                                <tr key={entry.id}>

                                                                    <td>{entry.name}</td>
                                                                    <td>{entry.tracktype}</td>
                                                                    <td>{getToTitles(entry.genre)}</td>
                                                                    <td>{entry.composer}</td>
                                                                    <td>{entry.status}</td>
                                                                    <td>{entry.price}</td>
                                                                    <td>


                                                                        <span onClick={() => { trackdetails(entry.id) }} title="Track Detail" style={{ color: "white" }}>
                                                                            <button>
                                                                                <i className="fa fa-info-circle"></i>
                                                                            </button>
                                                                        </span>
                                                                        &nbsp;
                                                                        &nbsp;
                                                                        {/* <span onClick={() => {showedit(entry.id) }} title="Artist Update" style={{ color: "white" }}>
                                                            <button>
                                                                <i className="fa fa-edit"></i>
                                                            </button>
                                                        </span>
                                                        &nbsp;
                                                        &nbsp; */}
                                                                        {/* <span onClick={() => { deleteemployee(entry.id) }} style={{ color: "white" }}>
                                                                            <button>
                                                                                <i className="fa fa-trash"></i>
                                                                            </button>
                                                                        </span> */}


                                                                    </td>

                                                                </tr>
                                                            )))}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            : null
                                    }

                                    {
                                        pagestatus === 'REJECT' ?
                                            <div className="panel-body">
                                                <div className="table-responsive table-style">
                                                    <table id="projects">
                                                        <thead>
                                                            <tr>
                                                                <th >Name</th>
                                                                <th >Track Type</th>
                                                                <th>Genre</th>
                                                                <th >Composer</th>
                                                                <th >Status</th>
                                                                <th >Price</th>
                                                                <th >Action</th>
                                                            </tr>

                                                            <tr>
                                                                <th colSpan="12">
                                                                    <div className='Search'>

                                                                        <input type="text" className="inputetype"

                                                                            onChange={(e) => {
                                                                                setsearchterm(e.target.value);
                                                                            }}
                                                                            placeholder="Search By Name,Composer,Status,Track" name="search" />
                                                                        <button type="submit" className='btn-primary' style={{ color: "White" }}>
                                                                            <i className="fa fa-search"></i>

                                                                        </button>

                                                                    </div>
                                                                </th>
                                                            </tr>

                                                        </thead>
                                                        <tbody>
                                                            {data.filter((val) => {
                                                                if (searchterm === '') {
                                                                    return true;

                                                                }
                                                                else if (val.name.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.tracktype.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.composer.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                                    val.status.toLowerCase().includes(searchterm.toLowerCase())) {
                                                                    return true;

                                                                }
                                                                else return false

                                                            }).map(((entry, _index) => (
                                                                <tr key={entry.id}>

                                                                    <td>{entry.name}</td>
                                                                    <td>{entry.tracktype}</td>
                                                                    <td>{getToTitles(entry.genre)}</td>
                                                                    <td>{entry.composer}</td>
                                                                    <td>{entry.status}</td>
                                                                    <td>{entry.price}</td>
                                                                    <td>


                                                                        <span onClick={() => { trackdetails(entry.id) }} title="Track Detail" style={{ color: "white" }}>
                                                                            <button>
                                                                                <i className="fa fa-info-circle"></i>
                                                                            </button>
                                                                        </span>
                                                                        &nbsp;
                                                                        &nbsp;

                                                                        {/* <span onClick={() => { statuschange(entry.id, entry.status) }} title="Submited" style={{ color: "white" }}>
                                                                            <button>
                                                                                <i className="fa fa-check"></i>
                                                                            </button>
                                                                        </span>
                                                                        &nbsp;
                                                                        &nbsp; */}

                                                                        {/* <span onClick={() => { deleteemployee(entry.id) }} style={{ color: "white" }}>
                                                                            <button>
                                                                                <i className="fa fa-trash"></i>
                                                                            </button>
                                                                        </span>
                                                                        &nbsp;
                                                                        &nbsp;

                                                                        {entry.status === 'REJECT' ?
                                                                            <span onClick={() => { showedit(entry.id) }} title="Track Update" style={{ color: "white" }}>
                                                                                <button>
                                                                                    <i className="fa fa-edit"></i>
                                                                                </button>
                                                                            </span>
                                                                            : null} */}
                                                                             {entry.status === 'REJECT' ?
                                                                            <span onClick={() => { showedit(entry.id) }} title="Track Update" style={{ color: "white" }}>
                                                                                <button>
                                                                                    <i className="fa fa-edit"></i>
                                                                                </button>
                                                                            </span>
                                                                            : null}
                                                                            {/* {
                                                                                entry.tracktype === 'FEATURED'?
                                                                                <span onClick={() => { deleteemployee(entry.id) }} style={{ color: "white" }}>
                                                                                <button>
                                                                                    <i className="fa fa-trash"></i>
                                                                                </button>
                                                                            </span>
                                                                            :null} */}
                                                                           

                                                                    </td>

                                                                </tr>
                                                            )))}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            : null
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }
            {changepage === 1 ?
                <div className="card">
                    <div className="card-body ">
                        <div className="col-md-12 col-sm-12 col-xs-12 text-capitalize">
                            <div className="panel panel-default cart-border">
                                <div className="panel-heading panel-style">
                                    <h3 style={{ color: "#ffc701" }}>
                                        <span style={{ float: "left" }}>Track Details</span>
                                        <span onClick={() => { setchangepage(0) }} style={{ color: "white", float: "right",cursor:"pointer" }}>
                                            Back
                                        </span>
                                    </h3>

                                    {/* <h1 onClick={() => {goBack()}} >This is details page == {userId}</h1> */}
                                </div>

                                <div className="panel-body">
                                    <div style={{ padding: "24px" }}>
                                        <span style={{ fontSize: "19px", float: "left" }}>
                                            Details :
                                        </span>
                                    </div>


                                    <div className="grid-container">

                                        <div className="grid-item">
                                            Name: <label>{trackdata.name}</label>
                                        </div>

                                        <div className="grid-item">
                                            Track Type: <label>{trackdata.tracktype}</label>
                                        </div>

                                        <div className="grid-item">
                                            Artist: <label>{trackdata.composer}</label>
                                        </div>

                                        <div className="grid-item">
                                            Status: <label>{trackdata.status}</label>
                                        </div>

                                        <div className="grid-item">
                                            Price: <label>{trackdata.price}</label>
                                        </div>
                                        <div className="grid-item">
                                            Description: <label>{trackdata.description}</label>
                                        </div>
                                        {
                                            trackdata.status === 'REJECT' ?
                                                <div className="grid-item">
                                                    Reject Reason: <label>{trackdata.rejectreason}</label>
                                                </div>
                                                : null}
                                    </div>

                                    <div className="grid-container">
                                        {
                                            trackdata.photo ?
                                                (
                                                    <div className="grid-item">
                                                        <img style={{ height: "100px", width: "100px" }} src={docServer + trackdata.photo?.docpath} />
                                                    </div>
                                                )
                                                : null
                                        }

                                        {
                                            trackdata.track ?
                                                (
                                                    <div className="grid-item">
                                                        <audio controls preload="auto" style={{ width: '100%' }} src={docServer + trackdata.track?.docpath} >
                                                        </audio>
                                                    </div>
                                                )
                                                : null
                                        }


                                    </div>
                                    {/* <div className="btn-margin">
                                        {trackdata.status === 'REJECT' ?
                                            <button className="btn-primary btn-small" style={{ padding: '5px 20px' }}
                                                onClick={() => { showedit(trackdata.id) }} >Edit
                                            </button>
                                            : null}
                                    </div> */}


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                : null}

        </div>
    )
}
