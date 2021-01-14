import firebase from 'firebase/app';
import 'firebase/auth';

export async function apple(locale = 'en'): Promise<void> {
    const provider = new firebase.auth.OAuthProvider('apple.com');

    provider.addScope('email');
    provider.addScope('name');

    provider.setCustomParameters({
        // Localize the Apple authentication screen in any language you need.
        locale
    });

    return firebase.auth().signInWithRedirect(provider);
}
