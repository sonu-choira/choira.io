import { getIp } from '../src/restservice';
export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = getIp; // "http://localhost:8090/";

const clientId = "6ce20f30a1604df484a7c6f819383fb5"

// const scopes = [
//     "user-read-currently-playing",
//     "user-read-recently-played",
//     "user-read-playback-state",
//     "user-top-read",
//     "user-modify-playback-state",
//     "user-read-email",
//     "user-read-private",
// ];

const scopes = [
    "user-top-read",
    "user-read-email",
    "user-read-private",
];

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1])
            return initial;
           
           
        }, {})

       
}


export const getTokenByUrl = (loc) => {
    return loc.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1])
            return initial;
           
           
        }, {})
       
       
}


export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;