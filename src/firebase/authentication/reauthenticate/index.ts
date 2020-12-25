import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export function reauthenticate(password: string): FirebaseAuthTypes.AuthCredential {
    const user = firebase.auth().currentUser;
    const credential = (firebase.auth.EmailAuthProvider.credential(
        user?.email ?? '',
        password
    ) as unknown) as FirebaseAuthTypes.AuthCredential;
    return credential;
}
