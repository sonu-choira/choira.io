import { partnerAccess } from "../config/partnerAccess";
//future update 
// add another condition to check if user is admin or partner
let dynamicNav = "";
if(!partnerAccess){
  dynamicNav = "adminDashboard"
}else{
  dynamicNav = "partner-dashboard"
}

console.log(dynamicNav);


export default dynamicNav;