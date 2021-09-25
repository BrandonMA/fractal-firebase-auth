import firebase from 'firebase/app';
import 'firebase/auth';

export async function signIn(email: string, password: string): Promise<void> {
    await firebase.auth().signInWithEmailAndPassword(email, password);
}
