import React from 'react';
import { useAuthenticateChildren, useSubscribeForAuthenticatedUser, useSubscribeForUserDocument, useUserDocument } from '../hooks';
import { Redirect, useLocation, Route } from '@bma98/fractal-navigation-router';
export function Authenticate({ database, children }) {
    const [app, loadingPair, authPair, createUser] = useAuthenticateChildren(children);
    const { firebaseUser, loading } = useSubscribeForAuthenticatedUser();
    const isLoadingUserDocument = useSubscribeForUserDocument(firebaseUser, database);
    const userDocument = useUserDocument();
    const { pathname } = useLocation();
    const isLoadingFirebaseUser = firebaseUser === undefined && loading;
    const isFirebaseUserMissing = firebaseUser === null && !loading;
    const isUserDocumentMissing = userDocument == null;
    function getRedirect() {
        if (isLoadingFirebaseUser) {
            return React.createElement(Redirect, { from: pathname, to: loadingPair.route });
        }
        else if (isFirebaseUserMissing) {
            return React.createElement(Redirect, { from: pathname, to: authPair.route });
        }
        else if (isLoadingUserDocument && isUserDocumentMissing) {
            return React.createElement(Redirect, { from: pathname, to: loadingPair.route });
        }
        else if (!isLoadingUserDocument && isUserDocumentMissing) {
            return React.createElement(Redirect, { from: pathname, to: createUser.route });
        }
        else if (!isLoadingUserDocument && !isUserDocumentMissing) {
            return React.createElement(Redirect, { from: pathname, to: app.route });
        }
        else {
            return null;
        }
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Route, { path: loadingPair.route }, loadingPair.component),
        isFirebaseUserMissing ? React.createElement(Route, { path: authPair.route }, authPair.component) : null,
        !isLoadingUserDocument && !isUserDocumentMissing ? React.createElement(Route, { path: app.route }, app.component) : null,
        !isLoadingUserDocument && isUserDocumentMissing ? React.createElement(Route, { path: createUser.route }, createUser.component) : null,
        getRedirect()));
}
//# sourceMappingURL=Authenticate.js.map