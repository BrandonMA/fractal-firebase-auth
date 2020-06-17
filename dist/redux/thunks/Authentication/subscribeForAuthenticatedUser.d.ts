import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { MinimalExpectedReduxState } from '../..';
import { authenticationSlice } from '../../slices';
export declare const subscribeForAuthenticatedUser: (slice: typeof authenticationSlice) => (dispatch: ThunkDispatch<firebase.Unsubscribe, MinimalExpectedReduxState, Action>) => firebase.Unsubscribe;
