import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { httpUrl, nodeUrl } from '../restservice'

let sendableOtp = 0;

const appStyle = {
  height: '100%',
  display: 'flex'
};

const formStyle = {
  margin: 'auto',
  padding: '10px',
  display: 'block',
  width: '90%'
};

const labelStyle = {
  margin: '10px 0 5px 0',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '15px'
};

const inputStyle = {
  margin: '5px 0 10px 0',
  padding: '10px',
  border: '1px solid #bfbfbf',
  borderRadius: '30px',
  boxSizing: 'border-box',
  width: '100%'
};

const submitStyle = {
  margin: '10px 0 0 0',
  padding: '7px 10px',
  border: '1px solid #efffff',
  borderRadius: '30px',
  background: '#202020',
  width: '100%',
  fontSize: '15px',
  color: 'white',
  display: 'block',
  cursor: 'pointer'
};

const Field = React.forwardRef(({ label, type }, ref) => {
  return (
    <div>
      <label style={labelStyle} >{label}</label>
      <input ref={ref} type={type} style={inputStyle} />
    </div>
  );
});

const Form = ({ onSubmit }) => {
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const otpRef = React.useRef();

  const [otpButton, setOtpButton] = React.useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    if (otpRef.current.value === sendableOtp) {
      const data = {
        name: nameRef.current.value,
        phone: "",
        email: emailRef.current.value,
        login: {
          type: "CUSTOMER",
          email: emailRef.current.value,
          password: passwordRef.current.value,
          signuptype: "EMAIL"
        },
        city: "Mumbai",
        photo: {
          docname: 'profileimage.jpg',
          docdesc: 'Customer profile photo',
          doctype: 'PROFILE',
          urllink: 'https://thumbs.dreamstime.com/b/faceless-businessman-avatar-man-suit-blue-tie-human-profile-userpic-face-features-web-picture-gentlemen-85824471.jpg'
        }
      };
      onSubmit(data);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'OTP Verification Failed',
        showConfirmButton: false,
        timer: 1500
      })
    }

  };

  const sendEmailWithOtp = e => {
    if (emailRef.current.value !== "" && emailRef.current.value !== null) {
      sendableOtp = generateOTP()
      let sendableData = {
        email: emailRef.current.value,
        otp: sendableOtp
      }
      axios.post(nodeUrl + 'sendOtp', sendableData)
        .then((result) => {
          setOtpButton(false)
        });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Please enter email id',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }


  return (
    <form style={formStyle} onSubmit={handleSubmit} >
      <Field ref={nameRef} label="Name:" type="text" />
      <Field ref={emailRef} label="Email:" type="email" />
      <Field ref={passwordRef} label="Password:" type="password" />
      <Field ref={otpRef} label="Verify OTP:" type="text" />

      {otpButton ?
        <div>
          <button style={submitStyle} type="button" onClick={() => sendEmailWithOtp()}>Send OTP</button>
        </div>
        :
        <div>
          <button style={submitStyle} type="submit">Submit</button>
          <button style={submitStyle} type="button" onClick={() => sendEmailWithOtp()}>Resend OTP</button>
        </div>
      }
    </form>
  );
};

// Usage example:

const RegisterBox = ({ closeModel }) => {

  const navigate = useNavigate();

  const handleSubmit = data => {

    axios.get(httpUrl + 'login?email=' + data.login.email)
      .then((result) => {
        let responseJson = result.data;
        if (responseJson.error === "USERNAME_ALREADY_EXIST") {
          Swal.fire({
            icon: 'error',
            title: 'Duplicate Account',
            text: 'Your account is already created.',
            showConfirmButton: false,
            timer: 5500
          })
        }
        else {
          registerUser(data)

        }
        console.log(responseJson)
        sendwelcomemail(data.name, data.email)
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Server Failed!',
          showConfirmButton: false,
          timer: 1500
        })
      });
  };

  const sendwelcomemail = (name, email) => {

    let sendformat = {
      "email": email,
      "name": name,
      "username": name,
    }

    axios.post(nodeUrl + 'welcomeMail', sendformat)
      .then(responce => {
        console.log(responce.data)
      });

  }

  const registerUser = data => {
    data.login.password = btoa(data.login.password);
    const json = JSON.stringify(data, null, 4);
    console.clear();
    console.log(json);

    axios.post(httpUrl + 'customer', data)
      .then((result) => {
        let responseJson = result;
        localStorage.setItem("userData", JSON.stringify(result.data));
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("photo", JSON.stringify(result.data.photo));
        console.log(responseJson)
        closeModel()
        navigate("/userHome");
      });
  }

  return (
    <div style={appStyle}>
      <Form onSubmit={handleSubmit} />
    </div>
  );
};

function generateOTP() {

  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}


export default RegisterBox;