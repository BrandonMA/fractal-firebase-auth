import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthenticationState, createAuthenticationState } from '../../types/AuthenticationState';

export function subscribeForAuthenticatedUser(onFetch: (state: AuthenticationState) => void): firebase.Unsubscribe {
    return firebase.auth().onAuthStateChanged(
        (user) => {
            onFetch(
                createAuthenticationState({
                    firebaseUser: user,
                    loading: false
                })
            );
        },
        (error) => {
            alert(error.message);
        }
    );
}
