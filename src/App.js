
import { Provider } from "react-redux";
import store from "./redux/store";
import './App.scss';
import Routes from "./Router";
import "./assets/js/script.js"
import {googleanayticsaction} from "./pages/google-anaylitics"
import { useEffect } from "react";

if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
}
function App() {

  useEffect(()=>{
    googleanayticsaction.initgoogleanaytics('G-840J53TBNV')
  })
  return (
    <Provider store={store}>

        <Routes />
      
    </Provider>
  );
}

export default App;
