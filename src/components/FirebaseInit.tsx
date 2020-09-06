import * as firebase from 'firebase/app';
import React, { useState, useLayoutEffect } from 'react';

const FirebaseContext = React.createContext<firebase.app.App | undefined>(undefined);

interface Config {
    [key: string]: string;
}

interface Props {
    children: JSX.Element;
    firebaseConfig: Config;
    loadingComponent: JSX.Element;
}

export function FirebaseInit(props: Props): JSX.Element {
    const [app, setApp] = useState<firebase.app.App | undefined>(undefined);
    const { firebaseConfig } = props;

    useLayoutEffect(() => {
        setApp(firebase.initializeApp(firebaseConfig));
    }, [firebaseConfig]);

    return <FirebaseContext.Provider value={app}>{app != null ? props.children : props.loadingComponent}</FirebaseContext.Provider>;
}
