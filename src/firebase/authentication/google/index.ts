import firebase from 'firebase/app';
import 'firebase/auth';

export async function google(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithRedirect(provider);
}
