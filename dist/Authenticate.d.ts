/// <reference types="react" />
import { AuthenticationSlice, MinimalUserData, UsersSlice } from './redux';
import { MinimalExpectedDatabase } from './redux/types/MinimalExpectedDatabase';
interface Props {
    database: MinimalExpectedDatabase<MinimalUserData, null>;
    authenticationSlice: AuthenticationSlice;
    usersSlice: UsersSlice;
    loadingComponent: JSX.Element;
    authenticationComponent: JSX.Element;
    userNotAvailableComponent: JSX.Element;
    children: JSX.Element;
}
export default function Authenticate(props: Props): JSX.Element;
export {};
