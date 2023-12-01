import React from 'react'
import "./comingSoon.scss"

export default function ComingSoon() {
    return (
        <div 
            className="comingSoonPage" 
            style={
                { 
                    background: "linear-gradient(to right, rgba(10, 10, 10, 0.8), rgba(60, 50, 10, 0.8)), url(images/image-17.png)" ,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover"
                }
            }
        >

            <div className="innerMsg">
                <h1>We are launching soon</h1>
            </div>
            
        </div>
    )
}
