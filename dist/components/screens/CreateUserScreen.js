import { LoadingBackground } from '@bma98/fractal-ui';
import React, { useEffect } from 'react';
import { useAuthenticationState } from '../../hooks/useAuthenticationState';
export function CreateUserScreen(_a) {
    var createUser = _a.createUser;
    var firebaseUser = useAuthenticationState().firebaseUser;
    useEffect(function () {
        var _a;
        if (firebaseUser != null) {
            createUser(firebaseUser.uid, (_a = firebaseUser.email) !== null && _a !== void 0 ? _a : '');
        }
    }, [createUser, firebaseUser]);
    return React.createElement(LoadingBackground, null);
}
//# sourceMappingURL=CreateUserScreen.js.map