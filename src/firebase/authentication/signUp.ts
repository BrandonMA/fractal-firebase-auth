import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthenticationState, createAuthenticationState } from '../../types/AuthenticationState';

export async function signUp(email: string, password: string): Promise<AuthenticationState> {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return createAuthenticationState({
        firebaseUser: userCredential.user,
        loading: false
    });
}
