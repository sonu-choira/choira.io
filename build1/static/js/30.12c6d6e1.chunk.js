(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[30],{1219:function(e,t,c){"use strict";c.r(t);var i=c(1),a=c(278),n=c(25),s=c.n(n),o=c(160),r=c(255),l=c(256),j=c(257),d=c(258),b=c(259),u=c(279),h=(c(372),c(11)),m=c(264),O=c(260),g=c(240),p=c(37),x=c.n(p),S=c(101),v=c.n(S),y=(c(241),c(82)),f=c(2);let w=!0,C=!1;const N={name:"",phone:"",email:"",login:{type:"CUSTOMER",email:"",password:"",signuptype:"EMAIL"},city:"",photo:{docname:"SSO",docdesc:"Customer profile photo",doctype:"PROFILE",urllink:""}},k=e=>{v.a.fire({icon:"error",title:"Error",text:e,showConfirmButton:!1,timer:5500})};m.a;t.default=function(){const[e,t]=Object(i.useState)(!0),[c,n]=Object(i.useState)(!1),[m,p]=Object(i.useState)(!1),[S,E]=Object(i.useState)(!1),[L,I]=Object(i.useState)(!1),[A,D]=Object(i.useState)(0),[T,M]=Object(i.useState)(""),[R,U]=Object(i.useState)(!1),[H,J]=Object(i.useState)({firstname:"",lastname:"",email:"",phone:""}),P=Object(h.q)(),[B,F]=Object(i.useState)([0,0]);Object(i.useLayoutEffect)((()=>{function e(){window.innerWidth<1124?t(!1):t(!0),F([window.innerWidth,window.innerHeight])}return window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)}),[]);const G=()=>{if(w){let e=localStorage.getItem("isLogin");C="true"===e,w=!1}N.phone=(new Date).getTime()};G();const Y=P,_=e=>{let t={email:e,password:""};x.a.post(y.c+"login",t).then((e=>{let t=e.data;localStorage.setItem("userData",JSON.stringify(e.data)),localStorage.setItem("isLogin","true"),localStorage.setItem("photo",JSON.stringify(e.data.photo)),P("/userHome"),console.log(t)})).catch((e=>{v.a.fire({icon:"error",title:"Duplicate Account",text:"Your account is already created with Username and password.",showConfirmButton:!1,timer:5500})}))},W=async(e,t)=>{const c=await Object(O.a)(e);if(console.log(c),c.accessToken){let e=c.email;x.a.get(y.c+"login?email="+e).then((i=>{let a=i.data;"USERNAME_ALREADY_EXIST"===a.error?_(e):(N.name=c.displayName,N.email=c.email,N.login.email=c.email,N.login.signuptype="SSO",N.login.ssotype=t,N.photo.urllink=c.photoURL,z({city:"",phone:""}),q(N.name,N.email)),console.log(a)}))}else"auth/account-exists-with-different-credential"===c.code?k("You are register with different Provider. Please use the same"):k("Unable To connect")},z=e=>{N.city="Mumbai",x.a.post(y.c+"customer",N).then((e=>{let t=e;localStorage.setItem("userData",JSON.stringify(e.data)),localStorage.setItem("isLogin","true"),localStorage.setItem("photo",JSON.stringify(e.data.photo)),console.log(t),P("/userHome")})).catch((function(e){console.log(e),v.a.fire({icon:"error",title:"Duplicate Account",text:"Your account is already created with other SignOn Type.",showConfirmButton:!1,timer:5500})}))},q=(e,t)=>{let c={email:t,name:e,username:e};x.a.post(y.d+"welcomeMail",c).then((e=>{console.log(e.data)}))},[K,X]=Object(i.useState)(""),[Q,V]=Object(i.useState)("91"),[Z,$]=Object(i.useState)(1),[ee,te]=Object(i.useState)(1);let[ce,ie]=Object(i.useState)(!0),[ae,ne]=Object(i.useState)(!1);return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)("div",{className:s.a.SignInnavbar,children:Object(f.jsx)("img",{src:o.a,alt:"Choira Logo",onClick:()=>{P("/")},style:{cursor:"pointer"}})}),Object(f.jsx)("div",{className:s.a.wrapper,children:Object(f.jsx)("form",{action:"",onSubmit:e=>{e.preventDefault()},children:Object(f.jsxs)("div",{className:s.a.main,children:[Object(f.jsx)("div",{className:s.a.singer,children:Object(f.jsx)("img",{src:a.a,alt:"Singer"})}),Object(f.jsx)("div",{className:s.a.signup,children:Object(f.jsx)("div",{className:s.a.signupmain,children:Object(f.jsxs)("div",{className:s.a.signupmain2,children:[Object(f.jsxs)("div",{className:s.a.signupHeader,children:[Object(f.jsx)("div",{children:Object(f.jsxs)("h3",{children:["Welcome to ",Object(f.jsx)("span",{children:"Choira"})]})}),Object(f.jsx)("div",{children:Object(f.jsx)("div",{children:Object(f.jsxs)("h5",{children:["".concat("Have an Account ?"),Object(f.jsx)("br",{})," ",Object(f.jsx)("h3",{onClick:()=>{Y("/signin")},children:"".concat("Signin")})]})})})]}),Object(f.jsx)("div",{className:s.a.signupHeader2,children:Object(f.jsxs)("h1",{children:["".concat("Sign Up")," "]})}),Object(f.jsxs)("div",{className:s.a.enterMob,children:[1===Z?Object(f.jsx)(b.a,{mobileNumber:K,handleMobileNumberChange:e=>{X(e.target.value)},countryCode:Q,onCountryCodeChange:e=>{V(e)}}):2===Z?Object(f.jsx)(d.a,{mobileNumber:K,countryCode:Q,signup_checkOtp:ce,setSignup_checkOtp:ie,redicrectToDetail:ae,setRedicrectToDetail:ne}):Object(f.jsx)(u.a,{}),Object(f.jsxs)("div",{className:s.a.footer,children:[Object(f.jsxs)("div",{className:"".concat("".concat(1===Z?s.a.hrLine:s.a.visiblity)),children:[Object(f.jsx)("div",{}),Object(f.jsx)("small",{children:"OR"}),Object(f.jsx)("div",{})]}),Object(f.jsxs)("div",{className:"".concat("".concat(1===Z?s.a.signinOption:s.a.visiblity)),children:[Object(f.jsxs)("div",{onClick:()=>W(g.b,"GOOGLE"),children:[Object(f.jsx)("img",{src:r.a,alt:"Google"}),Object(f.jsx)("small",{children:"Sign in with Google "})]}),Object(f.jsx)("div",{onClick:()=>W(g.a,"FACEBOOK"),children:Object(f.jsx)("img",{src:l.a,alt:"Facebook"})}),Object(f.jsx)("div",{children:Object(f.jsx)("img",{src:j.a,alt:"Apple"})})]}),Object(f.jsxs)("div",{className:"".concat(1===Z?"".concat(s.a.continue):2===Z?"".concat(s.a.verifyContinue2," ").concat(s.a.continue):"".concat(s.a.continue)),children:[Object(f.jsx)("div",{children:3===Z?Object(f.jsx)("button",{type:"submit",children:"submit"}):2===Z?Object(f.jsx)("button",{type:"submit",onClick:()=>{ie(!1),!0===ae&&$(3)},children:"Continue"}):Object(f.jsx)("button",{type:"submit",onClick:()=>{(()=>{const e=K.trim();""!==e&&10===e.length?(te((e=>e+1)),1===ee&&(console.log(ee),$(2))):alert("Please enter a valid 10-digit mobile number.")})()},children:"Continue"})}),Object(f.jsx)("div",{children:Object(f.jsxs)("h6",{children:["By creating an account or logging in, you agree to Choira's ",Object(f.jsx)("br",{})," ",Object(f.jsx)("span",{children:"Conditions of Use"})," and",Object(f.jsx)("span",{children:"Privacy Policy."})]})})]})]})]})]})})})]})})})]})}}}]);
//# sourceMappingURL=30.12c6d6e1.chunk.js.map