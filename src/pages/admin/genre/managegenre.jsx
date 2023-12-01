import React, { useEffect, useState } from "react";
import "./genre.scss";
import axios from "axios";
import Swal from "sweetalert2";
import { httpUrl } from '../../../restservice'


export default function Managegenre(props) {

    const [data, setData] = useState([]);
    const [searchterm, setsearchterm] = useState('');
    const [pageSelection, setPageSelection] = useState(1)
    const { showaddgenre } = props
    const { showEditgenre } = props

    useEffect(() => {
        loadData()


    }, [])

    const Addgen = () => {
        showaddgenre()
    }

    const editgenre = (sendableid) => {
        showEditgenre(sendableid)
    }



    const loadData = () => {
        axios.get(httpUrl + 'genre')
            .then(response => {
                setData([...response.data])
                console.log(response.data[0])

            });
    }



    //    alert(managerid)
    function deleteemployee(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Genre data!',
            type: 'Warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                axios.delete(httpUrl + 'genre/' + id)
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



    function getToTitles(str) {
        if (str) {
            let string = str.replace(/_/g, ' ');
            return toTitles(string);
        }
    }

    function toTitles(s) { return s.replace(/\w\S*/g, function (t) { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); }); }


    return (
        <div>
            {pageSelection === 1 ?
                <div className="card">
                    <div className="card-body ">
                        <div className="col-md-12 col-sm-12 col-xs-12 text-capitalize">
                            <div className="panel panel-default cart-border">
                                <div className="panel-heading panel-style">
                                    <h3 style={{ color: "#ffc701" }}>
                                        <span style={{ float: "left" }}>Manage Genre</span>
                                        <span style={{ float: "right", cursor: "pointer" }} title="Add Genre" onClick={() => { Addgen() }} >
                                            <i className="fa fa-plus"></i></span>

                                    </h3>
                                </div>

                                <div className="panel-body">
                                    <div className="table-responsive table-style">
                                        <table id="projects">
                                            <thead>
                                                <tr>
                                                    <th >Name</th>

                                                    <th >Action</th>
                                                </tr>

                                                <tr>
                                                    <th colSpan="12">
                                                        <div className='Search'>

                                                            <input type="text" className="inputetype"

                                                                onChange={(e) => {
                                                                    setsearchterm(e.target.value);
                                                                }}
                                                                placeholder="Search" name="search" />
                                                            <button type="submit" className='btn-primary' style={{ color: "White" }}>
                                                                <i className="fa fa-search"></i>

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
                                                            val.genre.toLowerCase().includes(searchterm.toLowerCase())
                                                        ) {
                                                            return true;

                                                        }
                                                        else return false


                                                    }).map(((entry) => (
                                                        <tr key={entry.id}>

                                                            <td>{getToTitles(entry.genre)}</td>
                                                            <td style={{ textAlign: "right" }}>



                                                                <span title="Genre Update" style={{ color: "white" }} onClick={() => { editgenre(entry.id) }}>
                                                                    <button>
                                                                        <i className="fa fa-edit"></i>
                                                                    </button>
                                                                </span>
                                                                &nbsp;
                                                                &nbsp;



                                                                <span onClick={() => { deleteemployee(entry.id) }} title="Genre Delete" style={{ color: "white" }}>
                                                                    <button>
                                                                        <i className="fa fa-trash"></i>

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



        </div>
    )
}
