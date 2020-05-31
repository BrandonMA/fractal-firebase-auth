import React from 'react';
interface Config {
    [key: string]: string;
}
interface Props {
    children: JSX.Element;
    firebaseConfig: Config;
    loadingComponent: JSX.Element;
}
export declare function Firebase(props: Props): React.ReactNode;
export {};
