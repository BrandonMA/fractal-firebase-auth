import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

interface Props {
    children: JSX.Element;
}

export function FirebaseInit(props: Props): JSX.Element {
    useEffect(() => {
        firestore().settings({ ignoreUndefinedProperties: true });
    }, []);
    return <>{props.children}</>;
}
