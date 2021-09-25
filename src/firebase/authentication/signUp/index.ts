import firebase from 'firebase/app';
import 'firebase/auth';

export async function signUp(email: string, password: string): Promise<void> {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
}
