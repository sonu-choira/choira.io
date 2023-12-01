import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.scss"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, ArcElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { httpUrl } from '../../../restservice'

export default function AdminDashboard() {

    const [totalData, setTotalData] = useState([]);
    const [monthData, setMonthData] = useState([]);
    const [userData, setUseData] = useState([]);
    const [projectType, setProjectType] = useState([]);
    const [projectGenre, setProjectGenre] = useState([]);
    const [projectFaqs, setProjectFaqs] = useState([]);

    const [totalTracks, setTracks] = useState([]);
    const [monthTracks, setMonthTracks] = useState([]);
    const [statusTrack, setStatusTrack] = useState([]);
    const [armTrack, setArmTrack] = useState([]);
    const [typeTrack, setTypeTrack] = useState([]);
    const [genreTrack, setGenreTrack] = useState([]);


    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        LineElement,
        ArcElement,
        Title,
        Tooltip,
        Legend
    );

    useEffect(() => {

        axios.get(httpUrl + 'stats/summery')
            .then(responce => {
                setTotalData([{ ...responce?.data }])
                console.log(responce.data)
            });

        axios.get(httpUrl + 'stats/project/monthly')
            .then(responce => {
                setMonthData([...responce?.data])
                console.log(responce.data)
            });

        axios.get(httpUrl + 'stats/customer/monthly')
            .then(responce => {
                setUseData([...responce?.data])
                console.log(responce.data)
            });

        axios.get(httpUrl + 'stats/chart?type=PROJECTTYPE')
            .then(responce => {
                setProjectType([...responce?.data])
                console.log(responce.data)
            });

        axios.get(httpUrl + 'stats/chart?type=PROJECTGENRE')
            .then(responce => {
                setProjectGenre([...responce?.data])
                console.log(responce.data)
            });

        axios.get(httpUrl + 'stats/chart?type=PROJECTFAQS')
            .then(responce => {
                setProjectFaqs([...responce?.data])
                console.log(responce.data)
            });
        //sales

        axios.get(httpUrl + 'stats/track/summery')
            .then(responce => {
                setTracks([{ ...responce?.data }])
                console.log(responce.data)
            });

        axios.get(httpUrl + 'stats/track/monthly')
            .then(responce => {
                setMonthTracks([...responce?.data])
                console.log(responce.data)
            });

        axios.get(httpUrl + 'stats/track/chart?type=STATUS')
            .then(responce => {
                setStatusTrack([...responce?.data])
                console.log(responce.data)
            });

        axios.get(httpUrl + 'stats/track/chart?type=ARM')
            .then(responce => {
                setArmTrack([...responce?.data])
                console.log(responce.data)
            });

        axios.get(httpUrl + 'stats/track/chart?type=TRACK')
            .then(responce => {
                setTypeTrack([...responce?.data])
                console.log(responce.data)
            });

        axios.get(httpUrl + 'stats/track/chart?type=GENRE')
            .then(responce => {
                setGenreTrack([...responce?.data])
                console.log(responce.data)
            });
    }, [])

    function getToTitles(str) {
        let string = str.replace(/_/g, ' ');
        return toTitles(string);;
    }

    function toTitles(s) { return s.replace(/\w\S*/g, function (t) { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); }); }

    function subString(s) {
        var Str = s.substr(0, 3);
        return Str;
    }

    function renderTableHeader() {
        return (
            <tr>
                <th style={{ width: '50%' }}>Details</th>
                <th style={{ width: '50%' }}>video/Audio</th>
            </tr>
        )
    };

    function renderTableDataProject() {
        return totalData.map((project, index) => {
            const { totalProject, totalActive, totalInactive, totalUser, totalAM, todayProject, currentmonthProject, lastmonthProject } = project
            return (
                <tr key={index}>
                    <td>
                        <ul><span>Total Project:</span></ul>
                        <ul><span>Active Project:</span></ul>
                        <ul><span>Inactive Project:</span></ul>
                        <ul><span>Total User:</span></ul>
                        <ul><span>Total Artist Manager:</span></ul>
                        <ul><span>Today's Project:</span></ul>
                        <ul><span>Current Month Project:</span></ul>
                        <ul><span>Last Month Project:</span></ul>
                    </td>
                    <td className="text-align-center">
                        <ul>{totalProject}</ul>
                        <ul>{totalActive}</ul>
                        <ul>{totalInactive}</ul>
                        <ul>{totalUser}</ul>
                        <ul>{totalAM}</ul>
                        <ul>{todayProject}</ul>
                        <ul>{currentmonthProject}</ul>
                        <ul>{lastmonthProject}</ul>
                    </td>
                </tr>
            )
        })
    };

    function renderTableDataTotalTracks() {
        return totalTracks.map((tracks, index) => {
            const { totalTracks, totalSold, totalPublished, totalSubmitted, todays, currentmonth, lastmonth, lastmonthGST } = tracks
            return (
                <tr key={index}>
                    <td>
                        <ul><span>Total Tracks:</span></ul>
                        <ul><span>Total Sold:</span></ul>
                        <ul><span>Total Published:</span></ul>
                        <ul><span>Total Submitted:</span></ul>
                        <ul><span>Todays:</span></ul>
                        <ul><span>Current Month:</span></ul>
                        <ul><span>Last Month:</span></ul>
                        <ul><span>Last Month GST:</span></ul>
                    </td>
                    <td className="text-align-center">
                        <ul>{totalTracks}</ul>
                        <ul>{totalSold}</ul>
                        <ul>{totalPublished}</ul>
                        <ul>{totalSubmitted}</ul>
                        <ul>{todays}</ul>
                        <ul>{currentmonth}</ul>
                        <ul>{lastmonth}</ul>
                        <ul>{lastmonthGST}</ul>
                    </td>
                </tr>
            )
        })
    };

    function renderTableDataProjectType() {
        const label2 = projectType.map(point => getToTitles(point.name))
        const projdata = projectType.map(point => point.count)
        const colordata = ["#0B1354", "#165BAA", "#A155B9", "#F765A3", "#FFA4B6", "#F9D1D1"]
        return (

            <div style={{ maxWidth: "300px" }}>
                <Doughnut
                    data={{
                        labels: label2,
                        datasets: [{
                            label: "Total Type",
                            data: projdata,
                            backgroundColor: colordata,
                            borderColor: ["#fff"],
                            fill: false,
                            lineTension: 0.4
                        }]
                    }} />
            </div>

        )
    };

    function renderTableDataProjectGenre() {
        const label3 = projectGenre.map(point => getToTitles(point.name))
        const gendata = projectGenre.map(point => point.count)
        const colordata = ["#F9D1D1", "#FFA4B6", "#F765A3", "#A155B9", "#165BAA", "#OB1354"]
        return (
            <div style={{ maxWidth: "300px" }}>
                <Doughnut
                    data={{
                        labels: label3,
                        datasets: [{
                            label: "Total Genre",
                            data: gendata,
                            backgroundColor: colordata,
                            borderColor: ["#fff"],
                            fill: false,
                            lineTension: 0.4
                        }]
                    }} />
            </div>
        )
        // })
    };

    function renderTableDataProjectFaqs() {
        const label1 = projectFaqs.map(point => getToTitles(point.name))
        const faqsdata = projectFaqs.map(point => point.count)
        const colordata = ["#F9D1D1", "#FFA4B6", "#F765A3", "#A155B9", "#165BAA", "#OB1354"]
        return (
            <div style={{ maxWidth: "300px" }}>
                <Doughnut
                    data={{
                        labels: label1,
                        datasets: [
                            {
                                label: "Total Help",
                                data: faqsdata,
                                backgroundColor: colordata,
                                borderColor: ["#fff"],
                                borderWidth: 0.5,
                            },
                        ]
                    }}

                />
            </div>
        )
    };

    function renderTableDataMonth() {
        const label4 = monthData.map(point => subString(point.month) + '-' + point.year)
        const monthdata = monthData.map(point => point.count);
        const options = {
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
                color: '#9de219'
            },
        }
        return (
            // <tr>
            //     <td>
            //         <ul><span>Total count:</span>{count}</ul>
            //         <ul><span>Total month:</span>{month}</ul>
            //         <ul><span>Total monthNo:</span>{monthNo}</ul>
            //         <ul><span>Total qvalue:</span>{qvalue}</ul>
            //         <ul><span>Total year:</span>{year}</ul>
            //     </td>
            // </tr>

            <div style={{ maxWidth: "650px" }}>
                <Bar
                    data={{
                        labels: label4,
                        datasets: [
                            {
                                label: "Total Projects ",
                                data: monthdata,
                                backgroundColor: ["#F765A3"],
                                borderColor: ["#fff"],
                                borderWidth: 0.5,
                            },
                        ]
                    }}

                />
            </div>
        )
        // })
    };

    function renderTableDataINMonthUser() {
        const label4 = userData.map(point => subString(point.month) + '-' + point.year)
        const monthdata = userData.map(point => point.count);
        return (
            <div style={{ maxWidth: "650px" }}>
                <Bar
                    data={{
                        labels: label4,
                        datasets: [
                            {
                                label: "Total Users",
                                data: monthdata,
                                backgroundColor: ["#165BAA"],
                                borderColor: ["#fff"],
                                borderWidth: 0.5,
                            },
                        ]
                    }}

                />
            </div>
        )
    }

    function renderTableDataMonthTracks() {
        const label4 = monthTracks.map(point => subString(point.month) + '-' + point.year)
        const monthdata = monthData.map(point => point.count);
        const options = {
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
                color: '#9de219'
            },
        }
        return (

            <div style={{ maxWidth: "650px" }}>
                <Bar
                    data={{
                        labels: label4,
                        datasets: [
                            {
                                label: "Total Projects ",
                                data: monthdata,
                                backgroundColor: ["#F765A3"],
                                borderColor: ["#fff"],
                                borderWidth: 0.5,
                            },
                        ]
                    }}

                />
            </div>
        )
        // })
    };

    function renderTableDataTrackStatus() {
        const label1 = statusTrack.map(point => getToTitles(point.name))
        const faqsdata = statusTrack.map(point => point.count)
        const colordata = ["#F9D1D1", "#FFA4B6", "#F765A3", "#A155B9", "#165BAA", "#OB1354"]
        return (
            <div style={{ maxWidth: "300px" }}>
                <Doughnut
                    data={{
                        labels: label1,
                        datasets: [
                            {
                                label: "Total Help",
                                data: faqsdata,
                                backgroundColor: colordata,
                                borderColor: ["#fff"],
                                borderWidth: 0.5,
                            },
                        ]
                    }}

                />
            </div>
        )
    }

    function renderTableDataTracks() {
        const label1 = typeTrack.map(point => getToTitles(point.name))
        const faqsdata = typeTrack.map(point => point.count)
        const colordata = ["#F9D1D1", "#FFA4B6", "#F765A3", "#A155B9", "#165BAA", "#OB1354"]
        return (
            <div style={{ maxWidth: "300px" }}>
                <Doughnut
                    data={{
                        labels: label1,
                        datasets: [
                            {
                                label: "Total Help",
                                data: faqsdata,
                                backgroundColor: colordata,
                                borderColor: ["#fff"],
                                borderWidth: 0.5,
                            },
                        ]
                    }}

                />
            </div>
        )
    };

    function renderTableDataTracksArm() {
        const label1 = armTrack.map(point => getToTitles(point.name))
        const faqsdata = armTrack.map(point => point.count)
        const colordata = ["#F9D1D1", "#FFA4B6", "#F765A3", "#A155B9", "#165BAA", "#OB1354"]
        return (
            <div style={{ maxWidth: "300px" }}>
                <Doughnut
                    data={{
                        labels: label1,
                        datasets: [
                            {
                                label: "Total Help",
                                data: faqsdata,
                                backgroundColor: colordata,
                                borderColor: ["#fff"],
                                borderWidth: 0.5,
                            },
                        ]
                    }}

                />
            </div>
        )
    }

    function renderTableDataTracksGenre() {
        const label1 = genreTrack.map(point => getToTitles(point.name))
        const faqsdata = genreTrack.map(point => point.count)
        const colordata = ["#F9D1D1", "#FFA4B6", "#F765A3", "#A155B9", "#165BAA", "#OB1354"]
        return (
            <div style={{ maxWidth: "300px" }}>
                <Doughnut
                    data={{
                        labels: label1,
                        datasets: [
                            {
                                label: "Total Help",
                                data: faqsdata,
                                backgroundColor: colordata,
                                borderColor: ["#fff"],
                                borderWidth: 0.5,
                            },
                        ]
                    }}

                />
            </div>
        )
    };

    return (
        <div className="dashboardPage">
            <h1>Dashboard</h1>
            <div className="row">
                <div className="col-md-4 animated fadeIn">
                    <div className="col-md-5 dashpadding">
                        <div className="dashcard">
                            <h3 className="padding">Choira Summary</h3>
                            <table id='dashboardPage'>
                                <tbody>
                                    {renderTableDataProject()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-5 dashpadding">
                        <div className="dashcard">
                            <h3 className="padding">Project Faqs Summary</h3>
                            <table id='dashboardPage'>
                                <tbody>
                                    {renderTableDataProjectFaqs()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-5 dashpadding">
                        <div className="dashcard">
                            <h3 className="padding">Project Type Summary</h3>
                            <table id='dashboardPage'>
                                <tbody>
                                    {renderTableDataProjectType()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-5 dashpadding">
                        <div className="dashcard">
                            <h3 className="padding">Project Genre Summary</h3>
                            <table id='dashboardPage'>
                                <tbody>
                                    {renderTableDataProjectGenre()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5 dashpadding">
                    <div className="dashcard">
                        <h3 className="padding">Per Month Projects Count</h3>
                        <table id='dashboardPage'>
                            <tbody>
                                {renderTableDataMonth()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-5 dashpadding">
                    <div className="dashcard">
                        <h3 className="padding">Per Month User Count</h3>
                        <table id='dashboardPage'>
                            <tbody>
                                {renderTableDataINMonthUser()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* sales */}
            <div className="row">
                <div className="col-md-5 dashpadding">
                    <div className="dashcard">
                        <h3 className="padding">Choira Tracks Summary</h3>
                        <table id='dashboardPage'>
                            <tbody>
                                {renderTableDataTotalTracks()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-5 dashpadding">
                    <div className="dashcard">
                        <h3 className="padding">Status Type Tracks Summary</h3>
                        <table id='dashboardPage'>
                            <tbody>
                                {renderTableDataTrackStatus()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-5 dashpadding">
                    <div className="dashcard">
                        <h3 className="padding">Tracks ARM Summary</h3>
                        <table id='dashboardPage'>
                            <tbody>
                                {renderTableDataTracksArm()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-5 dashpadding">
                    <div className="dashcard">
                        <h3 className="padding">Tracks Summary</h3>
                        <table id='dashboardPage'>
                            <tbody>
                                {renderTableDataTracks()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5 dashpadding">
                    <div className="dashcard">
                        <h3 className="padding">Tracks Genre Summary</h3>
                        <table id='dashboardPage'>
                            <tbody>
                                {renderTableDataTracksGenre()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-5 dashpadding">
                    <div className="dashcard">
                        <h3 className="padding">Per Month Tracks Count</h3>
                        <table id='dashboardPage'>
                            <tbody>
                                {renderTableDataMonthTracks()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div >

    )
}