import { lazy, Suspense } from "react";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  useLocation,
  BrowserRouter as Router,
  useRoutes,
  Navigate,
    Routes,
    Route,
  } from "react-router-dom";

// Guards
import AuthGuard from './guards/AuthGuard';

// layouts
import DashboardLayout from './pages/layout/index'

// configs
import { PATH_AFTER_LOGIN } from './config/config';

import ChoiraLoader from "./components/loader/ChoiraLoader";
import AllStudioPageDetailsPage from "./pages/admin/studios/AllStudioPageDetailsPage.jsx";
import AddNewStudio from "../src/components/adminStudio/AddNewStudio.jsx";
import AddNewProduction from "../src/components/adminStudio/appsAndMore/AddNewProduction.jsx";
import StudioPatners from "./components/teamsSection/StudioPatners.jsx";

// import Signup from "./pages/home/Signup.jsx";


const Home = lazy(() => import("./pages/home/Home"));
const UserHome = lazy(() => import("./pages/userHome/userHome"));
const AdminHome = lazy(() => import("./pages/admin/adminHome"));
const ArmHome = lazy(() => import("./pages/arm/armHome"));
const TermsandCondition = lazy(() => import("./pages/home/TermsandCondition"));
const Privacypolicy = lazy(() => import("./pages/home/Privacypolicy"));
const Disclaimer = lazy(() => import("./pages/home/Disclaimer"));
const Contactus = lazy(() => import("./pages/home/Contactus"));
const About = lazy(() => import("./pages/home/about"));
const RefundPolicy = lazy(() => import("./pages/home/refundpolicy"));
const DeleteAccount = lazy(() => import("./pages/home/DeleteAccount.jsx"));
const Signin = lazy(() => import("./pages/home/Signin.jsx"));
const Signup = lazy(() => import("./pages/home/Signup.jsx"));
const Project = lazy(() => import("./pages/home/Project.jsx"));
const Dashboard = lazy(() => import("./pages/produce/Dashboard.jsx"));
const NewProject = lazy(() => import("./pages/produce/NewProject.jsx"));
const ChoiraTest = lazy(() => import("./pages/produce/ChoiraTest.jsx"));
const LandingPage = lazy(() => import("./pages/NewLandingPage/LandingPage.jsx"));

          {/* admin pagestart ========================> */}
const Studios = lazy(() => import("./pages/admin/studios/Studios.jsx"));
const BookingPages = lazy(() => import("./pages/admin/studios/BookingPages.jsx"));
const AllStudioDetailsPage = lazy(() => import("./pages/admin/studios/AllStudioPageDetailsPage.jsx"));
const AdminDashboardLayout = lazy(() => import("./pages/admin/layout/AdminDashboardLayout.jsx"));
const Editstudio = lazy(()=> import("../src/components/adminStudio/AddNewStudio.jsx"))
const EditProduction = lazy(()=> import("../src/components/adminStudio/appsAndMore/AddNewProduction.jsx"))
const AddProduction = lazy(()=> import("../src/components/adminStudio/appsAndMore/AddNewProduction.jsx"))
const ShowBookingsDetail = lazy(()=> import("../src/components/adminStudio/booking/ShowBookingDetails.jsx"))
const SlotBooking = lazy(()=> import("../src/components/adminStudio/SlotBooking.jsx"))
const ChooseTimeSlot = lazy(()=> import("../src/components/adminStudio/ChooseTimeSlot.jsx"))
const AddNewStudioPatner = lazy(()=> import("../src/components/teamsSection/AddNewStudioPatner.jsx"))
const AddNewArm = lazy(()=> import("../src/components/teamsSection/AddNewArm.jsx"))




          {/* admin page  ends ========================> */}


const Routing = () => {
  return (
    // <Router>
      <Suspense fallback={<ChoiraLoader/>}>
        <Routes>
        <Route exact path='/' element={<Signin/>} />
          <Route exact path='/signin' element={<Signin/>} />
          <Route exact path='/signup' element={<Signup/>} />
          <Route exact path='/deleteAccount' element={<DeleteAccount/>} />
          <Route exact path='/project' element={<Project/>} />
          <Route exact path='/dashboard' element={<Dashboard/>} />
          <Route exact path='/newproject' element={<NewProject/>} />
          <Route exact path='/choiratest' element={<ChoiraTest/>} />
    
          <Route exact path='/userHome' element={<UserHome/>}/> 
          <Route exact path='/adminHome' element={<AdminHome/>}/> 
          <Route exact path='/armHome' element={<ArmHome/>}/> 
          <Route exact path='/TermsandCondition' element={<TermsandCondition/>}/>
          <Route exact path='/privacyPolicy' element={<Privacypolicy/>}/> 
          <Route exact path='/Disclaimer' element={<Disclaimer/>}/> 
          <Route exact path='/contactUs' element={<Contactus/>}/> 
          <Route exact path='/about' element={<About/>}/> 
          <Route exact path='/refundPolicy' element={<RefundPolicy/>}/> 
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/landingpage' element={<LandingPage/>}/>
          <Route exact path='/signup' element={<Signup/>}/>

          {/* admin page route start ========================> */}

          <Route exact path='/studios' element={<Studios/>} />
          <Route exact path='/allStudioPageDetailsPage' element={<AllStudioPageDetailsPage/>} />
          <Route path='/adminDashboard/:navOption/:page' element={<AdminDashboardLayout/>} />
          <Route path='/adminDashboard/:navOption' element={<AdminDashboardLayout/>} />
          <Route path='/adminDashboard' element={<AdminDashboardLayout/>} />
          <Route exact path='/booking' element={<BookingPages/>} />
          <Route exact path='/studio/edit' element={<AddNewStudio/>} />
          <Route exact path='/studio/add' element={<AddNewStudio/>} />
          <Route exact path='/service/musicProduction/edit' element={<AddNewProduction/>} />
          <Route exact path='/service/musicProduction/add' element={<AddNewProduction/>} />
          <Route exact path='/service/showBookingDetails' element={<ShowBookingsDetail/>} />
          <Route exact path='/adminDashboard/Bookings/AddSlotBooking' element={<SlotBooking/>} />
          <Route exact path='/adminDashboard/Teams/AddStudioPatner' element={<AddNewStudioPatner/>} />
          <Route exact path='/adminDashboard/Teams/AddNewArm' element={<AddNewArm/>} />
        


          {/* <Route exact path='/service/AddSlotBooking' element={<ChooseTimeSlot/>} /> */}
          {/* admin page route ends ========================> */}

        </Routes>
      </Suspense>
    // </Router>
  );    
};
export default Routing;
