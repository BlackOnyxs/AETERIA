import { signInWithEmailAndPassword} from 'firebase/auth';
import { FirebaseAuth } from './config';

export const loginWithEmailPassword = async({ username, pass }) => {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, username, pass );
        
        const { uid } = resp.user;

        return {
            ok: true,
            uid
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}