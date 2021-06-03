import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthenticationState, createAuthenticationState } from '../../../types/AuthenticationState';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export async function signUp(email: string, password: string): Promise<AuthenticationState> {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return createAuthenticationState({
        firebaseUser: userCredential.user as unknown as FirebaseAuthTypes.User,
        loading: false,
        credential: userCredential as unknown as FirebaseAuthTypes.UserCredential
    });
}
