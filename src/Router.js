import { lazy, Suspense } from "react";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
// import {
//   HashRouter as Router,
//     Routes,
//     Route,
//   } from "react-router-dom";

  import { ChoiraLoader } from "./components/loader/ChoiraLoader";

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
const Studios = lazy(() => import("./pages/admin/studios/Studios.jsx"));




const Routing = () => {
  return (
    <Router>
      <Suspense fallback={<ChoiraLoader/>}>
        <Routes>
        <Route exact path='/' element={<Home/>} />
          <Route exact path='/signin' element={<Signin/>} />
          <Route exact path='/signup' element={<Signup/>} />
          <Route exact path='/deleteAccount' element={<DeleteAccount/>} />
          <Route exact path='/project' element={<Project/>} />
          <Route exact path='/dashboard' element={<Dashboard/>} />
          <Route exact path='/newproject' element={<NewProject/>} />
          <Route exact path='/choiratest' element={<ChoiraTest/>} />
          <Route exact path='/studios' element={<Studios/>} />
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
          {/* <Route exact path='/signup' element={<Signup/>}/> */}
        </Routes>
      </Suspense>
    </Router>
  );
};
export default Routing;
