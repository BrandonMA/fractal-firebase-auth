import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthenticationState } from '../types/AuthenticationState';

export async function signOut(): Promise<AuthenticationState> {
    await firebase.auth().signOut();
    return {
        firebaseUser: undefined,
        loading: false
    };
}
