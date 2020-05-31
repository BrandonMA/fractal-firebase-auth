import * as React from 'react';
interface Config {
    [key: string]: string;
}
interface Props {
    children: JSX.Element;
    firebaseConfig: Config;
    loadingComponent: JSX.Element;
}
export declare const Firebase: React.FunctionComponent<Props>;
export {};
