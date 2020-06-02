/// <reference types="react" />
import { AuthenticationSlice, MinimalUserData, UsersSlice } from './redux';
import { MinimalExpectedDatabase } from './redux/types/MinimalExpectedDatabase';
interface ReduxFunctions {
    subscribeForAuthenticatedUser: () => firebase.Unsubscribe;
    subscribeForUser: (database: MinimalExpectedDatabase<MinimalUserData, null>, id: string, onFetchDone: () => void) => firebase.Unsubscribe;
}
interface OwnProps {
    database: MinimalExpectedDatabase<MinimalUserData, null>;
    authenticationSlice: AuthenticationSlice;
    usersSlice: UsersSlice;
    loadingComponent: JSX.Element;
    authenticationComponent: JSX.Element;
    userNotAvailableComponent: JSX.Element;
    children: JSX.Element;
}
interface Props extends OwnProps, ReduxFunctions {
}
declare function Authenticate(props: Props): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<typeof Authenticate, Pick<Props, "database" | "authenticationSlice" | "usersSlice" | "loadingComponent" | "authenticationComponent" | "userNotAvailableComponent" | "children"> & OwnProps>;
export default _default;
