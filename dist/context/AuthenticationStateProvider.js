import React, { createContext, useState } from 'react';
import { createAuthenticationState } from '../types/AuthenticationState';
export var AuthenticationStateContext = createContext([
    createAuthenticationState(),
    function () {
        return;
    }
]);
export function AuthenticationStateProvider(_a) {
    var children = _a.children;
    var handleState = useState(createAuthenticationState());
    return React.createElement(AuthenticationStateContext.Provider, { value: handleState }, children);
}
//# sourceMappingURL=AuthenticationStateProvider.js.map