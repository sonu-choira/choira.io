import React from "react";
import "./privacy_and_terms.scss";

export default function PartnerTerms() {

    return (

        <div className="changecolor" style={{ backgroundColor: "#212122", color: "white" }}>
            <h1 style={{ textAlign: "center" }}>Partner - Terms and Condition</h1>
            <div className="Indivcolor">
                <h3>Terms and Condition :</h3>
                <p>These Terms and Conditions govern the use of the Choira Partner App. By using the app, you agree to these terms.</p>
                <ul>
                    <li>Service Overview: Choira Partner App allows music studios to manage booking slots and receive bookings through the Choira platform.</li><hr />
                    <li>User Responsibilities: Users are responsible for ensuring the accuracy of their booking details and maintaining the confidentiality of their account information.</li><hr />
                    <li>Payment and Fees: Payments for bookings made through the app are subject to the agreed terms with Choira Musictech Pvt. Ltd.</li><hr />
                    <li>Termination: We reserve the right to terminate access to the app in case of any breach of these terms.</li><hr />
                    <li>Liability: We are not liable for any direct or indirect damages arising from the use of the app.</li>
                </ul>
            </div>
        </div>
    )

}