import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authenticationAtom, useAuthenticatedUser, usersAtom } from './recoil';
import { subscribeForAuthenticatedUser } from './firebase/authentication/subscribeForAuthenticatedUser';
import { subscribeForUser } from './firebase/users/subscribeForUser';
import { MinimalExpectedDatabase, MinimalUserData } from './types';

interface Props<UserType extends MinimalUserData, UserSubCollection> {
    database: MinimalExpectedDatabase<UserType, UserSubCollection>;
    loadingComponent: JSX.Element;
    authenticationComponent: JSX.Element;
    userNotAvailableComponent: JSX.Element;
    children: JSX.Element;
}

export function Authenticate<UserType extends MinimalUserData, UserSubCollection>(props: Props<UserType, UserSubCollection>): JSX.Element {
    const [authenticationState, setAuthenticationState] = useRecoilState(authenticationAtom);
    const setUsers = useSetRecoilState(usersAtom);
    const currentUser = useAuthenticatedUser();
    const [loadingUserFromDatabase, setLoadingUserFromDatabase] = useState(true);
    const { database } = props;

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
        return props.loadingComponent;
    } else if (authenticationState.firebaseUser === null && authenticationState.loading === false) {
        return props.authenticationComponent;
    } else {
        if (loadingUserFromDatabase && currentUser == null) {
            return props.loadingComponent;
        } else {
            if (currentUser == null) {
                return props.userNotAvailableComponent;
            } else {
                return props.children;
            }
        }
    }
}
