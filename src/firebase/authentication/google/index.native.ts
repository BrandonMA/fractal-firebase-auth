import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { AuthenticationState, createAuthenticationState } from '../../../types';

export async function google(androidID: string): Promise<AuthenticationState> {
    GoogleSignin.configure({
        webClientId: androidID
    });

    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);
    return createAuthenticationState({
        firebaseUser: userCredential.user as unknown as FirebaseAuthTypes.User,
        loading: false,
        credential: userCredential as unknown as FirebaseAuthTypes.UserCredential
    });
}
