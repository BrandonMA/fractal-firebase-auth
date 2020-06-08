import { useDispatch } from 'react-redux';
import { MinimalExpectedReduxState } from '../types/MinimalExpectedReduxState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { useCallback } from 'react';
import { subscribeForUser } from '../thunks/Users/subscribeForUser';
import { MinimalExpectedDatabase } from '../types/MinimalExpectedDatabase';
import { UsersSlice } from '../slices/createUsersSlice';
import { MinimalUserData } from '../types/MinimalUser';

export function useSubscribeForUser<T extends MinimalUserData, S>(
    database: MinimalExpectedDatabase<T, S>,
    id: string,
    usersSlice: UsersSlice,
    onFetchDone?: () => void
): () => firebase.Unsubscribe {
    const dispatch = useDispatch<ThunkDispatch<firebase.Unsubscribe, MinimalExpectedReduxState, Action>>();
    return useCallback(() => {
        return dispatch(subscribeForUser(database, id, usersSlice, onFetchDone));
    }, [dispatch, database, id, usersSlice, onFetchDone]);
}
