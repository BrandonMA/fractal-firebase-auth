import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { MinimalExpectedReduxState } from '../..';
import { MinimalExpectedDatabase } from '../../types/MinimalExpectedDatabase';
import { MinimalUserData } from '../../types';
import { UsersSlice } from '../../slices';
export declare function updateUser<T extends MinimalUserData, S>(database: MinimalExpectedDatabase<T, S>, data: T, usersSlice: UsersSlice): (dispatch: ThunkDispatch<Promise<void>, MinimalExpectedReduxState, Action>) => Promise<void>;
