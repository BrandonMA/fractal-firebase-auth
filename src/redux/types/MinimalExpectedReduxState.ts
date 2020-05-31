import { AuthenticationState, isAuthenticationState } from './AuthenticationState';

export type MinimalExpectedReduxState = {
    authentication: AuthenticationState;
};

export function isMinimalExpectedReduxState(value: unknown): value is MinimalExpectedReduxState {
    const castedValue = value as MinimalExpectedReduxState;
    return castedValue.authentication != null && isAuthenticationState(castedValue.authentication);
}
