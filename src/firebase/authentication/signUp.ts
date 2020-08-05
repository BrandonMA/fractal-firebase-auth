import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthenticationState } from '../types/AuthenticationState';

export async function signUp(email: string, password: string): Promise<AuthenticationState> {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return {
        firebaseUser: userCredential.user,
        loading: false
    };
}
