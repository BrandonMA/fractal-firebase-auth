import { ThunkDispatch, Action } from '@reduxjs/toolkit';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { EmailPasswordPair } from '../../types/EmailPasswordPair';
import { MinimalExpectedReduxState } from '../../types/MinimalExpectedReduxState';
import { authenticationSlice } from '../../slices/createAuthenticationSlice';
export declare const signUp: (slice: typeof authenticationSlice, user: EmailPasswordPair) => (dispatch: ThunkDispatch<firebase.Unsubscribe, MinimalExpectedReduxState, Action>) => Promise<void>;
