import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthenticationState, createAuthenticationState } from '../../../types/AuthenticationState';

export async function signOut(): Promise<AuthenticationState> {
    await firebase.auth().signOut();
    return createAuthenticationState({
        loading: false
    });
}
