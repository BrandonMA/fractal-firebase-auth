import React from 'react';
import { useAuthenticateChildren, useSubscribeForAuthenticatedUser, useSubscribeForUserDocument, useUserDocument } from '../hooks';
import { FadeRoute, Redirect, useLocation } from '@bma98/fractal-navigation';
export function Authenticate(_a) {
    var database = _a.database, children = _a.children;
    var _b = useAuthenticateChildren(children), app = _b[0], loadingPair = _b[1], authPair = _b[2], createUser = _b[3];
    var _c = useSubscribeForAuthenticatedUser(), firebaseUser = _c.firebaseUser, loading = _c.loading;
    var isLoadingUserDocument = useSubscribeForUserDocument(firebaseUser, database);
    var userDocument = useUserDocument();
    var pathname = useLocation().pathname;
    var isLoadingFirebaseUser = firebaseUser === undefined && loading;
    var isFirebaseUserMissing = firebaseUser === null && !loading;
    var isUserDocumentMissing = userDocument == null;
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
        !isLoadingUserDocument && !isUserDocumentMissing && !isFirebaseUserMissing ? (React.createElement(FadeRoute, { path: app.route }, app.component)) : null,
        !isLoadingUserDocument && isUserDocumentMissing && !isFirebaseUserMissing ? (React.createElement(FadeRoute, { path: createUser.route }, createUser.component)) : null,
        getRedirect()));
}
//# sourceMappingURL=Authenticate.js.map