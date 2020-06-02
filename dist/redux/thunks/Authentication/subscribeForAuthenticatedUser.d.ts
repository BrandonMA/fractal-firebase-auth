import firebase from 'firebase/app';
import 'firebase/auth';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { AuthenticationSlice, MinimalExpectedReduxState } from '../..';
declare const subscribeForAuthenticatedUser: (slice: AuthenticationSlice) => (dispatch: ThunkDispatch<firebase.Unsubscribe, MinimalExpectedReduxState, Action>) => firebase.Unsubscribe;
export default subscribeForAuthenticatedUser;
