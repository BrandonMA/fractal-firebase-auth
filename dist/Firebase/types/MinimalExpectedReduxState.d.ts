import { AuthenticationState } from './AuthenticationState';
import { UsersState } from './UsersState';
import { MinimalUserData } from './MinimalUser';
export declare type MinimalExpectedReduxState = {
    authentication: AuthenticationState;
    users: UsersState<MinimalUserData, unknown>;
};
export declare function isMinimalExpectedReduxState(value: unknown): value is MinimalExpectedReduxState;
