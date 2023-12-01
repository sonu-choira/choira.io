import config from './firebaseConf';
import {initializeApp} from 'firebase/app';

// if (!firebase.apps.length) {
//     firebase.initializeApp(config.firebaseConfig);
// } else {
//     firebase.app(); // if already initialized, use that one
// }

const firebaseApp = initializeApp(config.firebaseConfig);

export default firebaseApp;