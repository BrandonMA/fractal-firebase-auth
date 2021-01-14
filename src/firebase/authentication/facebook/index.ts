import firebase from 'firebase/app';
import 'firebase/auth';

export async function facebook(): Promise<void> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithRedirect(provider);
}
