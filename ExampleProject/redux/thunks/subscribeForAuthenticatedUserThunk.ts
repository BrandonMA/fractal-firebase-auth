import firebase from 'firebase/app';
import 'firebase/auth';
import { ThunkDispatch } from 'redux-thunk';
import { MinimalExpectedReduxState } from '../../../src/redux/types';
import { Action } from 'redux';
import { authenticationSlice } from '..';

const subscribeForAuthenticatedUserThunk = () => (
    dispatch: ThunkDispatch<firebase.Unsubscribe, MinimalExpectedReduxState, Action>
): void => {
    firebase.auth().onAuthStateChanged(
        (user) => {
            dispatch(authenticationSlice.actions.setFirebaseUser(user));
            dispatch(authenticationSlice.actions.setLoadingFirebaseData(false));
        },
        (error) => {
            alert(error.message);
        }
    );
};

export default subscribeForAuthenticatedUserThunk;
