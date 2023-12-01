import { lazy, Suspense } from "react";
import {
  HashRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

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
const Signin = lazy(() => import("./pages/home/Signin.jsx"));
const Signup = lazy(() => import("./pages/home/Signup.jsx"));
const Project = lazy(() => import("./pages/home/Project.jsx"));



const Routing = () => {
  return (
    <Router>
      <Suspense fallback={<ChoiraLoader/>}>
        <Routes>
        <Route exact path='/' element={<Home/>} />
          <Route exact path='/signin' element={<Signin/>} />
          <Route exact path='/signup' element={<Signup/>} />
          <Route exact path='/project' element={<Project/>} />
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
          {/* <Route exact path='/signup' element={<Signup/>}/> */}
        </Routes>
      </Suspense>
    </Router>
  );
};
export default Routing;
