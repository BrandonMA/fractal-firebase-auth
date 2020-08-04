import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthenticationState } from '../..';

export function subscribeForAuthenticatedUser(onFetch: (state: AuthenticationState) => void): firebase.Unsubscribe {
    return firebase.auth().onAuthStateChanged(
        (user) => {
            onFetch({
                firebaseUser: user,
                loading: false
            });
        },
        (error) => {
            alert(error.message);
        }
    );
}
