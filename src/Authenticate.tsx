import { useAuthenticationState } from './redux/hooks/useAuthenticationState';
import { useCurrentUser } from './redux/hooks/useCurrentUser';
import { ThunkDispatch } from 'redux-thunk';
import { MinimalExpectedReduxState, AuthenticationSlice, MinimalUserData, UsersSlice } from './redux';
import { Action } from 'redux';
import { subscribeForAuthenticatedUser } from './redux/thunks/Authentication/subscribeForAuthenticatedUser';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { subscribeForUser } from './redux/thunks/Users/subscribeForUser';
import { MinimalExpectedDatabase } from './redux/types/MinimalExpectedDatabase';

interface ReduxFunctions {
    subscribeForAuthenticatedUser: () => firebase.Unsubscribe;
    subscribeForUser: (
        database: MinimalExpectedDatabase<MinimalUserData, null>,
        id: string,
        onFetchDone: () => void
    ) => firebase.Unsubscribe;
}

interface OwnProps {
    database: MinimalExpectedDatabase<MinimalUserData, null>;
    authenticationSlice: AuthenticationSlice;
    usersSlice: UsersSlice;
    loadingComponent: JSX.Element;
    authenticationComponent: JSX.Element;
    userNotAvailableComponent: JSX.Element;
    children: JSX.Element;
}

interface Props extends OwnProps, ReduxFunctions {}

function Authenticate(props: Props): JSX.Element {
    const authenticationState = useAuthenticationState();
    const currentUser = useCurrentUser();
    const [listeningForUser, setListeningForUser] = useState(false);

    const { subscribeForAuthenticatedUser, database, subscribeForUser } = props;

    useEffect(() => {
        const unsubscribe = subscribeForAuthenticatedUser();
        return (): void => {
            unsubscribe(); // Remove auth listening when the component is unmounted.
        };
    }, [subscribeForAuthenticatedUser]);

    useEffect(() => {
        let unsubscribe: firebase.Unsubscribe | undefined;
        if (authenticationState.firebaseUser != null) {
            unsubscribe = subscribeForUser(database, authenticationState.firebaseUser.uid, () => {
                setListeningForUser(true);
            });
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

const mapDispatchToProps = (dispatch: ThunkDispatch<void, MinimalExpectedReduxState, Action>, ownProps: OwnProps): ReduxFunctions => ({
    subscribeForAuthenticatedUser(): firebase.Unsubscribe {
        return dispatch(subscribeForAuthenticatedUser(ownProps.authenticationSlice));
    },
    subscribeForUser(database: MinimalExpectedDatabase<MinimalUserData, null>, id: string, onFetchDone: () => void): firebase.Unsubscribe {
        return dispatch(subscribeForUser(database, id, ownProps.usersSlice, onFetchDone));
    }
});

export default connect(null, mapDispatchToProps)(Authenticate);
