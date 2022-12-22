import React from 'react';
import { Redirect, useLocation, Switch, Route } from '@bma98/fractal-navigation-router';
import { AuthenticationCheck } from '@bma98/fractal-auth-screen';
import { useAuthenticateChildren, useSubscribeForAuthenticatedUser, useSubscribeForUserDocument, useUserDocument } from '../hooks';
export function Authenticate({ database, children, WrapperComponent }) {
    const [app, loadingPair, authPair, createUser] = useAuthenticateChildren(children);
    const { firebaseUser, loading } = useSubscribeForAuthenticatedUser();
    const isLoadingUserDocument = useSubscribeForUserDocument(firebaseUser, database);
    const userDocument = useUserDocument();
    const { pathname, search } = useLocation();
    const Wrapper = WrapperComponent !== null && WrapperComponent !== void 0 ? WrapperComponent : React.Fragment;
    const isLoadingFirebaseUser = firebaseUser === undefined && loading;
    const isFirebaseUserMissing = firebaseUser === null && !loading;
    const isUserDocumentMissing = userDocument == null;
    const firebaseAuthenticationState = (() => {
        if (isLoadingFirebaseUser) {
            return 'loading';
        }
        if (isFirebaseUserMissing) {
            return 'firebaseUserIsMissing';
        }
        if (isLoadingUserDocument && isUserDocumentMissing) {
            return 'loading';
        }
        if (!isLoadingUserDocument && isUserDocumentMissing) {
            return 'firestoreUserDocumentIsMissing';
        }
        if (!isLoadingUserDocument && !isUserDocumentMissing) {
            return 'accessIsAllowed';
        }
        return 'loading';
    })();
    const authenticationState = (() => {
        if (firebaseAuthenticationState === 'loading') {
            return 'loading';
        }
        if (firebaseAuthenticationState === 'firebaseUserIsMissing') {
            return 'accessIsNotAllowed';
        }
        if (firebaseAuthenticationState === 'firestoreUserDocumentIsMissing') {
            return 'accessIsNotAllowed';
        }
        return 'accessIsAllowed';
    })();
    const RedirectComponent = (() => {
        if (firebaseAuthenticationState === 'firebaseUserIsMissing') {
            return React.createElement(Redirect, { from: pathname, to: { pathname: authPair.route, search } });
        }
        if (firebaseAuthenticationState === 'firestoreUserDocumentIsMissing') {
            return React.createElement(Redirect, { from: pathname, to: { pathname: createUser.route, search } });
        }
        return React.createElement(Redirect, { from: pathname, to: { pathname: app.route, search } });
    })();
    return (React.createElement(Switch, null,
        firebaseAuthenticationState === 'firebaseUserIsMissing' && (React.createElement(Route, { path: authPair.route },
            React.createElement(Wrapper, null, authPair.component))),
        firebaseAuthenticationState === 'firestoreUserDocumentIsMissing' && (React.createElement(Route, { path: createUser.route },
            React.createElement(Wrapper, null, createUser.component))),
        React.createElement(AuthenticationCheck, { key: 'Authenticate', state: authenticationState, loadingComponent: loadingPair.component, redirectComponent: RedirectComponent },
            React.createElement(Wrapper, null, app.component))));
}
//# sourceMappingURL=Authenticate.js.map