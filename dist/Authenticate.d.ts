/// <reference types="react" />
import { MinimalUserData, UsersSlice, authenticationSlice } from './redux';
import { MinimalExpectedDatabase } from './redux/types/MinimalExpectedDatabase';
interface Props {
    database: MinimalExpectedDatabase<MinimalUserData, null>;
    authenticationSlice: typeof authenticationSlice;
    usersSlice: UsersSlice;
    loadingComponent: JSX.Element;
    authenticationComponent: JSX.Element;
    userNotAvailableComponent: JSX.Element;
    children: JSX.Element;
}
export default function Authenticate(props: Props): JSX.Element;
export {};
