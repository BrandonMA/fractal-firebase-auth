import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { MinimalExpectedReduxState } from '../..';
import { MinimalExpectedDatabase } from '../../types/MinimalExpectedDatabase';
import { MinimalUserData } from '../../types';
import { UsersSlice } from '../../slices';

export function createUser<T extends MinimalUserData, S>(database: MinimalExpectedDatabase<T, S>, data: T, usersSlice: UsersSlice) {
    return async (dispatch: ThunkDispatch<Promise<void>, MinimalExpectedReduxState, Action>): Promise<void> => {
        const userDocument = await database.collections.users.createDocument(data);
        dispatch(usersSlice.actions.setUser(userDocument));
    };
}
