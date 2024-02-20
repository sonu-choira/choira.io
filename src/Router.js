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

// import Signup from "./pages/home/Signup.jsx";

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<ChoiraLoader isDashboard={pathname.includes('/app')} />}>
      <Component {...props} />
    </Suspense>
  );
};




// const Routing = () => {
//   return (
//     <Router>
//       <Suspense fallback={<ChoiraLoader/>}>
//         <Routes>
//         {/* <Route exact path='/' element={<Home/>} /> */}
//           {/* <Route exact path='/signin' element={<Signin/>} /> */}
//           {/* <Route exact path='/signup' element={<Signup/>} /> */}
//           <Route exact path='/deleteAccount' element={<DeleteAccount/>} />
//           {/* <Route exact path='/project' element={<Project/>} /> */}
//           {/* <Route exact path='/dashboard' element={<Dashboard/>} /> */}
//           {/* <Route exact path='/newproject' element={<NewProject/>} /> */}
//           <Route exact path='/choiratest' element={<ChoiraTest/>} />
//           {/* <Route exact path='/studios' element={<Studios/>} /> */}
//           {/* <Route exact path='/allStudioPageDetailsPage' element={<AllStudioPageDetailsPage/>} /> */}
//           <Route exact path='/booking' element={<BookingPages/>} />
//           <Route exact path='/userHome' element={<UserHome/>}/> 
//           <Route exact path='/adminHome' element={<AdminHome/>}/> 
//           <Route exact path='/armHome' element={<ArmHome/>}/> 
//           <Route exact path='/TermsandCondition' element={<TermsandCondition/>}/>
//           <Route exact path='/privacyPolicy' element={<Privacypolicy/>}/> 
//           <Route exact path='/Disclaimer' element={<Disclaimer/>}/> 
//           <Route exact path='/contactUs' element={<Contactus/>}/> 
//           <Route exact path='/about' element={<About/>}/> 
//           <Route exact path='/refundPolicy' element={<RefundPolicy/>}/> 
//           <Route exact path='/home' element={<Home/>}/>
//           <Route exact path='/landingpage' element={<LandingPage/>}/>
//           {/* <Route exact path='/signup' element={<Signup/>}/> */}
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// };
// export default Routing;


export default function Routing() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'signin',
          element: (
            // <GuestGuard>
              <Signin />
            // </GuestGuard>
          ),
        },
        {
          path: 'signup',
          element: (
            // <GuestGuard>
              <Signup />
            // </GuestGuard>
          ),
        },
        // { path: 'reset-password', element: <ResetPassword /> },
        // { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'app',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/app/products" replace />, index: true },
        { path: 'dashboard', element: <Dashboard /> },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/list" replace />, index: true },
            // { path: 'profile', element: <UserProfile /> },
            // { path: 'cards', element: <UserCards /> },
            // { path: 'list', element: <UserList /> },
            // { path: 'new', element: <UserCreate /> },
            // { path: ':name/edit', element: <UserCreate /> },
            // { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'products',
          children: [
            { element: <Navigate to="/app/products/list" replace />, index: true },
            // { path: 'list', element: <UserApps /> },
            // { path: 'applications-list', element: <ComingSoon /> },
          ],
        },
        {
          path: 'project',
          children: [
            { element: <Navigate to="app/project/create" replace />, index: true },
            { path: 'create', element: <NewProject /> },
          ],
        },
        {
          path: 'studios',
          children: [
            { element: <Navigate to="/app/studios/list" replace />, index: true },
            { path: 'list', element: <Studios /> },
            { path: 'detail', element: <allStudioPageDetailsPage /> },
            // { path: ':id/edit', element: <BroadcastCreate /> },
          ],
        },
        {
          path: 'booking',
          children: [
            // { element: <Navigate to="/dashboard/broadcast/schedule" replace />, index: true },
            // { path: 'booking', element: <BroadcastCreate2 /> },
            // { path: ':id/edit', element: <BroadcastEdit2 /> },
          ],
        },
        {
          path: 'report',
          children: [
            { element: <Navigate to="/dashboard/report/message-list" replace />, index: true },
            // { path: 'message-list', element: <MessageReport /> },
          ],
        },
        {
          path: 'account',
          children: [
            { element: <Navigate to="/dashboard/account/settings" replace />, index: true },
            // { path: 'settings', element: <UserAccount /> },
          ],
        },
        // {
        //   path: 'blog',
        //   children: [
        //     { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
        //     { path: 'posts', element: <BlogPosts /> },
        //     { path: 'post/:title', element: <BlogPost /> },
        //     { path: 'new-post', element: <BlogNewPost /> },
        //   ],
        // },
        // {
        //   path: 'mail',
        //   children: [
        //     { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
        //     { path: 'label/:customLabel', element: <Mail /> },
        //     { path: 'label/:customLabel/:mailId', element: <Mail /> },
        //     { path: ':systemLabel', element: <Mail /> },
        //     { path: ':systemLabel/:mailId', element: <Mail /> },
        //   ],
        // },
        // {
        //   path: 'chat',
        //   children: [
        //     { element: <Chat />, index: true },
        //     { path: 'new', element: <Chat /> },
        //     { path: ':conversationKey', element: <Chat /> },
        //   ],
        // },
        // { path: 'calendar', element: <Calendar /> },
        // { path: 'kanban', element: <Kanban /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      // element: <LogoOnlyLayout />,
      children: [
        // { path: 'coming-soon', element: <ComingSoon /> },
        // { path: 'maintenance', element: <Maintenance /> },
        // { path: 'pricing', element: <Pricing /> },
        // { path: 'payment', element: <Payment /> },
        // { path: '500', element: <Page500 /> },
        // { path: '404', element: <NotFound /> },
        // { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <Navigate to="/auth/signin" replace />,
      // element: <MainLayout />,
      children: [
        { element: <Home />, index: true },
        // { path: 'about-us', element: <About /> },
        // { path: 'contact-us', element: <Contact /> },
        // { path: 'faqs', element: <Faqs /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
    // { path: 'success', element: <Success /> },
  ]);
}

const Home = Loadable(lazy(() => import("./pages/home/Home")));
const UserHome = Loadable(lazy(() => import("./pages/userHome/userHome")));
const AdminHome = Loadable(lazy(() => import("./pages/admin/adminHome")));
const ArmHome = Loadable(lazy(() => import("./pages/arm/armHome")));
const TermsandCondition = Loadable(lazy(() => import("./pages/home/TermsandCondition")));
const Privacypolicy = Loadable(lazy(() => import("./pages/home/Privacypolicy")));
const Disclaimer = Loadable(lazy(() => import("./pages/home/Disclaimer")));
const Contactus = Loadable(lazy(() => import("./pages/home/Contactus")));
const About = Loadable(lazy(() => import("./pages/home/about")));
const RefundPolicy = Loadable(lazy(() => import("./pages/home/refundpolicy")));
const DeleteAccount = Loadable(lazy(() => import("./pages/home/DeleteAccount.jsx")));
const Signin = Loadable(lazy(() => import("./pages/home/Signin.jsx")));
const Signup = Loadable(lazy(() => import("./pages/home/Signup.jsx")));
const Project = Loadable(lazy(() => import("./pages/home/Project.jsx")));
const Dashboard = Loadable(lazy(() => import("./pages/produce/Dashboard.jsx")));
const NewProject = Loadable(lazy(() => import("./pages/produce/NewProject.jsx")));
const ChoiraTest = Loadable(lazy(() => import("./pages/produce/ChoiraTest.jsx")));
const LandingPage = Loadable(lazy(() => import("./pages/NewLandingPage/LandingPage.jsx")));
const Studios = Loadable(lazy(() => import("./pages/admin/studios/Studios.jsx")));
const BookingPages = Loadable(lazy(() => import("./pages/admin/studios/BookingPages.jsx")));
const AllStudioDetailsPage = Loadable(lazy(() => import("./pages/admin/studios/AllStudioPageDetailsPage.jsx")));