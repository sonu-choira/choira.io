(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[28],{819:function(t,e,s){"use strict";s.r(e);var a=s(1),o=s(6),c=s.n(o),n=s(375),r=s(376),u=s(377),l=s(251),g=s(262),i=s(11),d=(s(139),s(384)),p=s(2);e.default=function(){const[t,e]=Object(a.useState)("c1"),[s,o]=Object(a.useState)([]),h=(Object(i.q)(),async(t,e)=>{try{const a=s.map((s=>(s._id===t&&(s.bookingStatus=parseInt(e.target.value),console.log(" prd.status",s.bookingStatus)),s)));(await d.a.updateStatus(t,e.target.value)).status&&o(a)}catch(a){console.error("Error updating status:",a)}}),j=t=>{switch(t=parseInt(t)){case 2:return"#FFDDDD";case 1:return"#DDFFF3";case 0:return"#FFF3CA";default:return""}};return Object(a.useEffect)((()=>{if(console.log("bookingPageCount-----",t),o([]),"c2"===t||"c3"===t){const e="c2"===t?"c2":"c3";d.a.musicProduction("100",e,1).then((e=>{console.log("====================> response ".concat(t," "),e),e.data&&o(e.data)})).catch((t=>{console.error("Error fetching studios:",t)}))}else if("c1"===t){const e=10,s=1,a=1,c=t;d.a.getBookings(e,s,a,c).then((t=>{console.log("====================> response C1",t),t.data&&(o(t.data),console.log("pagekaDetail",t))})).catch((t=>{console.error("Error fetching studios:",t)}))}}),[t]),Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)("div",{className:c.a.allStudioDetailsPage,children:[Object(p.jsx)(g.a,{bookingPageCount:t,setBookingPageCount:e}),"c1"===t?Object(p.jsx)(n.a,{products:s,setProducts:o,handleChange:h,getStatusColor:j}):"c2"===t?Object(p.jsx)(r.a,{products:s,setProducts:o,handleChange:h,getStatusColor:j}):"c3"===t?Object(p.jsx)(u.a,{products:s,setProducts:o,handleChange:h,getStatusColor:j}):Object(p.jsx)(l.a,{})]})})}}}]);
//# sourceMappingURL=28.711737b7.chunk.js.map