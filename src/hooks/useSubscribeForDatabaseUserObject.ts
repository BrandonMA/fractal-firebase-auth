import { useEffect, useState } from 'react';
import { subscribeForUser } from '../firebase/users/subscribeForUser';
import { AuthenticationState, MinimalUserData, MinimalExpectedDatabase } from '../types';
import { useSetRecoilState } from 'recoil';
import { usersAtom } from '../atoms/usersAtom';

export function useSubscribeForDatabaseUserObject<T extends MinimalUserData, S>(
    authenticationState: AuthenticationState,
    database: MinimalExpectedDatabase<T, S>
): boolean {
    const setUsers = useSetRecoilState(usersAtom);
    const [loadingUserFromDatabase, setLoadingUserFromDatabase] = useState(true);

    useEffect(() => {
        let unsubscribe: firebase.Unsubscribe | undefined;
        if (authenticationState.firebaseUser != null) {
            unsubscribe = subscribeForUser(database, authenticationState.firebaseUser.uid, (document) => {
                if (document != null) {
                    setUsers((oldUsers) => oldUsers.set(document.id(), document));
                }
                setLoadingUserFromDatabase(false);
            });
        }
        return (): void => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [authenticationState, database, setUsers]);

    return loadingUserFromDatabase;
}
