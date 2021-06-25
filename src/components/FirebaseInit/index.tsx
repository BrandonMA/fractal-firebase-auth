import firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useState, useLayoutEffect, useEffect } from 'react';

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

    useEffect(() => {
        if (app) {
            firebase.firestore().settings({
                ignoreUndefinedProperties: true
            });
        }
    }, [app]);

    return <>{app != null ? props.children : props.loadingComponent}</>;
}
