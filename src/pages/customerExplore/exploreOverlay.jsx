import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./exploreOverlay.scss"
import Swal from 'sweetalert2';
import { httpUrl, docServerUrl, nodeUrl } from '../../restservice'

let trackname
export default function ExploreOverlay(props) {

  const docServer = docServerUrl
  const [data, setData] = useState({})
  // const [data1,setdata1]=useState({})
  const [artist, setartist] = useState('')

  useEffect(() => {
    getidbytrack();
  }, [])

  const getidbytrack = () => {
    axios.get(httpUrl + 'soundTrack/' + props.selectedTrack)
      .then(responce => {
        setData({ ...responce.data.photo })
        trackname = responce.data.track.docpath
        // setdata1({...responce.data.track})
        setartist(responce.data.composer)
        console.log(responce.data)
        console.log("track1")
        console.log(trackname)
        console.log("track")
        console.log(responce.data.track)
      });
  }

  const freesongapi = () => {
    let name = JSON.parse(localStorage.getItem("userData")).name
    let id = JSON.parse(localStorage.getItem("userData")).id
    let email = JSON.parse(localStorage.getItem("userData")).email
    let sendabledata1 = {
      soundtrack: props.selectedTrack,
      customer: id,
      licensetype: "NON_EXCLUSIVE",
      name: name,
      licensee: name,
      artist: artist,
      email: email
    }

    axios.post(httpUrl + 'soundTrack/license', sendabledata1)
      .then(responce => {
        apiCallPost()
        sendmailapi()
      });
  }
  const sendmailapi = () => {
    let sendemail = JSON.parse(localStorage.getItem("userData")).email
    let custname = JSON.parse(localStorage.getItem("userData")).name
    let city = JSON.parse(localStorage.getItem("userData")).city
    let sendemailjson = {
      email: sendemail,
      name: props.selectednametrack,
      licensetype: "NON_EXCLUSIVE",
      licensee: custname,
      artist: artist,
      address: city,
      price: props.selectedPrice,
      link: docServer + trackname
    }

    axios.post(nodeUrl + 'sendInvoice ', sendemailjson)
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
      id: props.selectedTrack,
      status: "SOLD"
    }

    axios.post(httpUrl + 'soundTrack/update', sendableData)
      .then(function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Non Featured Track Bought Successfully',
          showConfirmButton: false,
          timer: 3500
        })
        setTimeout(() => {
          props.goback()
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

  return (
    <div className='overLayBox'>
      <div className="overlay">
        {Number(props.selectedPrice) === 0 ?
          <div className="boxOverlay" onClick={() => { freesongapi() }}>

            <div className="packageName">Free</div>
            <div>
              <img src={docServer + data.docpath} width="100px" alt="img 1" />
            </div>
            <h3>{props.selectednametrack}</h3>
            <div className="packagePrice">Rs. 0</div>
            <div className="packageDetails">
              Removed from store after purchase
              <br />
              For broad commercial use
              <br />
              Keep 100% of publishing
              <br />
              No reporting or payouts to producer
              <br />
              You own the master of the final song
            </div>
            <div className="packageButton"><span>Get Song</span></div>
          </div>
          :
          <div className="boxOverlay" onClick={() => { props.changeState() }}>
            <div className="packageName">BuyOut</div>
            <div>
              <img src={docServer + data.docpath} width="100px" alt="img 1" />
            </div>
            <h3>{props.selectednametrack}</h3>
            <div className="packagePrice">Rs. {props.selectedPrice}</div>
            <div className="packageDetails">
              Removed from store after purchase
              <br />
              For broad commercial use
              <br />
              Keep 100% of publishing
              <br />
              No reporting or payouts to producer
              <br />
              You own the master of the final song
            </div>
            <div className="packageButton"><span>Buy Now</span></div>
          </div>
        }

      </div>
      <div className="closeBox" onClick={() => { props.onlyCloseTheSong() }}></div>
    </div>
    // <div className='overLayBox'>
    //   <div className="overlay">
    //     {Number(props.selectedPrice) === 0 ?
    //       <div className="boxOverlay" onClick={() => { props.changeState() }}>
    //         <div className="packageName">Free</div>
    //         <div className="packagePrice">Rs. 0</div>
    //         <div className="packageDetails">
    //           Removed from store after purchase
    //           <br />
    //           For broad commercial use
    //           <br />
    //           Keep 100% of publishing
    //           <br />
    //           No reporting or payouts to producer
    //           <br />
    //           You own the master of the final song
    //         </div>
    //         <div className="packageButton"><span>Order Now</span></div>
    //       </div>
    //       :
    //       <div className="boxOverlay" onClick={() => { props.changeState() }}>
    //         <div className="packageName">BuyOut</div>
    //         <div className="packagePrice">Rs. {props.selectedPrice}</div>
    //         <div className="packageDetails">
    //           Removed from store after purchase
    //           <br />
    //           For broad commercial use
    //           <br />
    //           Keep 100% of publishing
    //           <br />
    //           No reporting or payouts to producer
    //           <br />
    //           You own the master of the final song
    //         </div>
    //         <div className="packageButton"><span>Buy Now</span></div>
    //       </div>
    //     }

    //   </div>
    //   <div className="closeBox" onClick={() => { props.onlyCloseTheSong() }}></div>
    // </div>
  )
}
