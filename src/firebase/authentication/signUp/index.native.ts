import { AuthenticationState, createAuthenticationState } from '../../../types/AuthenticationState';
import auth from '@react-native-firebase/auth';

export async function signUp(email: string, password: string): Promise<AuthenticationState> {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    return createAuthenticationState({
        firebaseUser: userCredential.user,
        loading: false,
        credential: userCredential
    });
}
