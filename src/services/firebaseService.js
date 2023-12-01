
import { getAuth, signInWithPopup } from "firebase/auth";


const socialMediaAuth = provider => {
    const auth = getAuth();
    return signInWithPopup(auth, provider)
            .then(res => { return res.user })
            .catch(err => { return err })
}

export default socialMediaAuth;