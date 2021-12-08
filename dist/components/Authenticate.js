import React from 'react';
import { useAuthenticateChildren, useSubscribeForAuthenticatedUser, useSubscribeForUserDocument, useUserDocument } from '../hooks';
import { Redirect, useLocation } from '@bma98/fractal-navigation-router';
import { AuthenticationCheck } from '@bma98/fractal-auth-screen';
import { Switch, Route } from '@bma98/fractal-navigation-router';
export function Authenticate({ database, children }) {
    const [app, loadingPair, authPair, createUser] = useAuthenticateChildren(children);
    const { firebaseUser, loading } = useSubscribeForAuthenticatedUser();
    const isLoadingUserDocument = useSubscribeForUserDocument(firebaseUser, database);
    const userDocument = useUserDocument();
    const { pathname } = useLocation();
    const isLoadingFirebaseUser = firebaseUser === undefined && loading;
    const isFirebaseUserMissing = firebaseUser === null && !loading;
    const isUserDocumentMissing = userDocument == null;
    const firebaseAuthenticationState = (() => {
        if (isLoadingFirebaseUser) {
            return 'loading';
        }
        else if (isFirebaseUserMissing) {
            return 'firebaseUserIsMissing';
        }
        else if (isLoadingUserDocument && isUserDocumentMissing) {
            return 'loading';
        }
        else if (!isLoadingUserDocument && isUserDocumentMissing) {
            return 'firestoreUserDocumentIsMissing';
        }
        else if (!isLoadingUserDocument && !isUserDocumentMissing) {
            return 'accessIsAllowed';
        }
        else {
            return 'loading';
        }
    })();
    const authenticationState = (() => {
        if (firebaseAuthenticationState === 'loading') {
            return 'loading';
        }
        else if (firebaseAuthenticationState === 'firebaseUserIsMissing') {
            return 'accessIsNotAllowed';
        }
        else if (firebaseAuthenticationState === 'firestoreUserDocumentIsMissing') {
            return 'accessIsNotAllowed';
        }
        else {
            return 'accessIsAllowed';
        }
    })();
    const RedirectComponent = (() => {
        if (firebaseAuthenticationState === 'firebaseUserIsMissing') {
            return React.createElement(Redirect, { from: pathname, to: authPair.route });
        }
        else if (firebaseAuthenticationState === 'firestoreUserDocumentIsMissing') {
            return React.createElement(Redirect, { from: pathname, to: createUser.route });
        }
        else {
            return React.createElement(Redirect, { from: pathname, to: app.route });
        }
    })();
    return (React.createElement(Switch, null,
        firebaseAuthenticationState === 'firebaseUserIsMissing' && React.createElement(Route, { path: authPair.route }, authPair.component),
        firebaseAuthenticationState === 'firestoreUserDocumentIsMissing' && (React.createElement(Route, { path: createUser.route }, createUser.component)),
        React.createElement(AuthenticationCheck, { key: 'Authenticate', state: authenticationState, loadingComponent: loadingPair.component, redirectComponent: RedirectComponent }, app.component)));
}
//# sourceMappingURL=Authenticate.js.map