import firebase from 'firebase/app';
import 'firebase/auth';

export async function google(androidID: string): Promise<void> {
    console.log(androidID);
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithRedirect(provider);
}
