import React from 'react';
import { useSubscribeForAuthenticatedUser, useSubscribeForDatabaseUserObject, useFirebaseUser } from '../hooks';
import { FadeRoute, Redirect, useLocation } from '@bma98/fractal-navigation';
export function Authenticate(_a) {
    var authPair = _a.authPair, loadingPair = _a.loadingPair, app = _a.app, createUser = _a.createUser, database = _a.database;
    var _b = useSubscribeForAuthenticatedUser(), firebaseUser = _b.firebaseUser, loading = _b.loading;
    var isLoadingDatabaseUser = useSubscribeForDatabaseUserObject(firebaseUser, database);
    var databaseUser = useFirebaseUser();
    var pathname = useLocation().pathname;
    var isLoadingFirebaseUser = firebaseUser === undefined && loading;
    var isFirebaseUserMissing = firebaseUser === null && !loading;
    var isDatabaseUserMissing = databaseUser == null;
    function getRedirect() {
        if (isLoadingFirebaseUser) {
            return React.createElement(Redirect, { from: pathname, to: loadingPair.route });
        }
        else if (isFirebaseUserMissing) {
            return React.createElement(Redirect, { from: pathname, to: authPair.route });
        }
        else if (isLoadingDatabaseUser && isDatabaseUserMissing) {
            return React.createElement(Redirect, { from: pathname, to: loadingPair.route });
        }
        else if (!isLoadingDatabaseUser && isDatabaseUserMissing) {
            return React.createElement(Redirect, { from: pathname, to: createUser.route });
        }
        else if (!isLoadingDatabaseUser && !isDatabaseUserMissing) {
            return React.createElement(Redirect, { from: pathname, to: app.route });
        }
        else {
            return null;
        }
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(FadeRoute, { path: loadingPair.route }, loadingPair.component),
        isFirebaseUserMissing ? React.createElement(FadeRoute, { path: authPair.route }, authPair.component) : null,
        !isLoadingDatabaseUser && !isDatabaseUserMissing ? React.createElement(FadeRoute, { path: app.route }, app.component) : null,
        !isLoadingDatabaseUser && isDatabaseUserMissing ? React.createElement(FadeRoute, { path: createUser.route }, createUser.component) : null,
        getRedirect()));
}
//# sourceMappingURL=Authenticate.js.map