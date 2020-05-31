/// <reference types="react" />
interface Config {
    [key: string]: string;
}
interface Props {
    children: JSX.Element;
    firebaseConfig: Config;
    loadingComponent: JSX.Element;
}
export declare function Firebase(props: Props): JSX.Element;
export {};
