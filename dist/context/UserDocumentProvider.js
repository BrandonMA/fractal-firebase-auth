import React, { createContext, useState } from 'react';
export var UserDocumentContext = createContext([
    undefined,
    function () {
        return;
    }
]);
export function UserDocumentProvider(_a) {
    var children = _a.children;
    var handleState = useState(undefined);
    return React.createElement(UserDocumentContext.Provider, { value: handleState }, children);
}
//# sourceMappingURL=UserDocumentProvider.js.map