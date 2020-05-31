/// <reference types="react" />
interface Props {
    loadingComponent: JSX.Element;
    authenticationComponent: JSX.Element;
    userNotAvailableComponent: JSX.Element;
    children: JSX.Element;
}
export declare function Authenticate(props: Props): JSX.Element;
export {};
