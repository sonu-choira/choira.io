import React, { useEffect, useState } from "react";
import "./employee.scss";
import axios from "axios";
import Swal from "sweetalert2";
import { httpUrl } from '../../../restservice'

export default function ManageEmployees(props) {

    const [data, setData] = useState([]);
    const [searchterm, setsearchterm] = useState('');

    const { displayedit } = props
    const { showdetailpage } = props
    const { showaddpage } = props

    // let apiCallInit = true;

    useEffect(() => {

        axios.get(httpUrl + 'employee')
            .then(responce => {
                setData([...responce.data])
                console.log(responce.data)
            });
    }, [])


    const shodetail = (sendableId) => {
        showdetailpage(sendableId)
    }

    const showedit = (sendableId) => {
        displayedit(sendableId)
    }

    function getToTitles(str) {
        let string = str.replace(/_/g, ' ');
        return toTitles(string);
    }
    function toTitles(s) {
        return s.replace(/\w\S*/g, function (t) { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); });
    }



    function deleteemployee(id) {
        axios.delete(httpUrl + 'employee/' + id)
            .then(responce => {
                Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                );
                console.log(responce)
                axios.get(httpUrl + 'employee')
                    .then(responce => {
                        setData([...responce.data])
                        console.log(responce.data)
                    });
            }).catch(error => {
                twoprojectdelete(id)
                console.log(error)
            })
    }

    function twoprojectdelete(id) {

        Swal.fire({
            title: 'Are you sure?',
            text: 'If you Delet It All User Assign To This ARM Will Automatically Reassign',
            type: 'Warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                axios.delete(httpUrl + 'employee/update/' + id)
                    .then(responce => {
                        Swal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                        );
                        console.log(responce)
                        axios.get(httpUrl + 'employee')
                            .then(responce => {
                                setData([...responce.data])
                                console.log(responce.data)
                            });
                    }).catch(error => {
                        Swal.fire({
                            icon: 'warning',
                            title: "Can Not Assign Project To Artist Manager Please Add New Artist Manager",

                        });
                    })


            }
        });


    }



    return (
        <div className="card">
            <div className="card-body ">
                <div className="col-md-12 col-sm-12 col-xs-12 text-capitalize">
                    <div className="panel panel-default cart-border">
                        <div className="panel-heading panel-style">
                            <span>
                                <h3 style={{ color: "#ffc701" }} >
                                    <span style={{ float: "left" }}>Manage Artist </span></h3>
                            </span>
                            <span onClick={() => { showaddpage() }} title="Add Artist" style={{ float: "right", cursor: "pointer" }}>
                                <i className="fa fa-plus"></i>
                            </span>
                        </div>

                        <div className="panel-body">
                            <div className="table-responsive table-style">
                                <table id="projects">
                                    <thead>
                                        <tr>
                                            <th >Name</th>
                                            <th >Designation</th>
                                            <th >Phone</th>
                                            <th >Email</th>
                                            <th >City</th>
                                            <th >Action</th>
                                        </tr>

                                        <tr>
                                            <th colSpan="12">
                                                <div className='Search'>

                                                    <input type="text" className="inputetype"

                                                        onChange={(e) => {
                                                            setsearchterm(e.target.value);
                                                        }}
                                                        placeholder="Search By Name,Designation,Email,City" name="search" />
                                                    <button type="submit" className='btn-primary' style={{ color: "White" }}>
                                                        <i class="fa fa-search"></i>

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
                                                val.designation.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                val.email.toLowerCase().includes(searchterm.toLowerCase()) ||
                                                val.city.toLowerCase().includes(searchterm.toLowerCase())) {
                                                return true;

                                            }
                                            else return false

                                        }).map(((entry, _index) => (
                                            <tr key={entry.id}>

                                                <td>{entry.name}</td>
                                                <td>{entry.designation}</td>
                                                <td>{entry.phone}</td>
                                                <td>{entry.email}</td>
                                                <td>{getToTitles(entry.city)}</td>
                                                <td>


                                                    <span onClick={() => { shodetail(entry.id) }} title="Artist Detail" style={{ color: "white" }}>
                                                        <button>
                                                            <i className="fa fa-info-circle"></i>
                                                        </button>
                                                    </span>
                                                    &nbsp;
                                                    &nbsp;
                                                    <span onClick={() => { showedit(entry.id) }} title="Artist Update" style={{ color: "white" }}>
                                                        <button>
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                    </span>
                                                    &nbsp;
                                                    &nbsp;
                                                    <span onClick={() => { deleteemployee(entry.id) }} style={{ color: "white" }}>
                                                        <button>
                                                            <i class="fa fa-trash"></i>
                                                        </button>
                                                    </span>


                                                </td>

                                            </tr>
                                        )))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
