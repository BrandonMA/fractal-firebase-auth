import { useSelector } from 'react-redux';
import { MinimalUser } from '../types/MinimalUser';
import { useAuthenticationState } from './useAuthenticationState';
import { isMinimalExpectedReduxState, UsersState } from '../types';

function getUsers<T extends MinimalUser>(state: unknown): Readonly<UsersState<T>> {
    if (isMinimalExpectedReduxState(state)) {
        return state.users as UsersState<T>;
    } else {
        throw Error('State does not have the expected shape');
    }
}

export function useCurrentUser<T extends MinimalUser>(): Readonly<T> | null {
    const authState = useAuthenticationState();
    const users = useSelector(getUsers);
    if (authState.firebaseUser != null) {
        return users[authState.firebaseUser.uid] as Readonly<T>;
    } else {
        return null;
    }
}
