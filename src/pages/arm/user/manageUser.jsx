import React, { useEffect, useState } from "react";
import "./userstyle.scss";
import axios from "axios";
import { httpUrl } from '../../../restservice'

let dateData = {};
let manageid = JSON.parse(localStorage.getItem('userData')).id;
let dataparam = '&manager=' + manageid;
export default function ManageUser(props) {

    const [data, setData] = useState([]);

    const [searchterm, setsearchterm] = useState('');
    const [status, setStatus] = useState('MY');

    const { showDetailsPage } = props
    const { showpage } = props
    // const { showaddpage } = props
    // const { showuseredit } = props
    const [datatype, setDatatype] = useState('ALL');

    useEffect(() => {
        // dataparam = '&manager=' + manageid;
        loadData(status)
    }, [])

    const showDetails = sendableId => {
        showDetailsPage(sendableId)
    }

    // const showadddpage = () => {
    //     showaddpage();
    // }

    // const showeditpage = sendableId => {
    //     showuseredit(sendableId);
    // }

    const showproject = (sendableId, name) => {
        showpage(sendableId, name)
    }

    function loadData(st) {
        let manageid = JSON.parse(localStorage.getItem('userData')).id;
        let api = '';
        if (st === 'MY') {
            api = '?manager=' + manageid
        } else {
            api = ''
        }
        axios.get(httpUrl + 'customer' + api)
            // axios.get(httpUrl +  'customer?manager=' + manageid)
            .then(response => {
                setData([...response.data])
                console.log(response.data)
                setDatatype("ALL")
            });
    }

    // function deleteemployee(id) {



    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: 'You will not be able to recover this customer data!',
    //         type: 'Warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, delete it!',
    //         cancelButtonText: 'No, keep it'
    //     }).then((result) => {
    //         if (result.value) {

    //             axios.delete(httpUrl +  'customer/' + id)
    //                 .then(responce => {
    //                     Swal.fire(
    //                         'Deleted!',
    //                         'Your data has been deleted.',
    //                         'success'
    //                     );
    //                     console.log(responce)
    //                     loadData()
    //                 });


    //         }
    //     });
    // }



    function unixTimeConverter(unixTime) {
        const date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(unixTime);
        return date;
    }

    const handleChange = (e) => {
        dateData[e.target.name] = e.target.value;
    }

    function changeStatus(st) {
        setStatus(st)
        if (st === 'MY') {
            dataparam = '&manager=' + manageid;
        } else {
            dataparam = '';
        }

        loadData(st);
    }

    function fistWeek() {

        axios.get(httpUrl + 'customer?type=THISWEEK' + dataparam)
            .then(responce => {
                setData([...responce.data])
                setDatatype('THIS_WEEK')
                console.log(responce.data)
            });
    }

    function lastMonth() {

        axios.get(httpUrl + 'customer?type=LASTMONTH' + dataparam)
            .then(responce => {
                setData([...responce.data])
                setDatatype('LAST_MONTH')
                console.log(responce.data)
            });
    }

    function currentMonth() {

        axios.get(httpUrl + 'customer?type=THISMONTH' + dataparam)
            .then(responce => {
                setData([...responce.data])
                setDatatype('THIS_MONTH')
                console.log(responce.data)
            });
    }

    function customDate() {
        setDatatype('CUSTOM_DATE')
    }

    function submitDate() {
        let startdate = dateData.startdate;
        let enddate = dateData.enddate;
        axios.get(httpUrl + 'customer?startdate=' + startdate + '&enddate=' + enddate + dataparam)
            .then(responce => {
                setData([...responce.data])
                setDatatype('CUSTOM_DATE')
                console.log(responce.data)
            });
    }


    return (
        <div className="card">
            <div className="card-body ">
                <div className="col-md-12 col-sm-12 col-xs-12 text-capitalize">
                    <div className="panel panel-default cart-border">
                        <div className="panel-heading panel-style">
                            <h3 style={{ color: "#ffc701", textAlign: "left" }}>
                                <span>Manage User</span>
                            </h3>
                        </div>

                        <div className="panel-body">
                            <div className="table-responsive table-style">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">City</th>
                                            <th scope="col">Since</th>
                                            <th scope="col">Action</th>
                                        </tr>

                                        <tr>
                                            <th colSpan="12">
                                                <div className="row">
                                                    <div style={{
                                                        float: "left",
                                                        width: "50%",
                                                        padding: "8px 20px",
                                                        height: "50px"
                                                    }} >
                                                        <div style={{ display: 'flex' }}>
                                                            <input type="text" className="inputetype"

                                                                onChange={(e) => {
                                                                    setsearchterm(e.target.value);
                                                                }}
                                                                placeholder="Search.." name="search" />
                                                            <button type="submit" className='btn-primary' style={{ color: "White", padding: "9px 7px", backgroundColor: "transparent" }}>
                                                                <i className="fa fa-search"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        float: "left",
                                                        width: "50%",
                                                        padding: "10px 20px",
                                                        height: "50px"
                                                    }} >
                                                        <button onClick={() => { changeStatus('MY') }} className='btn-primary' style={{ color: "White", margin: "0 20px", padding: "6px 30px", fontSize: "15px" }} className={status === 'MY' ? "active-link" : ""}>My Customers</button>
                                                        <button onClick={() => { changeStatus('ALL') }} className='btn-primary' style={{ color: "White", margin: "0 20px", padding: "6px 30px", fontSize: "15px" }} className={status === 'ALL' ? "active-link" : ""}>All Customers</button>

                                                    </div>
                                                </div>
                                                <div>

                                                    <div style={{ float: "left", margin: "12px", display: "flex" }}>
                                                        <button onClick={() => { fistWeek() }} className='btn-primary' style={{ color: "White", margin: "0 20px", padding: "6px 30px", fontSize: "15px" }} className={datatype === 'THIS_WEEK' ? "active-link" : ""}>THIS WEEK</button>
                                                        <button onClick={() => { currentMonth() }} className='btn-primary' style={{ color: "White", margin: "0 20px", padding: "6px 30px", fontSize: "15px" }} className={datatype === 'THIS_MONTH' ? "active-link" : ""}>THIS MONTH</button>
                                                        <button onClick={() => { lastMonth() }} className='btn-primary' style={{ color: "White", margin: "0 20px", padding: "6px 30px", fontSize: "15px" }} className={datatype === 'LAST_MONTH' ? "active-link" : ""}>LAST MONTH</button>
                                                        <button onClick={() => { customDate() }} className='btn-primary' style={{ color: "White", margin: "0 20px", padding: "6px 30px", fontSize: "15px" }} className={datatype === 'CUSTOM_DATE' ? "active-link" : ""}>CUSTOM DATE</button>
                                                    </div>
                                                    <br />
                                                    {datatype === 'CUSTOM_DATE' ?
                                                        <div style={{ margin: "5px 60px" }}>

                                                            <div style={{
                                                                float: "left",
                                                                width: "40%",
                                                                padding: "10px",
                                                                height: "60px", display: "flex"
                                                            }} >

                                                                <span style={{ padding: "10px 6px", fontSize: "16px", width: "33%" }}>Start Date</span>
                                                                <input type="date" name="startdate" style={{ width: "70%" }} required onChange={(e) => { handleChange(e) }} />

                                                            </div >
                                                            <div style={{
                                                                float: "left",
                                                                width: "40%",
                                                                padding: "10px",
                                                                height: "60px", display: "flex"
                                                            }} >

                                                                <span style={{ padding: "10px 6px", fontSize: "16px", width: "33%" }}>End Date</span>
                                                                <input type="date" style={{ width: "70%" }} name="enddate" required onChange={(e) => { handleChange(e) }} />
                                                                <button onClick={() => { submitDate() }} type="submit" className='btn-primary' style={{ color: "White", padding: "9px 7px", backgroundColor: "transparent" }}>
                                                                    <i className="fa fa-search"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        : null}
                                                </div>
                                            </th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {
                                            data.filter((val) => {
                                                if (searchterm === '') {
                                                    return true;

                                                }
                                                else if (
                                                    val.name.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                    val.city.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                    val.email.toLowerCase().includes(searchterm.toLowerCase())


                                                ) {
                                                    return true;

                                                }
                                                else return false


                                            }).map(((entry) => (
                                                <tr key={entry.id}>

                                                    <td>{entry.name}</td>
                                                    <td>{entry.phone}</td>
                                                    <td>{entry.email}</td>
                                                    <td>{entry.city}</td>
                                                    <td>{unixTimeConverter(entry.addedon)}</td>
                                                    <td>

                                                        <span onClick={() => { showproject(entry.id, entry.name) }} style={{ color: "white" }}>
                                                            <button>
                                                                <i className="fa fa-tasks"></i>
                                                            </button>
                                                        </span>

                                                        &nbsp;
                                                        {/* &nbsp;
                                                        <span onClick={() => { showeditpage(entry.id) }} style={{ color: "white" }}>
                                                            <button>
                                                                <i className="fa fa-edit"></i>
                                                            </button>
                                                        </span>
                                                        &nbsp; */}
                                                        &nbsp;

                                                        <span onClick={() => { showDetails(entry.id) }} style={{ color: "white" }}>
                                                            <button>
                                                                <i className="fa fa-info-circle"></i>

                                                            </button>
                                                        </span>
                                                        &nbsp;
                                                        {/* &nbsp;
                                                        <span onClick={() => { deleteemployee(entry.id) }} style={{ color: "white" }}>
                                                            <button>
                                                                <i class="fa fa-trash"></i>

                                                            </button>
                                                        </span> */}


                                                    </td>

                                                </tr>
                                            )))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}
