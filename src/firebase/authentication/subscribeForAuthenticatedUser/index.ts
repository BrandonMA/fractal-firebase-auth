import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthenticationState, createAuthenticationState } from '../../../types/AuthenticationState';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export function subscribeForAuthenticatedUser(onFetch: (state: AuthenticationState) => void): firebase.Unsubscribe {
    return firebase.auth().onAuthStateChanged(
        (user) => {
            onFetch(
                createAuthenticationState({
                    firebaseUser: (user as unknown) as FirebaseAuthTypes.User,
                    loading: false
                })
            );
        },
        (error) => {
            alert(error.message);
        }
    );
}
