
let type =  localStorage.getItem("userType");
 let access = "";

 if(type == "owner"){
  console.log(type);
  access = {
    dashboard: true,
    "app&more":{
      button : ["download","add new"],
      disabledButton : ["add new"],
      table : "all",
      table_col: ["studio", "price", "location", "rooms", "created", "status"],
      action : "read",
      navbar: ["studio"],
    },
    bookings:{
      button : ["download","slot Booking"],
      disabledButton : ["slot Booking"],
      table_col : ["id", "user name", "studio name", "hours", "creation date ", "booking date", "time slot", "Amount", "status"],
      action : "read",
      navbar: ["studio"]
    },
    
  }

 }else{
  access = "";
 }
 console.log('partner',access);

 export const partnerAccess = access;

// export const access = "";