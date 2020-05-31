import * as firebase from 'firebase/app';
import React, { useState, useEffect } from 'react';
import { createAuthenticationSlice } from './redux/slices/createAuthenticationSlice';

const authSlice = createAuthenticationSlice();
authSlice.actions.setLoadingFirebaseData(false);

interface Config {
    [key: string]: string;
}

interface Props {
    children: JSX.Element;
    firebaseConfig: Config;
    loadingComponent: JSX.Element;
}

export function Firebase(props: Props): React.ReactNode {
    console.log(props);
    const [firebaseReady, setFirebaseReady] = useState(false);
    const { firebaseConfig } = props;

    useEffect(() => {
        firebase.initializeApp(firebaseConfig);
        setFirebaseReady(true);
    }, [firebaseConfig]);

    return firebaseReady ? props.children : props.loadingComponent;
}
