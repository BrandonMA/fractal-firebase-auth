import React, { createContext, useState } from 'react';
export var FirebaseUserContext = createContext([
    undefined,
    function () {
        return;
    }
]);
export function FirebaseUserProvider(_a) {
    var children = _a.children;
    var handleState = useState(undefined);
    return React.createElement(FirebaseUserContext.Provider, { value: handleState }, children);
}
//# sourceMappingURL=FirebaseUserProvider.js.map