import React, { useEffect, useState } from "react";
import "./project.scss";
import axios from "axios";
import Swal from "sweetalert2";
import { httpUrl } from '../../../restservice'

export default function ManageProjects(props) {

    const [data, setData] = useState([]);
    const [searchterm, setsearchterm] = useState('');
    const { showDetails } = props




    const updateTable = () => {
        if (localStorage.getItem("userData") !== null) {

            let userID = JSON.parse(localStorage.getItem("userData")).id
            axios.get(httpUrl +  'project?manager='+userID)
                .then(responce => {
                    let armProject = responce.data.filter(entry => entry.manager === userID)
                    setData([...armProject])
                    setData([...responce.data])
                    
                    // alert('ssss',checked)


                });
        }
    }


    useEffect(() => {
        updateTable()
    }, [])



    function statuschange(id, status) {

        let updateproject = {
            id: id,
            status: "ACTIVE"
        }

        if (status === "ACTIVE") {
            updateproject.status = "IN_ACTIVE"
            // setPageSelection(2)
            //  Swal.fire({
            //     icon: 'success',
            //     title: "Project Is In Active",
            //     type: 'success',
            //   })

        }

        console.log("updateproject")
        console.log(updateproject)



        axios.post(httpUrl +  'project/update', updateproject)
            .then(responce => {
                // setData([...responce.data])
                console.log(responce.data)
                updateTable()
            });


    }

    function changePayment(id) {

        let updateproject = {
            id: id,
            paymentstatus: "COMPLETED"
        }

        axios.post(httpUrl +  'project/update', updateproject)
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

                axios.delete(httpUrl +  'project/' + id)
                    .then(responce => {
                        Swal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                        );
                        console.log(responce)
                    });


            }
        });
    }

    function selectCustomer(id, projectId) {
        localStorage.setItem("selectedProjectID", id)
        showDetails(id, projectId);
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
                            <h3 style={{ color: "#ffc701", textAlign: "left" }} className="headerproper">
                                <span>Manage Projects</span></h3>
                        </div>

                        <div className="panel-body">
                            <div className="table-responsive table-style">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th>Customer</th>
                                            <th scope="col">Project Type</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col">Faqs</th>
                                            <th scope="col">Payment <br />Status</th>
                                            <th scope="col">Project <br />Status</th>
                                            <th scope="col">Action</th>
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

                                                    <td >{entry.name}</td>
                                                    <td >{entry.custname}</td>
                                                    <td>{getToTitles(entry.projecttype)}</td>
                                                    <td>{toTitleCase(entry.genre)}</td>
                                                    <td>{toTitleCase(entry.faqs)}</td>
                                                    <td>{getToTitles(entry.paymentstatus)}</td>
                                                    <td>{getToTitles(entry.status)}</td>
                                                    <td>




                                                        {entry.status === "IN_ACTIVE" ?
                                                            <span onClick={() => { statuschange(entry.id, entry.status) }} title="Project Inactive" style={{ color: "white" }}>
                                                                <button>
                                                                    <i class="fa fa-thumbs-down"></i>
                                                                </button>
                                                            </span>
                                                            :
                                                            <span onClick={() => { statuschange(entry.id, entry.status) }} title="Project Active" style={{ color: "white" }}>
                                                                <button>
                                                                    <i class="fa fa-thumbs-up"></i>
                                                                </button>
                                                            </span>
                                                        }
                                                        &nbsp;
                                                        &nbsp;
                                                        <span onClick={() => { selectCustomer(entry.customer, entry.id) }} title="Project Detail" style={{ color: "white" }}>
                                                            <button>
                                                                <i className="fa fa-info-circle"></i>
                                                            </button>
                                                        </span>
                                                        &nbsp;
                                                        &nbsp;
                                                        {entry.paymentstatus === "NOT_COMPLETED" ? (
                                                            <span onClick={() => { changePayment(entry.id) }} title="Payment Not Completed" style={{ color: "white" }}>
                                                                <button>
                                                                    <i className="fa fa-money-bill-alt"></i>
                                                                </button>
                                                            </span>
                                                        ) : null}
                                                        &nbsp;
                                                        &nbsp;
                                                        {/* <span onClick={() => { deleteemployee(entry.id) }} style={{ color: "white" }}>
                                                            <button>
                                                                <i class="fa fa-trash"></i>
                                                            </button>
                                                        </span> */}

                                                        {/* <span onClick={() => {showId(entry.id)}} style={{color:"white"}}>
                                                   <button>
                                                   <i className ="fa fa-edit"></i>
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
                </div >
            </div >
        </div>

    )
}
