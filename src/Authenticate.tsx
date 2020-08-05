import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { authenticationAtom, currentUserSelector, usersAtom } from './recoil';
import { subscribeForAuthenticatedUser } from './firebase/authentication/subscribeForAuthenticatedUser';
import { subscribeForUser } from './firebase/users/subscribeForUser';
import { MinimalExpectedDatabase, MinimalUserData } from './firebase/types';

interface Props {
    database: MinimalExpectedDatabase<MinimalUserData, null>;
    loadingComponent: JSX.Element;
    authenticationComponent: JSX.Element;
    userNotAvailableComponent: JSX.Element;
    children: JSX.Element;
}

export function Authenticate(props: Props): JSX.Element {
    const [authenticationState, setAuthenticationState] = useRecoilState(authenticationAtom);
    const setUsers = useSetRecoilState(usersAtom);
    const currentUser = useRecoilValue(currentUserSelector);
    const [loadingUserFromDatabase, setLoadingUserFromDatabase] = useState(true);
    const { database, loadingComponent, authenticationComponent, userNotAvailableComponent, children } = props;

    useEffect(() => {
        const unsubscribe = subscribeForAuthenticatedUser((authState) => {
            setAuthenticationState(authState);
        });
        return (): void => {
            unsubscribe();
        };
    }, [setAuthenticationState]);

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

    if (authenticationState.firebaseUser === undefined && authenticationState.loading) {
        return loadingComponent;
    } else if (authenticationState.firebaseUser === null && authenticationState.loading === false) {
        return authenticationComponent;
    } else {
        if (loadingUserFromDatabase && currentUser == null) {
            return loadingComponent;
        } else {
            if (currentUser == null) {
                return userNotAvailableComponent;
            } else {
                return children;
            }
        }
    }
}
