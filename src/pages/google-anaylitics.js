import ReactGA from 'react-ga';

const  googleanayticsaction ={}

googleanayticsaction.initgoogleanaytics = async(key)=>{

    ReactGA.initialize('G-840J53TBNV');
    ReactGA.pageview(window.location.pathname + window.location.search);
};

export {googleanayticsaction};
