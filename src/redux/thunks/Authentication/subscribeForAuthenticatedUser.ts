import firebase from 'firebase/app';
import 'firebase/auth';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { AuthenticationSlice, MinimalExpectedReduxState } from '../..';

export const subscribeForAuthenticatedUser = (slice: AuthenticationSlice) => (
    dispatch: ThunkDispatch<firebase.Unsubscribe, MinimalExpectedReduxState, Action>
): firebase.Unsubscribe => {
    return firebase.auth().onAuthStateChanged(
        (user) => {
            dispatch(
                slice.actions.setAuthenticationState({
                    firebaseUser: user,
                    loading: false
                })
            );
        },
        (error) => {
            alert(error.message);
        }
    );
};
