import { ThunkDispatch, Action } from '@reduxjs/toolkit';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { EmailPasswordPair } from '../../types/EmailPasswordPair';
import { MinimalExpectedReduxState } from '../../types/MinimalExpectedReduxState';
import { authenticationSlice } from '../../slices/createAuthenticationSlice';

export const signUp = (slice: typeof authenticationSlice, user: EmailPasswordPair) => async (
    dispatch: ThunkDispatch<firebase.Unsubscribe, MinimalExpectedReduxState, Action>
): Promise<void> => {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    dispatch(
        slice.actions.setAuthenticationState({
            firebaseUser: userCredential.user,
            loading: false
        })
    );
};
