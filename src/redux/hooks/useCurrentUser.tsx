import { useSelector } from 'react-redux';
import { MinimalUser } from '../types/MinimalUser';
import { isUsersState } from '../types/UsersState';
import { useAuthenticationState } from './useAuthenticationState';

function getUsers<T extends MinimalUser>(state: unknown): Readonly<Map<string, T>> {
    if (isUsersState<T>(state)) {
        return state.users;
    } else {
        throw Error('State does not have the expected shape');
    }
}

export function useCurrentUser<T extends MinimalUser>(): Readonly<T> | null {
    const authState = useAuthenticationState();
    const users = useSelector(getUsers);
    if (authState.firebaseUser != null) {
        return users.get(authState.firebaseUser.uid) as Readonly<T>;
    } else {
        return null;
    }
}
