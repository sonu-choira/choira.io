import React from 'react';

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

const Field = React.forwardRef(({label, type}, ref) => {
    return (
      <div>
        <label style={labelStyle} >{label}</label>
        <input ref={ref} type={type} style={inputStyle} />
      </div>
    );
});

const Form = ({onSubmit}) => {
    const phoneRef = React.useRef();
    const cityRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            phone: phoneRef.current.value,
            city: cityRef.current.value,
        };
        onSubmit(data);
    };
    return (
      <form style={formStyle} onSubmit={handleSubmit} >
        <Field ref={phoneRef} label="Contact No:" type="number" />
        <Field ref={cityRef} label="City:" type="text" />
        <div>
          <button style={submitStyle} type="submit">Submit</button>
        </div>
      </form>
    );
};

// Usage example:

const GoogleExtraBox = ({closeModel}) => {

    const handleSubmit = data => {
        closeModel(data)
    };
    
    return (
      <div style={appStyle}>
        <Form onSubmit={handleSubmit} />
      </div>
    );
};

export default GoogleExtraBox;