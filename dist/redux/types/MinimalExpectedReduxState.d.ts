import { AuthenticationState } from './AuthenticationState';
import { UsersState } from './UsersState';
import { MinimalUser } from './MinimalUser';
export declare type MinimalExpectedReduxState = {
    authentication: AuthenticationState;
    users: UsersState<MinimalUser>;
};
export declare function isMinimalExpectedReduxState(value: unknown): value is MinimalExpectedReduxState;
