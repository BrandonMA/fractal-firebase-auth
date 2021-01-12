import firebase from 'firebase/app';
import 'firebase/auth';

export async function resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
}
