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

export default function ExternalSubmitData() {

    const [freetrack, setFreetrack] = useState(0)

    useEffect = () => {
        let prece = <div>$2000</div>
        // setFreetrack(prece)
        console.log("freetrack", prece);
    }

    const dataSubmitted = _ => {
        let options = {
            key: "rzp_test_7mIk0plUYbDbst", // Enter the Key ID generated from the Dashboard
            amount: "200000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "iNouvelle Ventures Pvt. Ltd.",
            description: "Test Transaction",
            image: "https://choira.io/static/media/choria.02aeae5c.svg",
            handler: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Request Submitted',
                    showConfirmButton: false,
                    timer: 3500
                })
                setTimeout(() => {
                    window.location.reload()
                }, 4000);
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
                color: "#F37254",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    }




    return (
        <div className='e_flexSet'>
            <div className="e_formBox">
                <div className="col-left">
                    <div className="licenseBox">
                        <div className="head">Licensee Information</div>
                        <input type="text" placeholder='Name of License' name="license" id="license" className='checkInputHalf' />
                        <input type="text" placeholder="Artist Name" name="artist" id="artist" className='checkInputHalf' />
                        <input type="text" placeholder="Email" name="email" id="email" className='checkInput' />
                    </div>
                    <div className="billingBox">
                        <div className="head">Billing and Payment Information</div>
                        <input type="text" placeholder="Full Name" name="fullName" id="fullName" className='checkInputHalf' />
                        <input type="text" placeholder="Company Name" name="companyName" id="companyName" className='checkInputHalf' />
                        <input type="text" placeholder="Billing Address" name="address" id="address" className='checkInputHalf' />
                        <input type="text" placeholder="City" name="city" id="city" className='checkInputHalf' />
                        <input type="text" placeholder="State" name="state" id="state" className='checkInputHalf' />
                        <input type="text" placeholder="Country" name="country" id="country" className='checkInputHalf' />
                        <input type="text" placeholder="ZIP" name="zip" id="zip" className='checkInputHalf' />
                        <input type="text" placeholder="Phone" name="phone" id="phone" className='checkInputHalf' />
                        <input type="text" placeholder="Card Number" name="cardNo" id="cardNo" className='checkInput' />
                    </div>
                </div>
                <div className="col-right">
                    <div className="payNowBox">
                        <div className="head">Order Summary</div>
                        {freetrack === 0 ?
                            <div className="details">
                                Uptown - $2000
                            </div>
                            : null}
                        <div className="details">
                            Uptown - $2000
                            <br />
                            License: Buyout
                        </div>
                        <div className="payButton" onClick={() => { dataSubmitted() }}>
                            <span>Pay Now</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
