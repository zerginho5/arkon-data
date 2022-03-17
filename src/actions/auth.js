import Swal from 'sweetalert2';

import { firebase, googleAuthProvider, } from '../firebase/firebase-config';
import { types } from '../types/types';
import { startLoading, finishLoading } from './ui';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading());


        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName, user.email));
                localStorage.setItem('email', email)
                dispatch(finishLoading());
            })
            .catch(e => {
                dispatch(finishLoading());
                Swal.fire('Error', 'Por favor ingrese una contraseña o usuario válidos', 'error');
            })

    }
}

export const login = (uid, displayName, datos) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        datos
    }
});

export const startGoogleLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                console.log(user.email)
                dispatch(
                    login(user.uid, user.displayName, user.email)
                )
                dispatch(finishLoading());
            });

    }
}
export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        localStorage.removeItem('usuario')
        localStorage.removeItem('cecos')
        dispatch(logout());
    }
}


export const logout = () => ({
    type: types.logout
})


