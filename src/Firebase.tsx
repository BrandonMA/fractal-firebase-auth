import * as firebase from 'firebase/app';
import * as React from 'react';
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

export const Firebase: React.FunctionComponent<Props> = (props: Props) => {
    const [firebaseReady, setFirebaseReady] = React.useState(false);
    const { firebaseConfig } = props;

    React.useEffect(() => {
        firebase.initializeApp(firebaseConfig);
        setFirebaseReady(true);
    }, [firebaseConfig]);

    return firebaseReady ? props.children : props.loadingComponent;
};
