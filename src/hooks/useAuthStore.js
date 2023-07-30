import { useDispatch, useSelector } from 'react-redux';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/auth/authSlice';
import { loginWithEmailPassword, logoutFirebase } from '../firebase/providers';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';

export const useAuthStore = () => {

    const dispatch = useDispatch();

    const {
        status, 
        uid,
        errorMessage,
    } = useSelector( state => state.auth );

    useEffect(() => {
      onAuthStateChanged( FirebaseAuth, async( user) => {
        if ( !user ) return dispatch( onLogout() );
        const { uid } = user;
        dispatch( onLogin({ uid }) );
      })
    }, [])
    

    const starLogin = async({ username, pass }) => {
        try {
             const result = await loginWithEmailPassword({username, pass});
             console.log(result)
             if ( !result.ok ) dispatch(onLogout( result ));
             dispatch( onLogin({ uid: result.uid }) )
        } catch (error) {
            console.log(error)
            dispatch( onLogout('Credenciales incorrectas.') );
            setTimeout( () => {
               dispatch( clearErrorMessage() );
            }, 10)
        }
    }

    const startLogout = async() => {
       await logoutFirebase();
        dispatch( onLogout() );
    }

    return {
        //propiedades
        status, 
        uid,
        errorMessage,
        //Metodos
        starLogin,
        startLogout,
    }
}
