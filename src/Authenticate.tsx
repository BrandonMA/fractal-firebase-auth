import { useAuthenticationState } from './redux/hooks/useAuthenticationState';
import { useCurrentUser } from './redux/hooks/useCurrentUser';
import { ThunkDispatch } from 'redux-thunk';
import { MinimalExpectedReduxState, AuthenticationSlice } from './redux';
import { Action } from 'redux';
import subscribeForAuthenticatedUserThunk from './redux/thunks/Authentication/subscribeForAuthenticatedUser';
import { connect } from 'react-redux';
import { useEffect } from 'react';

interface ReduxFunctions {
    subscribeForAuthenticatedUser: () => firebase.Unsubscribe;
}

interface OwnProps {
    authenticationSlice: AuthenticationSlice;
    loadingComponent: JSX.Element;
    authenticationComponent: JSX.Element;
    userNotAvailableComponent: JSX.Element;
    children: JSX.Element;
}

interface Props extends OwnProps, ReduxFunctions {}

export function Authenticate(props: Props): JSX.Element {
    const authenticationState = useAuthenticationState();
    const currentUser = useCurrentUser();

    const { subscribeForAuthenticatedUser } = props;

    useEffect(() => {
        const unsubscribe = subscribeForAuthenticatedUser();
        return (): void => {
            unsubscribe(); // Remove auth listening when the component is unmounted.
        };
    }, [subscribeForAuthenticatedUser]);

    if (authenticationState.firebaseUser === undefined && authenticationState.loading) {
        return props.loadingComponent;
    } else if (authenticationState.firebaseUser === null && authenticationState.loading === false) {
        return props.authenticationComponent;
    } else {
        if (currentUser == null) {
            return props.userNotAvailableComponent;
        } else {
            return props.children;
        }
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<void, MinimalExpectedReduxState, Action>, ownProps: OwnProps): ReduxFunctions => ({
    subscribeForAuthenticatedUser(): firebase.Unsubscribe {
        return dispatch(subscribeForAuthenticatedUserThunk(ownProps.authenticationSlice));
    }
});

export default connect(null, mapDispatchToProps)(Authenticate);
