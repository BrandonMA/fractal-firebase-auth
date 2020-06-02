/// <reference types="react" />
import { AuthenticationSlice } from './redux';
interface ReduxFunctions {
    subscribeForAuthenticatedUser: () => firebase.Unsubscribe;
}
interface OwnProps {
    authenticationSlice: AuthenticationSlice;
    loadingComponent: JSX.Element;
    authenticationComponent: JSX.Element;
    userNotAvailableComponent: JSX.Element;
    children: JSX.Element;
}
interface Props extends OwnProps, ReduxFunctions {
}
declare function Authenticate(props: Props): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<typeof Authenticate, Pick<Props, "authenticationSlice" | "loadingComponent" | "authenticationComponent" | "userNotAvailableComponent" | "children"> & OwnProps>;
export default _default;
