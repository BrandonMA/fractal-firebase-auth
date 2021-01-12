import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthenticationState, createAuthenticationState } from '../../../types/AuthenticationState';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export async function facebook(): Promise<AuthenticationState> {
    const provider = new firebase.auth.FacebookAuthProvider();
    const userCredential = await firebase.auth().signInWithPopup(provider);
    return createAuthenticationState({
        firebaseUser: (userCredential.user as unknown) as FirebaseAuthTypes.User,
        loading: false,
        credential: (userCredential as unknown) as FirebaseAuthTypes.UserCredential
    });
}
