import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthenticationState } from '../..';
export declare function subscribeForAuthenticatedUser(onFetch: (state: AuthenticationState) => void): firebase.Unsubscribe;
