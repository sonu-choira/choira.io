import React from 'react'
import "./exploreOverlay.scss"

export default function ExternalExploreOverlay(props) {
  return (
    <div className='overLayBox'>
      <div className="overlay">
        <div className="boxOverlay" onClick={() => {props.changeState()}}>
          <div className="packageName">BuyOut</div>
          <div className="packagePrice">$2000</div>
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
      </div>
      <div className="closeBox" onClick={() => {props.onlyCloseTheSong()}}></div>
    </div>
  )
}
