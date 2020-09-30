import auth from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export function reauthenticate(password: string): FirebaseAuthTypes.AuthCredential {
    const user = auth().currentUser;
    const credential = auth.EmailAuthProvider.credential(user?.email ?? '', password) as FirebaseAuthTypes.AuthCredential;
    return credential;
}
