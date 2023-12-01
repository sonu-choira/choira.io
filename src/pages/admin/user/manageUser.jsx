import React, { useEffect, useState } from "react";
import "./userstyle.scss";
import axios from "axios";
import Swal from "sweetalert2";
import { httpUrl } from '../../../restservice'

let managerid = 0
let dateData = {};

export default function ManageUser(props) {

    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [projectlist, setproject] = useState([]);
    const [projectid, setprojectid] = useState("0");
    const [searchterm, setsearchterm] = useState('');
    const [pageSelection, setPageSelection] = useState(1)

    const { showDetailsPage } = props
    const { showpage } = props
    const { showaddpage } = props
    const { showuseredit } = props

    const [datatype, setDatatype] = useState('ALL_USER');


    useEffect(() => {
        loadData()
        getartistlist()

    }, [])



    const showDetails = sendableId => {
        showDetailsPage(sendableId)
    }

    const showadddpage = () => {
        showaddpage();
    }

    const showeditpage = sendableId => {
        showuseredit(sendableId);
    }

    const showproject = (sendableId, name) => {
        showpage(sendableId, name)
    }

    const backpage = () => {
        setPageSelection(1)
    }
    const assignartist = (cusid) => {
        // setPageSelection(2)
        getpage1(cusid)
    }

    const getpage1 = (cusid) => {
        axios.get(httpUrl + 'customer/' + cusid)
            .then(response => {
                if (response.data) {

                    setPageSelection(2)
                    setproject({ ...response.data })
                    managerid = response.data.id
                    setprojectid(response.data.manager)
                    console.log(managerid)
                    console.log(response.data)
                }
                else {
                    Swal.fire({
                        icon: 'warning',
                        title: "Project Not Added",
                    });
                }

            });

    }

    const loadData = () => {

        axios.get(httpUrl + 'customer')
            .then(response => {
                setData([...response.data])
                console.log(response.data)
                setDatatype('ALL_USER')
            });


    }

    const getartistlist = () => {
        axios.get(httpUrl + 'employee')
            .then(response => {
                setList([...response.data])
                console.log('ye data hai')
                console.log(response.data)
            });
    }


    const changeemployee = () => {
        console.log(managerid)
        console.log("ye aa raha hai")
        console.log(projectid)

        let employeech = {
            id: managerid,
            manager: projectid
        }
        axios.post(httpUrl + 'customer/update', employeech)
            .then(responce => {
                // this.state.fields = fields
                Swal.fire({
                    icon: 'success',
                    title: 'Artist Manager Updated Successfully',
                })
                backpage()
                console.log(responce.data)
            })
    }
    //    alert(managerid)
    function deleteemployee(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this customer data!',
            type: 'Warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {

                axios.delete(httpUrl + 'customer/' + id)
                    .then(responce => {
                        Swal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                        );
                        console.log(responce)
                        loadData()
                    });


            }
        });
    }

    function unixTimeConverter(unixTime) {
        const date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(unixTime);
        return date;
    }

    const handleChange = (e) => {
        dateData[e.target.name] = e.target.value;
    }

    function getToTitles(str) {
        let string = str.replace(/_/g, ' ');
        return toTitles(string);
    }

    function toTitles(s) { return s.replace(/\w\S*/g, function (t) { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); }); }

    function fistWeek() {

        axios.get(httpUrl + 'customer?type=THISWEEK')
            .then(responce => {
                setData([...responce.data])
                setDatatype('THISWEEK')
                console.log(responce.data)
            });
    }
    function lastMonth() {

        axios.get(httpUrl + 'customer?type=LASTMONTH')
            .then(responce => {
                setData([...responce.data])
                setDatatype('LASTMONTH')
                console.log(responce.data)
            });
    }
    function currentMonth() {

        axios.get(httpUrl + 'customer?type=THISMONTH')
            .then(responce => {
                setData([...responce.data])
                setDatatype('THISMONTH')
                console.log(responce.data)
            });
    }

    function customDate() {
        setDatatype('CUSTOM_DATE')
    }

    function submitDate() {
        let startdate = dateData.startdate;
        let enddate = dateData.enddate;
        axios.get(httpUrl + 'customer?startdate=' + startdate + '&enddate=' + enddate)
            .then(responce => {
                setData([...responce.data])
                setDatatype('CUSTOM_DATE')
                console.log(responce.data)
            });
    }

    return (
        <div>
            {pageSelection === 1 ?
                <div className="card">
                    <div className="card-body ">
                        <div className="col-md-12 col-sm-12 col-xs-12 text-capitalize">
                            <div className="panel panel-default cart-border">
                                <div className="panel-heading panel-style">
                                    <h3 style={{ color: "#ffc701" }}>
                                        <span style={{ float: "left" }}>Manage User</span>
                                        <span style={{ float: "right", cursor: "pointer" }} title="Add User" onClick={() => { showadddpage() }} >
                                            <i className="fa fa-plus"></i></span>

                                    </h3>
                                </div>

                                <div className="panel-body">
                                    <div className="table-responsive table-style">
                                        <table id="projects">
                                            <thead>
                                                <tr>
                                                    <th >Name</th>
                                                    <th >Phone</th>
                                                    <th >Email</th>
                                                    <th >City</th>
                                                    <th >Since</th>
                                                    <th >Action</th>
                                                </tr>

                                                <tr>
                                                    <th colSpan="12">
                                                        <div className="row">
                                                            <div style={{
                                                                float: "left",
                                                                width: "30%",
                                                                padding: "8px 0",
                                                                height: "50px"
                                                            }} >
                                                                <div style={{ display: 'flex' }}>
                                                                    <input type="text" className="inputetype"

                                                                        onChange={(e) => {
                                                                            setsearchterm(e.target.value);
                                                                        }}
                                                                        placeholder="Search By Name,City,Email" name="search" />
                                                                    <button type="submit" className='btn-primary' style={{ color: "White", padding: "9px 7px", backgroundColor: "transparent" }}>
                                                                        <i className="fa fa-search"></i>

                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div style={{ float: "left", margin: "12px", display: "flex" }}>
                                                                <button onClick={() => { loadData() }} className='btn-primary' style={{ color: "White", margin: "0 12px", padding: "6px 20px", fontSize: "15px" }} className={datatype === 'ALL_USER' ? "active-link" : ""}>ALL</button>
                                                                <button onClick={() => { fistWeek() }} className='btn-primary' style={{ color: "White", margin: "0 12px", padding: "6px 20px", fontSize: "15px" }} className={datatype === 'THISWEEK' ? "active-link" : ""}>THIS WEEK</button>
                                                                <button onClick={() => { currentMonth() }} className='btn-primary' style={{ color: "White", margin: "0 12px", padding: "6px 20px", fontSize: "15px" }} className={datatype === 'THISMONTH' ? "active-link" : ""}>THIS MONTH</button>
                                                                <button onClick={() => { lastMonth() }} className='btn-primary' style={{ color: "White", margin: "0 12px", padding: "6px 20px", fontSize: "15px" }} className={datatype === 'LASTMONTH' ? "active-link" : ""}>LAST MONTH</button>
                                                                <button onClick={() => { customDate() }} className='btn-primary' style={{ color: "White", margin: "0 12px", padding: "6px 20px", fontSize: "15px" }} className={datatype === 'CUSTOM_DATE' ? "active-link" : ""}>CUSTOM DATE</button>
                                                            </div>
                                                            <br />
                                                            {datatype === 'CUSTOM_DATE' ?
                                                                <div className="row">
                                                                    <div style={{
                                                                        float: "left",
                                                                        width: "33%",
                                                                        padding: "8px 0px",
                                                                        height: "50px"
                                                                    }}></div>
                                                                    <div style={{
                                                                        float: "left",
                                                                        width: "32%",
                                                                        padding: "10px 0",
                                                                        height: "60px", display: "flex"
                                                                    }} >

                                                                        <span style={{ padding: "10px 6px", fontSize: "16px", width: "33%" }}>Start Date</span>
                                                                        <input type="date" name="startdate" style={{ width: "70%" }} required onChange={(e) => { handleChange(e) }} />

                                                                    </div >
                                                                    <div style={{
                                                                        float: "left",
                                                                        width: "32%",
                                                                        padding: "10px 0",
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
                                                            <td>{getToTitles(entry.city)}</td>
                                                            <td>{unixTimeConverter(entry.addedon)}</td>
                                                            <td>


                                                                <span onClick={() => { showproject(entry.id, entry.name) }} title="User Project" style={{ color: "white" }}>
                                                                    <button>
                                                                        <i className="fa fa-tasks"></i>
                                                                    </button>
                                                                </span>

                                                                &nbsp;
                                                                &nbsp;
                                                                <span onClick={() => { showeditpage(entry.id) }} title="User Update" style={{ color: "white" }}>
                                                                    <button>
                                                                        <i className="fa fa-edit"></i>
                                                                    </button>
                                                                </span>
                                                                &nbsp;
                                                                &nbsp;

                                                                <span onClick={() => { showDetails(entry.id) }} title="User Detail" style={{ color: "white" }}>
                                                                    <button>
                                                                        <i className="fa fa-info-circle"></i>

                                                                    </button>
                                                                </span>
                                                                &nbsp;
                                                                &nbsp;
                                                                <span onClick={() => { assignartist(entry.id) }} title="Assign Artist Manager" style={{ color: "white" }}>
                                                                    <button>
                                                                        <i className="fa fa-th"></i>

                                                                    </button>
                                                                </span>
                                                                &nbsp;
                                                                &nbsp;
                                                                <span onClick={() => { deleteemployee(entry.id) }} title="User Delete" style={{ color: "white" }}>
                                                                    <button>
                                                                        <i class="fa fa-trash"></i>

                                                                    </button>
                                                                </span>


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

                : null}

            {
                pageSelection === 2 ?
                    <div className="card">
                        <div className="card-body ">
                            <div className="col-md-12 col-sm-12 col-xs-12 text-capitalize">
                                <div className="panel panel-default cart-border">
                                    <div className="panel-heading panel-style">
                                        <h3 style={{ color: "#ffc701" }}>
                                            <span style={{ float: "left" }}>Artist Assign</span>


                                        </h3>
                                    </div>

                                    <div className="panel-body">
                                        <div className="table-responsive table-style">
                                            <div style={{ margin: "41px" }}>
                                                <p style={{ fontSize: "19px", marginBottom: "9px", textAlign: "left" }}>Select Artist</p>
                                                <select id="dropdown" name="id" value={projectid} onChange={e => { setprojectid(e.target.value) }} style={{ width: "100%", padding: "14px", borderRadius: "12px" }}>
                                                    <option value="0">Select Artist</option>
                                                    {list.map((e) => {

                                                        return <option value={e.id}>{e.name}</option>
                                                    })}
                                                </select>


                                            </div>
                                            <div style={{ margin: "41px" }}>
                                                <div>
                                                    <button type="submit" onClick={() => { changeemployee() }} className='btn-primary' style={{ color: "White", float: "left", marginRight: "12px" }}>
                                                        Submit
                                                    </button>
                                                    &nbsp;
                                                    &nbsp;
                                                    <button type="cancel" onClick={() => { backpage() }} className='btn-primary' style={{ color: "White", float: "left" }}>
                                                        Cancel
                                                    </button>

                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >


                    : null
            }

        </div>
    )
}
