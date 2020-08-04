import { MinimalUserData } from './redux';
import { useEffect, useState } from 'react';
import { MinimalExpectedDatabase } from './redux/types/MinimalExpectedDatabase';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { authenticationAtom, currentUserSelector, usersAtom } from './recoil';
import { subscribeForAuthenticatedUser } from './firebase/Authentication/subscribeForAuthenticatedUser';
import { subscribeForUser } from './firebase/Users/subscribeForUser';

interface Props {
    database: MinimalExpectedDatabase<MinimalUserData, null>;
    loadingComponent: JSX.Element;
    authenticationComponent: JSX.Element;
    userNotAvailableComponent: JSX.Element;
    children: JSX.Element;
    errorComponet: JSX.Element;
}

export function Authenticate(props: Props): JSX.Element {
    const [authenticationState, setAuthenticationState] = useRecoilState(authenticationAtom);
    const setUsers = useSetRecoilState(usersAtom);
    const currentUser = useRecoilValue(currentUserSelector);
    const [listeningForUser, setListeningForUser] = useState(false);
    const { database } = props;

    useEffect(() => {
        const unsubscribe = subscribeForAuthenticatedUser((authState) => {
            setAuthenticationState(authState);
        });
        return (): void => {
            unsubscribe(); // Remove auth listening when the component is unmounted.
        };
    }, [setAuthenticationState]);

    useEffect(() => {
        let unsubscribe: firebase.Unsubscribe | undefined;
        if (authenticationState.firebaseUser != null) {
            unsubscribe = subscribeForUser(database, authenticationState.firebaseUser?.uid, (document) => {
                if (document !== undefined) {
                    setUsers((oldUsers) => oldUsers.set(document?.id, document));
                }
                setListeningForUser(true);
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
        if (listeningForUser) {
            if (currentUser == null) {
                return props.userNotAvailableComponent;
            } else {
                return props.children;
            }
        }
        return props.errorComponet;
    }
}
