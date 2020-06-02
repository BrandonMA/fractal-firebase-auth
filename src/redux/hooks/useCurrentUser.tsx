import { useSelector } from 'react-redux';
import { MinimalUser, MinimalUserData } from '../types/MinimalUser';
import { useAuthenticationState } from './useAuthenticationState';
import { isMinimalExpectedReduxState, UsersState, isUsersState } from '../types';

function getUsers<T extends MinimalUserData, S>(state: unknown): Readonly<UsersState<T, S>> {
    if (isMinimalExpectedReduxState(state) && isUsersState<T, S>(state.users)) {
        return state.users;
    } else {
        throw Error('State does not have the expected shape');
    }
}

export function useCurrentUser<T extends MinimalUserData, S>(): MinimalUser<T, S> | null | undefined {
    const authState = useAuthenticationState();
    const users = useSelector(getUsers);
    if (authState.firebaseUser != null) {
        return users.values.get(authState.firebaseUser.uid) as MinimalUser<T, S> | null | undefined;
    } else {
        return null;
    }
}
