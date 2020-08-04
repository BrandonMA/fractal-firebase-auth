import * as firebase from 'firebase/app';
import 'firebase/auth';
import { EmailPasswordPair } from '../types/EmailPasswordPair';
import { AuthenticationState } from '../types/AuthenticationState';

export async function signUp(user: EmailPasswordPair): Promise<AuthenticationState> {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    return {
        firebaseUser: userCredential.user,
        loading: false
    };
}
