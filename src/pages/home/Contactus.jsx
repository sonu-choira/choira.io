import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./contact.scss";
import { httpUrl } from '../../restservice'

class Contactus extends React.Component {
    constructor() {
        super();
        this.state = {
            fields:{}
           
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendmail = this.sendmail.bind(this);
       

    };

    cancelbutton(){
        window.history.back()
    }

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
        console.log(this.state)
    }

    sendmail(e) {
        e.preventDefault();

        let fields = {
            firstname: "",
            lastname:"",
            phone: "",
            email: "",
        }

        console.log("this.state.fields")
        console.log(this.state.fields)


        let sendformat = {
            
            to: "connect@choira.io",
            cc: this.state.fields.email,
            templateId: "invoice",
            contentData: {

                content: {
                    message: this.state.fields
                  
                },
                subject: "Contact To User"
            }
        }
       
        axios.post(httpUrl +  'mail/send ', sendformat)
            .then(responce => {
                // this.state.fields = fields
                this.setState({
                    fields: fields
                })
               
                console.log(responce.data)
            });
        Swal.fire({
            icon: 'success',
            title: 'Send',
            showConfirmButton: false,
            timer: 1500
        })
        this.cancelbutton()


    }

  
    render() {
    return (

      <div style={{marginTop:"49px"}}>
        <div className="cardd card-margin" >
          
          <div className="card-body">
              <div>
            <h3 className="card-title">Contact Us22</h3>
            <p className="card-text">We Will Get Back To You Asap!</p>
            </div>
          </div>
         <div>
         <div>
           <form method="post" name="userRegistrationForm" onSubmit={this.sendmail}>
           <div style={{marginTop:"40px"}}>
               
               {/* <label style={{textAlign:"left"}}>First Name :</label> */}
               {/* <span> First Name</span> */}
               <input type="text" name="firstname" id="firstname" required value={this.state.fields.firstname} placeholder="First Name" onChange={this.handleChange}/>

           </div>
           <div>
               {/* <label>Last Name :</label> */}
               <input type="text" name="lastname" id="lasttname" required  value={this.state.fields.lastname} placeholder="Last Name" onChange={this.handleChange} />

           </div>
           <div>
               {/* <label>Email :</label> */}
               <input type="email" name="email" id="email" required value={this.state.fields.email} placeholder="Email" onChange={this.handleChange} />

           </div>
           <div>
               {/* <label>Phone :</label> */}
               <input type="number" name="phone" required pattern="[7-9]{1}[0-9]{9}" id="phone" value={this.state.fields.phone} placeholder="Phone" onChange={this.handleChange} />

           </div>

           <div style={{marginTop:"24px"}}>
              
           <input type="submit" className="btn"  name="submit" value="SEND" class="btn" />
          
           </div>
           <label><a style={{color:"white",textDecoration:"none"}} href="/">Cancel</a></label>
           <p style={{marginTop:"34px"}} className="card-text">You May Also Call Us At 333-33-33</p>
         
           
           </form>
       </div>
         </div>
        </div>
        </div>
        
    )
}


};


export default Contactus;