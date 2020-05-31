import { AuthenticationState } from './AuthenticationState';
export declare type MinimalExpectedReduxState = {
    authentication: AuthenticationState;
};
export declare function isMinimalExpectedReduxState(value: unknown): value is MinimalExpectedReduxState;
