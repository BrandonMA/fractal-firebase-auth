import firebase from 'firebase/app';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { MinimalExpectedReduxState } from '../..';
import { MinimalExpectedDatabase } from '../../types/MinimalExpectedDatabase';
import { MinimalUserData } from '../../types';
import { UsersSlice } from '../../slices';
export declare function subscribeForUser<T extends MinimalUserData, S>(database: MinimalExpectedDatabase<T, S>, id: string, usersSlice: UsersSlice, onFetchDone?: () => void): (dispatch: ThunkDispatch<Promise<void>, MinimalExpectedReduxState, Action>) => firebase.Unsubscribe;
