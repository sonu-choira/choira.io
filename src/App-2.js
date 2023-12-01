import { Provider } from "react-redux";
import store from "./redux/store.js";
import './App.scss';
import Routes from "./Router.js";
import "./assets/js/script.js"
import {googleanayticsaction} from "./pages/google-anaylitics.js"
import { useEffect } from "react";
import Signup from "./pages/home/Signup.jsx";

function App() {

  useEffect(()=>{
    googleanayticsaction.initgoogleanaytics('G-840J53TBNV')
  })
  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
}

export default App;
