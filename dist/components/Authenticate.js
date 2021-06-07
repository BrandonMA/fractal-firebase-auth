import React from 'react';
import { useAuthenticateChildren, useSubscribeForAuthenticatedUser, useSubscribeForUserDocument, useUserDocument } from '../hooks';
import { FadeRoute, Redirect, useLocation } from '@bma98/fractal-navigation';
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
        React.createElement(FadeRoute, { path: loadingPair.route }, loadingPair.component),
        isFirebaseUserMissing ? React.createElement(FadeRoute, { path: authPair.route }, authPair.component) : null,
        !isLoadingUserDocument && !isUserDocumentMissing ? React.createElement(FadeRoute, { path: app.route }, app.component) : null,
        !isLoadingUserDocument && isUserDocumentMissing ? React.createElement(FadeRoute, { path: createUser.route }, createUser.component) : null,
        getRedirect()));
}
//# sourceMappingURL=Authenticate.js.map