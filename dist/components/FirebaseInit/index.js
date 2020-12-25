import firebase from 'firebase/app';
import React, { useState, useLayoutEffect } from 'react';
export function FirebaseInit(props) {
    var _a = useState(undefined), app = _a[0], setApp = _a[1];
    var firebaseConfig = props.firebaseConfig;
    useLayoutEffect(function () {
        setApp(firebase.initializeApp(firebaseConfig));
    }, [firebaseConfig]);
    return React.createElement(React.Fragment, null, app != null ? props.children : props.loadingComponent);
}
//# sourceMappingURL=index.js.map