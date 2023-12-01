import React, { useEffect, useState } from "react";
import "./project.scss";
import axios from "axios";
import Swal from "sweetalert2";
import { httpUrl, docServerUrl } from '../../../restservice'

let custname
export default function ManageProjects(props) {

    // const [check, setCheck] = useState('');
    const [data, setData] = useState([]);
    const [searchterm, setsearchterm] = useState('');
    // const [pageSelection, setPageSelection] = useState(checked)
    const { showeditpage, showDetails } = props





    const updateTable = () => {
   
        axios.get(httpUrl + 'project')
            .then(responce => {
                
                const sorted = responce.data.sort(function(x, y){
                    return y.addedon - x.addedon;
                })
                // setData([...responce.data])
                setData([...sorted])
                console.log("sorted :",sorted)
                if (responce.data[0]) {
                    custname = responce.data[0].customer;
                }
                // alert(responce.data[0].name);
                // alert('ssss',checked)


            });
    }



    const showId = (senidd, cusname) => {
        showeditpage(senidd, cusname)
    }

    useEffect(() => {
        updateTable()
    }, [])



    function statuschange(id, status) {

        let updateproject = {
            id: id
        }

        if (status === "ACTIVE") {
            updateproject.status = "IN_ACTIVE"
            // setPageSelection(2)
        } else if (status === "IN_ACTIVE") {
            updateproject.status = "ACTIVE"
        } else if (status === "COMPLETED") {
            updateproject.paymentstatus = "NOT_COMPLETED"
        } else if (status = "NOT_COMPLETED") {
            updateproject.paymentstatus = "COMPLETED"
        }

        console.log("updateproject")
        console.log(updateproject)


        axios.post(httpUrl + 'project/update', updateproject)
            .then(responce => {
                // setData([...responce.data])
                console.log(responce.data)
                updateTable()
            });


    }

    function getToTitles(str) {
        let string = str.replace(/_/g, ' ');
        return toTitles(string);
    }

    function toTitles(s) { return s.replace(/\w\S*/g, function (t) { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); }); }

    function deleteemployee(id) {

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            type: 'Warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                axios.delete(httpUrl + 'project/' + id)
                    .then(responce => {
                        Swal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                        );
                        updateTable();
                        console.log(responce)
                    });


            }
        });
    }

    function selectCustomer(id, projectid) {
        localStorage.setItem("selectedCustomerID", id)
        showDetails(projectid);
    }

    function toTitleCase(str) {
        if (str) {
            let convertedStr = str.replaceAll("_", " ");
            return convertedStr.replace(
                /\w\S*/g,
                function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        }
        else {
            return ""
        }
    }

    return (
        <div className="card">
            <div className="card-body ">
                <div className="col-md-12 col-sm-12 col-xs-12 text-capitalize">
                    <div className="panel panel-default cart-border">
                        <div className="panel-heading panel-style">
                            <h3 style={{ color: "#ffc701" }} className="headerproper">
                                <span style={{ float: "left" }}>Manage Projects</span></h3>
                        </div>

                        <div className="panel-body">
                            <div className="table-responsive table-style">
                                <table id='projects'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Customer</th>
                                            <th>Project Type</th>
                                            <th>Genre</th>
                                            <th>Faqs</th>
                                            <th>Payment <br />Status</th>
                                            <th>Project <br />Status</th>
                                            <th>Action</th>
                                        </tr>

                                        <tr>
                                            <th colSpan="12">
                                                <div className='Search'>

                                                    <input type="text" className="inputetype"

                                                        onChange={(e) => {
                                                            setsearchterm(e.target.value);
                                                        }}
                                                        placeholder="Search By Name,Project Type,Genre,Faqs,Customer" name="search" />
                                                    <button type="submit" className='btn-primary' style={{ color: "White" }}>
                                                        <i class="fa fa-search"></i>

                                                    </button>

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
                                                    val.projecttype.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                    val.genre.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                    val.custname.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                    val.faqs.toLowerCase().includes(searchterm.toLowerCase())


                                                ) {
                                                    return true;

                                                }
                                                else return false


                                            }).map(((entry) => (
                                                <tr key={entry.id}>

                                                    <td>{entry.name}</td>
                                                    <td>{entry.custname}</td>
                                                    <td>{getToTitles(entry.projecttype)}</td>
                                                    <td>{toTitleCase(entry.genre)}</td>
                                                    <td>{toTitleCase(entry.faqs)}</td>
                                                    <td>{getToTitles(entry.paymentstatus)}</td>
                                                    <td>{getToTitles(entry.status)}</td>
                                                    <td>


                                                        {/* <span onClick={() => {showId(entry.id)}} style={{color:"white"}}>
                                                   <button>
                                                   <i className ="fa fa-edit"></i>
                                                    </button>
                                                        </span> */}

                                                        {entry.status === "IN_ACTIVE" ?
                                                            <span onClick={() => { statuschange(entry.id, entry.status) }} title="Project Inactive" style={{ color: "white" }}>
                                                                <button>
                                                                    <i class="fa fa-thumbs-down"></i>
                                                                </button>
                                                            </span>
                                                            :
                                                            <span onClick={() => { statuschange(entry.id, entry.status) }} title="project Active" style={{ color: "white" }}>
                                                                <button>
                                                                    <i class="fa fa-thumbs-up"></i>
                                                                </button>
                                                            </span>
                                                        }
                                                        &nbsp;

                                                        <span onClick={() => { showId(entry.id, entry.customer) }} title="Project Update" style={{ color: "white" }}>
                                                            <button>
                                                                <i className="fa fa-edit"></i>
                                                            </button>
                                                        </span>
                                                        &nbsp;

                                                        <span onClick={() => { selectCustomer(entry.customer, entry.id) }} title="Project Detail" style={{ color: "white" }}>
                                                            <button>
                                                                <i className="fa fa-info-circle"></i>
                                                            </button>
                                                        </span>
                                                        &nbsp;

                                                        {/* <span onClick={() => { deleteemployee(entry.id) }} style={{ color: "white" }}>
                                                            <button>
                                                                <i className="fa fa-times-circle"></i>
                                                            </button>
                                                        </span> */}

                                                        <span onClick={() => { deleteemployee(entry.id) }} title="Project Delete" style={{ color: "white" }}>
                                                            <button>
                                                                <i class="fa fa-trash"></i>
                                                            </button>
                                                        </span>


                                                        &nbsp;
                                                        {entry.paymentstatus === "NOT_COMPLETED" ?
                                                            <span onClick={() => { statuschange(entry.id, entry.paymentstatus) }} title="Payment Not Completed" style={{ color: "white" }}>
                                                                <button>
                                                                    <i class="fa fa-money-bill-alt"></i>
                                                                </button>
                                                            </span>
                                                            :null
                                                            // <span onClick={() => { statuschange(entry.id, entry.paymentstatus) }} title="Project completed" style={{ color: "white" }}>
                                                            //     <button>
                                                            //         <i class="fa fa-thumbs-up"></i>
                                                            //     </button>
                                                            // </span>
                                                        }


                                                    </td>

                                                </tr>
                                            )))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div>

    )
}
