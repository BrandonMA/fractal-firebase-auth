import * as firebase from 'firebase/app';
import 'firebase/auth';

export async function signIn(email: string, password: string): Promise<unknown> {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    return userCredential;
}
