import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { httpUrl } from '../restservice'

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
  color:"black",
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
      <label  style={labelStyle} >{label}</label>
      <input ref={ref} type={type} style={inputStyle} />
    </div>
  );
});

const Form = ({ onSubmit }) => {
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      email: usernameRef.current.value,
      password: passwordRef.current.value
    };
    onSubmit(data);
  };
  return (
    <form style={formStyle} onSubmit={handleSubmit} >
      <Field ref={usernameRef}  label="Email:" type="text" />
      <Field ref={passwordRef}  label="Password:" type="password" />
      <div>
        <button style={submitStyle} type="submit">Submit</button>
      </div>
    </form>
  );
};

// Usage example:

const LoginBox = () => {

  const navigate = useNavigate();

  const handleSubmit = data => {
    data.password = btoa(data.password)
    const json = JSON.stringify(data, null, 4);
    console.clear();
    console.log(json);

    axios.post(httpUrl +  'login', data)
      .then((result) => {
        let responseJson = result;
        localStorage.setItem("userData", JSON.stringify(result.data));
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("photo", JSON.stringify(result.data.photo));
        console.log(responseJson)
        if (responseJson.data.login.type === "ADMIN")
          navigate("/adminHome");
        else if(responseJson.data.login.type === "ARTIST_MANAGER")
          navigate("/armHome");
        else
          navigate("/userHome");
      }).catch(function (error) {
        // handle error
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Invalid Email or Password',
          showConfirmButton: false,
          timer: 2500
        })
      });
  };
  return (
    <div style={appStyle}>
      <Form onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginBox;