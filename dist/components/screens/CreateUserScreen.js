import { LoadingBackground } from '@bma98/fractal-ui';
import React, { useEffect } from 'react';
import { createUser } from '../../firebase/users/createUser';
import { useAuthenticationState } from '../../hooks/useAuthenticationState';
export function CreateUserScreen(_a) {
    var database = _a.database;
    var authenticationState = useAuthenticationState();
    useEffect(function () {
        var _a;
        if (authenticationState.firebaseUser != null) {
            createUser(database, {
                email: (_a = authenticationState.firebaseUser.email) !== null && _a !== void 0 ? _a : '',
                id: authenticationState.firebaseUser.uid
            })["catch"](function (error) { return alert(error.message); });
        }
    }, [database, authenticationState]);
    return React.createElement(LoadingBackground, null);
}
//# sourceMappingURL=CreateUserScreen.js.map