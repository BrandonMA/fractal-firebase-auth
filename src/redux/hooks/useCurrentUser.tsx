import { useSelector } from 'react-redux';
import { MinimalUser } from '../types/MinimalUser';
import { isUsersState } from '../types/UsersState';
import { useAuthenticationState } from './useAuthenticationState';
import { isMinimalExpectedReduxState } from '../types';

function getUsers<T extends MinimalUser>(state: unknown): Readonly<Map<string, T>> {
    if (isMinimalExpectedReduxState(state) && isUsersState<T>(state.users)) {
        return state.users.users;
    } else {
        throw Error('State does not have the expected shape');
    }
}

export function useCurrentUser<T extends MinimalUser>(): Readonly<T> | null {
    const authState = useAuthenticationState();
    const users = useSelector(getUsers);
    if (authState.firebaseUser != null) {
        console.log(typeof users);
        console.log(users);
        return users.get(authState.firebaseUser.uid) as Readonly<T>;
    } else {
        return null;
    }
}
