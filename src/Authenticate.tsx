import { useAuthenticationState } from './redux/hooks/useAuthenticationState';
import { useCurrentUser } from './redux/hooks/useCurrentUser';
import { MinimalUserData, UsersSlice, useSubscribeForAuthenticatedUser, useSubscribeForUser, authenticationSlice } from './redux';
import { useEffect, useState, useCallback } from 'react';
import { MinimalExpectedDatabase } from './redux/types/MinimalExpectedDatabase';

interface Props {
    database: MinimalExpectedDatabase<MinimalUserData, null>;
    authenticationSlice: typeof authenticationSlice;
    usersSlice: UsersSlice;
    loadingComponent: JSX.Element;
    authenticationComponent: JSX.Element;
    userNotAvailableComponent: JSX.Element;
    children: JSX.Element;
}

export function Authenticate(props: Props): JSX.Element {
    const authenticationState = useAuthenticationState();
    const currentUser = useCurrentUser();
    const [listeningForUser, setListeningForUser] = useState(false);
    const { database, authenticationSlice, usersSlice } = props;
    const subscribeForAuthenticatedUser = useSubscribeForAuthenticatedUser(authenticationSlice);
    const onFetch = useCallback(() => {
        setListeningForUser(true);
    }, []);
    const subscribeForUser = useSubscribeForUser(database, authenticationState.firebaseUser?.uid ?? '', usersSlice, onFetch);

    useEffect(() => {
        const unsubscribe = subscribeForAuthenticatedUser();
        return (): void => {
            unsubscribe(); // Remove auth listening when the component is unmounted.
        };
    }, [subscribeForAuthenticatedUser]);

    useEffect(() => {
        let unsubscribe: firebase.Unsubscribe | undefined;
        if (authenticationState.firebaseUser != null) {
            unsubscribe = subscribeForUser();
        }
        return (): void => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [subscribeForUser, authenticationState]);

    if (authenticationState.firebaseUser === undefined && authenticationState.loading) {
        return props.loadingComponent;
    } else if (authenticationState.firebaseUser === null && authenticationState.loading === false) {
        return props.authenticationComponent;
    } else {
        if (listeningForUser) {
            if (currentUser == null) {
                return props.userNotAvailableComponent;
            } else {
                return props.children;
            }
        }
        return props.loadingComponent;
    }
}
