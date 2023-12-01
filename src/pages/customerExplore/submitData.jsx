import React, { useEffect } from 'react'
import sprite from "../../assets/icons/sprite.svg";
import './submitData.scss'
import featureBox from "../../assets/explore/img1.png"
import iconBox from "../../assets/explore/playButton.png"
import trackImage from "../../assets/explore/trackImage.png"
import track from "../../assets/explore/tracks.png"
import { useState } from 'react';
import axios from 'axios';
import ExploreOverlay from './exploreOverlay';
import Swal from 'sweetalert2';
import { httpUrl, docServerUrl,nodeUrl } from '../../restservice';

export default function SubmitData(props) {

    const [userData, setUserData] = React.useState({})
    const [data, setData] = React.useState({})
    const [sendData, setSendData] = React.useState({
        soundtrack: '',
        customer: '',
        licensetype: '',
        name: '',
        licensee: '',
        artist: '',
        email: ''
    })

    // For input Box

    const [license, setLicense] = React.useState("")
    const [artist, setArtist] = React.useState("")
    const [emailAdded, setEmailAdded] = React.useState("")
    const [fullName, setFullName] = React.useState("")
    const [companyName, setCompanyName] = React.useState("")
    const [addressAdded, setAddressAdded] = React.useState("")
    const [cityAdded, setCityAdded] = React.useState("")
    const docServer = docServerUrl
    // const [stateAdded, setStateAdded] = React.useState("")
    // const [countryAdded, setCountryAdded] = React.useState("")
    // const [zipAdded, setZipAdded] = React.useState("")
    // const [phoneAdded, setPhoneAdded] = React.useState("")
    // const [cardNo, setCardNo] = React.useState("")


    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("userData")))
        setSendData()
        setLicense(JSON.parse(localStorage.getItem("userData")).name)
        setEmailAdded(JSON.parse(localStorage.getItem("userData")).email)
        // setPhoneAdded(JSON.parse(localStorage.getItem("userData")).phone)
        console.log(JSON.parse(localStorage.getItem("userData")))
        trackdetail()
    }, [])

    const proceedNow = _ => {
        if (Number(props.selectedPrice) > 0) {
            dataSubmitted()
        } else {
            apiCall()
        }
    }


    const dataSubmitted = _ => {
        let amount = Number(props.selectedPrice) * 100
        let options = {
            key: "rzp_test_7mIk0plUYbDbst", // Enter the Key ID generated from the Dashboard
            amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Choira Musictech Pvt Ltd",
            description: "Test Transaction",
            image: "https://choira.io/static/media/choria.02aeae5c.svg",
            handler: function (response) {
                apiCall()
            },
            prefill: {
                name: "Pankaj Chaudhari",
                email: "pankaj_chaudhari@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#FFC701",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    }

    const apiCall = _ => {
        // let sendableData = {
        //     soundtrack: props.selectedTrackId,
        //     customer: JSON.parse(localStorage.getItem("userData")).id,
        //     licensetype: props.selectedLicense,
        //     name: fullName,
        //     licensee: license,
        //     artist: artist,
        //     email: emailAdded
        // }
        let sendableData = {
            soundtrack: props.selectedTrackId,
            customer: JSON.parse(localStorage.getItem("userData")).id,
            licensetype: props.selectedLicense,
            name: license,
            licensee: license,
            artist: artist,
            email: emailAdded
        }

        if (sendableData.licensetype === "FEATURED") {
            sendableData.licensetype = "BUYOUT"
        }
        else {
            sendableData.licensetype = "NON_EXCLUSIVE"
        }

        axios.post(httpUrl + 'soundTrack/license', sendableData)
            .then(function (response) {
                apiCallPost()
                sendmailapi()
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Unable to purchase.',
                    showConfirmButton: false,
                    timer: 3500
                })
            });
    }

    const sendmailapi = () => {
        let city = JSON.parse(localStorage.getItem("userData")).city
        let sendemailjson = {
            email: emailAdded,
            name: data.name,
            licensetype: props.selectedLicense,
            licensee: license,
            artist: artist,
            address: city,
            price: props.selectedPrice,
            link: docServer + data.track.docpath
        }


        axios.post(nodeUrl+'sendInvoice', sendemailjson)
            .then(function (response) {
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    showConfirmButton: false,
                    timer: 3500
                })
            });
    }

    const apiCallPost = _ => {
        let sendableData = {
            id: props.selectedTrackId,
            status: "SOLD"
        }

        axios.post(httpUrl + 'soundTrack/update', sendableData)
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Featured Track Bought Successfully',
                    showConfirmButton: false,
                    timer: 3500
                })
                setTimeout(() => {
                    props.goback();
                }, 2000);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Purchase incomplete.',
                    showConfirmButton: false,
                    timer: 3500
                })
            });
    }

    const trackdetail = () => {
        axios.get(httpUrl + 'soundTrack/' + props.selectedTrackId)
            .then(responce => {
                setData({ ...responce.data })
                console.log(responce.data)
            });
    }

    return (
        <div className='flexSet'>

            <div className="content__heading upperSectionShowData">

                <div style={{ float: "left" }}>
                    <h1>
                        <svg>
                            <use href={sprite + "#icon-music"}></use>
                        </svg>
                        Explore
                    </h1>
                </div>

                <div style={{ float: "right" }}>
                    <h3 onClick={() => { props.goback() }} style={{ textAlign: "right", cursor: "pointer" }}>
                        Back
                    </h3>
                </div>




            </div>

            <div className="formBox">
                <div className="col-left">
                    {/* <div className="billingBox">
                        <div className="head">Track Details</div>
                        <input type="text" placeholder="Track Name" value={fullName} onChange={e => setFullName(e.target.value)} name="fullName" id="fullName" className='checkInputHalf' />
                        <input type="text" placeholder="Company Name" value={companyName} onChange={e => setCompanyName(e.target.value)} name="companyName" id="companyName" className='checkInputHalf' />
                        <input type="text" placeholder="Billing Address" value={addressAdded} onChange={e => setAddressAdded(e.target.value)} name="address" id="address" className='checkInputHalf' />
                        <input type="text" placeholder="City" value={cityAdded} onChange={e => setCityAdded(e.target.value)} name="city" id="city" className='checkInputHalf' />
                        <input type="text" placeholder="State" value={stateAdded} onChange={e => setStateAdded(e.target.value)} name="state" id="state" className='checkInputHalf' />
                        <input type="text" placeholder="Country" value={countryAdded} onChange={e => setCountryAdded(e.target.value)} name="country" id="country" className='checkInputHalf' />
                        <input type="text" placeholder="ZIP" value={zipAdded} onChange={e => setZipAdded(e.target.value)} name="zip" id="zip" className='checkInputHalf' />
                        <input type="text" placeholder="Phone" value={phoneAdded} onChange={e => setPhoneAdded(e.target.value)} name="phone" id="phone" className='checkInputHalf' />
                        <input type="text" placeholder="Card Number" value={cardNo} onChange={e => setCardNo(e.target.value)} name="cardNo" id="cardNo" className='checkInput' />
                    </div> */}
                    <div className="licenseBox">
                        <div className="head">Track Details</div>
                        <input type="text" placeholder="Track Name" readOnly value={data.name} onChange={e => setFullName(e.target.value)} name="fullName" id="fullName" className='checkInputHalf' />
                        <input type="text" placeholder="Composer" readOnly value={data.composer} onChange={e => setAddressAdded(e.target.value)} name="address" id="address" className='checkInputHalf' />
                        {/* <input type="text" placeholder="Description" defaultValue={data.description} onChange={e => setCompanyName(e.target.value)} name="companyName" id="companyName" className='checkInputHalf' /> */}
                        <input type="text" placeholder="Genre" readOnly value={data.genre} onChange={e => setCityAdded(e.target.value)} name="city" id="city" className='checkInput' />
                        {/* <input type="text" placeholder="State" value={stateAdded} onChange={e => setStateAdded(e.target.value)} name="state" id="state" className='checkInputHalf' />
                        <input type="text" placeholder="Country" value={countryAdded} onChange={e => setCountryAdded(e.target.value)} name="country" id="country" className='checkInputHalf' />
                        <input type="text" placeholder="ZIP" value={zipAdded} onChange={e => setZipAdded(e.target.value)} name="zip" id="zip" className='checkInputHalf' />
                        <input type="text" placeholder="Phone" value={phoneAdded} onChange={e => setPhoneAdded(e.target.value)} name="phone" id="phone" className='checkInputHalf' />
                        <input type="text" placeholder="Card Number" value={cardNo} onChange={e => setCardNo(e.target.value)} name="cardNo" id="cardNo" className='checkInput' /> */}
                    </div>
                    <div className="licenseBox">
                        <div className="head">Licensee Information</div>
                        <input type="text" readOnly placeholder='Name of License' value={license} onChange={e => setLicense(e.target.value)} name="license" id="license" className='checkInputHalf' />
                        <input type="text" placeholder="Artist Name" required value={artist} onChange={e => setArtist(e.target.value)} name="artist" id="artist" className='checkInputHalf' />
                        <input type="text" placeholder="Email" readOnly value={emailAdded} onChange={e => setEmailAdded(e.target.value)} name="email" id="email" className='checkInput' />
                    </div>
                    <button className='buttoncolor' onClick={() => { proceedNow() }}>Pay Now</button>
                    <br />
                    <div style={{ margin: "12px" }}><label style={{ padding: "9px" }}><i class="fa fa-lock" aria-hidden="true"></i></label><label>Secure Checkout</label></div>

                </div>

                <div className="col-right">
                    {/* <div className="payNowBox">
                        <div className="head">Order Summary</div>
                        <div className="details">
                            Uptown - Rs. {props.selectedPrice}
                            <br />
                            License: Buyout
                        </div>
                        <div className="payButton" onClick={() => { proceedNow() }}>
                            <span>Pay Now</span>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
