import * as firebase from 'firebase/app';
import React, { useState, useLayoutEffect } from 'react';
var FirebaseContext = React.createContext(undefined);
export function FirebaseInit(props) {
    var _a = useState(undefined), app = _a[0], setApp = _a[1];
    var firebaseConfig = props.firebaseConfig;
    useLayoutEffect(function () {
        setApp(firebase.initializeApp(firebaseConfig));
    }, [firebaseConfig]);
    return <FirebaseContext.Provider value={app}>{app != null ? props.children : props.loadingComponent}</FirebaseContext.Provider>;
}
//# sourceMappingURL=FirebaseInit.jsx.map