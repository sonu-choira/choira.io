(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[18],{1207:function(e,t,s){},1216:function(e,t,s){"use strict";s.r(t);var a=s(1),i=s.n(a),n=s(101),l=s.n(n),c=s(37),d=s.n(c),h=(s(1207),s(82)),r=s(2);class o extends i.a.Component{constructor(){super(),this.state={fields:{}},this.handleChange=this.handleChange.bind(this),this.sendmail=this.sendmail.bind(this)}cancelbutton(){window.history.back()}handleChange(e){let t=this.state.fields;t[e.target.name]=e.target.value,this.setState({fields:t}),console.log(this.state)}sendmail(e){e.preventDefault();let t={firstname:"",lastname:"",phone:"",email:""};console.log("this.state.fields"),console.log(this.state.fields);let s={to:"connect@choira.io",cc:this.state.fields.email,templateId:"invoice",contentData:{content:{message:this.state.fields},subject:"Contact To User"}};d.a.post(h.c+"mail/send ",s).then((e=>{this.setState({fields:t}),console.log(e.data)})),l.a.fire({icon:"success",title:"Send",showConfirmButton:!1,timer:1500}),this.cancelbutton()}render(){return Object(r.jsx)("div",{style:{marginTop:"49px"},children:Object(r.jsxs)("div",{className:"cardd card-margin",children:[Object(r.jsx)("div",{className:"card-body",children:Object(r.jsxs)("div",{children:[Object(r.jsx)("h3",{className:"card-title",children:"Contact Us22"}),Object(r.jsx)("p",{className:"card-text",children:"We Will Get Back To You Asap!"})]})}),Object(r.jsx)("div",{children:Object(r.jsx)("div",{children:Object(r.jsxs)("form",{method:"post",name:"userRegistrationForm",onSubmit:this.sendmail,children:[Object(r.jsx)("div",{style:{marginTop:"40px"},children:Object(r.jsx)("input",{type:"text",name:"firstname",id:"firstname",required:!0,value:this.state.fields.firstname,placeholder:"First Name",onChange:this.handleChange})}),Object(r.jsx)("div",{children:Object(r.jsx)("input",{type:"text",name:"lastname",id:"lasttname",required:!0,value:this.state.fields.lastname,placeholder:"Last Name",onChange:this.handleChange})}),Object(r.jsx)("div",{children:Object(r.jsx)("input",{type:"email",name:"email",id:"email",required:!0,value:this.state.fields.email,placeholder:"Email",onChange:this.handleChange})}),Object(r.jsx)("div",{children:Object(r.jsx)("input",{type:"number",name:"phone",required:!0,pattern:"[7-9]{1}[0-9]{9}",id:"phone",value:this.state.fields.phone,placeholder:"Phone",onChange:this.handleChange})}),Object(r.jsx)("div",{style:{marginTop:"24px"},children:Object(r.jsx)("input",{type:"submit",className:"btn",name:"submit",value:"SEND",class:"btn"})}),Object(r.jsx)("label",{children:Object(r.jsx)("a",{style:{color:"white",textDecoration:"none"},href:"/",children:"Cancel"})}),Object(r.jsx)("p",{style:{marginTop:"34px"},className:"card-text",children:"You May Also Call Us At 333-33-33"})]})})})]})})}}t.default=o}}]);
//# sourceMappingURL=18.83fa5550.chunk.js.map