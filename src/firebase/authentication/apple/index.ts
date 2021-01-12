import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthenticationState, createAuthenticationState } from '../../../types/AuthenticationState';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export async function apple(locale = 'en'): Promise<AuthenticationState> {
    const provider = new firebase.auth.OAuthProvider('apple.com');

    provider.addScope('email');
    provider.addScope('name');

    provider.setCustomParameters({
        // Localize the Apple authentication screen in any language you need.
        locale
    });

    const userCredential = await firebase.auth().signInWithPopup(provider);
    return createAuthenticationState({
        firebaseUser: (userCredential.user as unknown) as FirebaseAuthTypes.User,
        loading: false,
        credential: (userCredential as unknown) as FirebaseAuthTypes.UserCredential
    });
}
