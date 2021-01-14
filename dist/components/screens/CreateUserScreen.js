import { LoadingBackground } from '@bma98/fractal-ui';
import React, { useEffect } from 'react';
import { createUserDocument } from '../../firebase/users/createUserDocument';
import { useAuthenticationState } from '../../hooks/useAuthenticationState';
export function CreateUserScreen(_a) {
    var database = _a.database, createUserObject = _a.createUserObject;
    var authenticationState = useAuthenticationState();
    useEffect(function () {
        var _a;
        if (authenticationState.firebaseUser != null) {
            var finalUser = createUserObject({
                email: (_a = authenticationState.firebaseUser.email) !== null && _a !== void 0 ? _a : '',
                id: authenticationState.firebaseUser.uid
            });
            createUserDocument(database, finalUser)["catch"](function (error) { return alert(error.message); });
        }
    }, [database, authenticationState, createUserObject]);
    return React.createElement(LoadingBackground, null);
}
//# sourceMappingURL=CreateUserScreen.js.map