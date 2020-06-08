import { useDispatch } from 'react-redux';
import { createUser } from '../thunks';
import { MinimalExpectedReduxState } from '../types/MinimalExpectedReduxState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { useCallback } from 'react';
import { UsersSlice } from '../slices/createUsersSlice';
import { MinimalUserData } from '../types/MinimalUser';
import { MinimalExpectedDatabase } from '../types/MinimalExpectedDatabase';

export function useCreateUser<T extends MinimalUserData, S>(
    database: MinimalExpectedDatabase<T, S>,
    data: T,
    usersSlice: UsersSlice
): () => Promise<void> {
    const dispatch = useDispatch<ThunkDispatch<Promise<void>, MinimalExpectedReduxState, Action>>();
    return useCallback(() => {
        return dispatch(createUser(database, data, usersSlice));
    }, [dispatch, database, data, usersSlice]);
}
