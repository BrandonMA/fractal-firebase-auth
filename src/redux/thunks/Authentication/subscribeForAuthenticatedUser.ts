import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { MinimalExpectedReduxState } from '../..';
import { authenticationSlice } from '../../slices';

export const subscribeForAuthenticatedUser = (slice: typeof authenticationSlice) => (
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
