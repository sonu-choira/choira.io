(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[16,26,28],{1221:function(e,t,c){"use strict";c.r(t);var s=c(1),a=c(6),i=c.n(a),n=c(141),j=c(34),o=c(30),l=c(143),r=(c(747),c(184),c(699),c(139)),d=c(349),b=c(819),O=(c(244),c(347),c(11)),u=c(2);t.default=function(){const e=Object(O.q)(),[t,c]=Object(s.useState)(3);return Object(s.useEffect)((()=>{const t=localStorage.getItem("token");if(console.log("Token from localStorage:",t),null===t||void 0===t){const t=localStorage.getItem("isSignin");e(t?"/landingpage":"/signin")}}),[]),Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("div",{className:i.a.wrapper,children:[Object(u.jsx)(r.a,{tabCount:t,setTabCount:c}),Object(u.jsxs)("div",{className:i.a.studioMainScreen,children:[Object(u.jsxs)("div",{className:i.a.studioHeader,children:[Object(u.jsx)("div",{children:Object(u.jsx)("input",{type:"text",placeholder:"search"})}),Object(u.jsx)("div",{children:Object(u.jsx)(n.b,{})}),Object(u.jsxs)("div",{children:[Object(u.jsx)("div",{className:i.a.notifyIcon,children:Object(u.jsx)(l.a,{})}),Object(u.jsx)(j.g,{})]}),Object(u.jsx)("div",{children:Object(u.jsx)(o.e,{})})]}),1===t&&"",2===t&&"",3===t?Object(u.jsx)(d.default,{}):4===t?Object(u.jsx)(b.default,{}):""]})]})})}},699:function(e,t,c){"use strict";c.r(t);var s=c(1),a=c(30),i=(c(121),c(6)),n=c.n(i),j=c(34),o=c(91),l=c(139),r=c(141),d=c(143),b=c(11),O=c(2);t.default=function(e){var t;let{setSelectTab:c}=e;const i=Object(b.o)(),[u,h]=Object(s.useState)(),x=null===i||void 0===i||null===(t=i.state)||void 0===t?void 0:t.navCount,[p,m]=Object(s.useState)([]),[g,v]=Object(s.useState)([]),[S,N]=Object(s.useState)(""),[f,y]=Object(s.useState)(!1),C=Object(b.q)();return Object(O.jsx)(O.Fragment,{children:Object(O.jsxs)("div",{className:n.a.wrapper,children:[Object(O.jsx)(l.a,{navCount:x,tabCount:u,setTabCount:h}),Object(O.jsxs)("div",{className:n.a.studioMainScreen,children:[Object(O.jsxs)("div",{className:n.a.studioHeader,children:[Object(O.jsx)("div",{children:Object(O.jsx)("input",{type:"text",placeholder:"search"})}),Object(O.jsx)("div",{children:Object(O.jsx)(r.b,{})}),Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{className:n.a.notifyIcon,children:Object(O.jsx)(d.a,{})}),Object(O.jsx)(j.g,{})]}),Object(O.jsx)("div",{children:Object(O.jsx)(a.e,{})})]}),Object(O.jsx)("div",{className:n.a.addNewStudioTitle,children:"Slot Booking"}),Object(O.jsx)("div",{className:n.a.addNewStudioPage,children:Object(O.jsxs)("div",{style:{height:"80%"},children:[Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:n.a.addNewStudioinputBox,children:[Object(O.jsx)("label",{htmlFor:"UserName",children:"User Name"}),Object(O.jsx)("input",{type:"text",id:"UserName",placeholder:"Enter User Name"})]}),Object(O.jsxs)("div",{className:n.a.addNewStudioinputBox,children:[Object(O.jsx)("label",{htmlFor:"Mobilenumber",children:"Mobile number"}),Object(O.jsx)("input",{type:"text",id:"Mobilenumber",placeholder:"Enter Mobile number"})]}),Object(O.jsxs)("div",{className:n.a.addNewStudioinputBox,children:[Object(O.jsx)("label",{htmlFor:"Email",children:"Email"}),Object(O.jsx)("input",{type:"email",id:"Email",placeholder:"Enter Email id"})]}),Object(O.jsxs)("div",{className:n.a.addNewStudioinputBox,children:[Object(O.jsx)("label",{children:"Booking Hours"}),Object(O.jsxs)("select",{children:[Object(O.jsx)("option",{children:"Choose Booking Hours"}),Object(O.jsx)("option",{children:"1 Hour"}),Object(O.jsx)("option",{children:"2 Hour"}),Object(O.jsx)("option",{children:"3 Hour"}),Object(O.jsx)("option",{children:"4 Hour"}),Object(O.jsx)("option",{children:"5 Hour"})]})]})]}),Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:n.a.addNewStudioinputBox,children:[Object(O.jsx)("label",{children:"Studio"}),Object(O.jsxs)("select",{children:[Object(O.jsx)("option",{children:"Select Studio"}),Object(O.jsx)("option",{children:"1"}),Object(O.jsx)("option",{children:"2"}),Object(O.jsx)("option",{children:"3"}),Object(O.jsx)("option",{children:"4"}),Object(O.jsx)("option",{children:"5"})]})]}),Object(O.jsxs)("div",{className:n.a.addNewStudioinputBox,children:[Object(O.jsx)("label",{children:"Room"}),Object(O.jsxs)("select",{children:[Object(O.jsx)("option",{children:"Select Room"}),Object(O.jsx)("option",{children:"1"}),Object(O.jsx)("option",{children:"2"}),Object(O.jsx)("option",{children:"3"}),Object(O.jsx)("option",{children:"4"}),Object(O.jsx)("option",{children:"5"})]})]}),Object(O.jsxs)("div",{className:n.a.addNewStudioinputBox,children:[Object(O.jsx)("label",{htmlFor:"Date",children:"Date"}),Object(O.jsx)("input",{type:"date",id:"RoomArea",placeholder:"Enter Date"})]}),Object(O.jsxs)("div",{className:n.a.addNewStudioinputBox,children:[Object(O.jsx)("label",{htmlFor:"TimeSlot",children:"Time Slot"}),Object(O.jsx)("input",{type:"time",id:"TimeSlot",placeholder:"Enter Time Slot"})]})]})]})}),Object(O.jsx)(o.a,{setSelectTab:c,backOnclick:()=>{C("/adminDashboard")}})]})]})})}},747:function(e,t,c){"use strict";var s=c(1),a=c(6),i=c.n(a),n=c(45),j=c(30),o=c(55),l=(c(102),c(69)),r=c(94),d=(c(37),c(2));t.a=function(){const[e,t]=Object(s.useState)(1),[c,a]=Object(s.useState)([]);Object(s.useEffect)((()=>{console.log(c)}),[c]);const b=Object(s.useMemo)((()=>{const t=10*(e-1),s=t+10;return c.slice(t,s)}),[e,c]),[O,u]=Object(s.useState)({}),[h,x]=Object(s.useState)({});return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("div",{className:i.a.studioTabelDiv,children:Object(d.jsx)("div",{children:Object(d.jsxs)("table",{children:[Object(d.jsx)("thead",{className:i.a.studiotabelHead,children:Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{children:"Studio"}),Object(d.jsx)("th",{children:"Price"}),Object(d.jsx)("th",{children:"Location"}),Object(d.jsx)("th",{children:"No. of Rooms"}),Object(d.jsx)("th",{children:"Activity Status"})]})}),Object(d.jsx)("tbody",{children:b.map((e=>Object(d.jsxs)("tr",{children:[Object(d.jsxs)("td",{style:{display:"flex",alignItems:"center"},children:[Object(d.jsx)("div",{className:i.a.studioImage,children:e.studioPhotos?Object(d.jsx)("img",{src:e.studioPhotos,alt:"",onError:e=>{e.target.src=r.a}}):Object(d.jsx)("img",{src:r.a,alt:""})}),"\xa0\xa0",e.fullName]}),Object(d.jsxs)("td",{children:["\u20b9",e.pricePerHour,Object(d.jsx)("br",{}),Object(d.jsx)("small",{children:"per hour"})]}),Object(d.jsxs)("td",{children:[e.address,Object(d.jsx)("br",{}),Object(d.jsxs)("small",{children:[" ",e.state]})]}),Object(d.jsx)("td",{children:e.totalRooms}),Object(d.jsxs)("td",{className:i.a.tableActionbtn,children:[Object(d.jsx)("div",{children:Object(d.jsxs)("label",{className:"switch",children:[Object(d.jsx)("input",{type:"checkbox",checked:h[e._id]||!1,onChange:()=>{return t=e._id,void x((e=>({...e,[t]:!e[t]})));var t}}),Object(d.jsx)("span",{className:"slider"})]})}),Object(d.jsxs)("div",{children:[Object(d.jsx)(n.a,{style:{cursor:"pointer"}}),Object(d.jsx)(j.b,{style:{color:"#ffc701",cursor:"pointer"}}),Object(d.jsx)(o.a,{style:{color:"red",cursor:"pointer"}})]})]})]},e._id)))})]})})}),Object(d.jsx)("div",{className:i.a.tabelpaginationDiv,children:Object(d.jsx)(l.a,{className:"pagination-bar",currentPage:e,totalCount:c.length,pageSize:10,onPageChange:e=>t(e)})})]})}},819:function(e,t,c){"use strict";c.r(t);var s=c(1),a=c(6),i=c.n(a),n=c(375),j=c(376),o=c(377),l=c(251),r=c(262),d=c(11),b=(c(139),c(384)),O=c(2);t.default=function(){const[e,t]=Object(s.useState)("c1"),[c,a]=Object(s.useState)([]),u=(Object(d.q)(),async(e,t)=>{try{const s=c.map((c=>(c._id===e&&(c.bookingStatus=parseInt(t.target.value),console.log(" prd.status",c.bookingStatus)),c)));(await b.a.updateStatus(e,t.target.value)).status&&a(s)}catch(s){console.error("Error updating status:",s)}}),h=e=>{switch(e=parseInt(e)){case 2:return"#FFDDDD";case 1:return"#DDFFF3";case 0:return"#FFF3CA";default:return""}};return Object(s.useEffect)((()=>{if(console.log("bookingPageCount-----",e),a([]),"c2"===e||"c3"===e){const t="c2"===e?"c2":"c3";b.a.musicProduction("100",t,1).then((t=>{console.log("====================> response ".concat(e," "),t),t.data&&a(t.data)})).catch((e=>{console.error("Error fetching studios:",e)}))}else if("c1"===e){const t=10,c=1,s=1,i=e;b.a.getBookings(t,c,s,i).then((e=>{console.log("====================> response C1",e),e.data&&(a(e.data),console.log("pagekaDetail",e))})).catch((e=>{console.error("Error fetching studios:",e)}))}}),[e]),Object(O.jsx)(O.Fragment,{children:Object(O.jsxs)("div",{className:i.a.allStudioDetailsPage,children:[Object(O.jsx)(r.a,{bookingPageCount:e,setBookingPageCount:t}),"c1"===e?Object(O.jsx)(n.a,{products:c,setProducts:a,handleChange:u,getStatusColor:h}):"c2"===e?Object(O.jsx)(j.a,{products:c,setProducts:a,handleChange:u,getStatusColor:h}):"c3"===e?Object(O.jsx)(o.a,{products:c,setProducts:a,handleChange:u,getStatusColor:h}):Object(O.jsx)(l.a,{})]})})}}}]);
//# sourceMappingURL=16.e023a929.chunk.js.map