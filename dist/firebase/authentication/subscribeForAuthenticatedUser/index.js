import * as firebase from 'firebase/app';
import 'firebase/auth';
import { createAuthenticationState } from '../../../types/AuthenticationState';
export function subscribeForAuthenticatedUser(onFetch) {
    return firebase.auth().onAuthStateChanged(function (user) {
        onFetch(createAuthenticationState({
            firebaseUser: user,
            loading: false
        }));
    }, function (error) {
        alert(error.message);
    });
}
//# sourceMappingURL=index.js.map