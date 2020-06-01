import { AuthenticationState, isAuthenticationState } from './AuthenticationState';
import { UsersState } from './UsersState';
import { MinimalUser } from './MinimalUser';

export type MinimalExpectedReduxState = {
    authentication: AuthenticationState;
    users: UsersState<MinimalUser>;
};

export function isMinimalExpectedReduxState(value: unknown): value is MinimalExpectedReduxState {
    const castedValue = value as MinimalExpectedReduxState;
    return castedValue.authentication != null && isAuthenticationState(castedValue.authentication) && castedValue.users != null;
}
