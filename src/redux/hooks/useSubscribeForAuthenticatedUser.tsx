import { useDispatch } from 'react-redux';
import { subscribeForAuthenticatedUser } from '../thunks';
import { MinimalExpectedReduxState } from '../types/MinimalExpectedReduxState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { useCallback } from 'react';
import { authenticationSlice } from '../slices';

export function useSubscribeForAuthenticatedUser(slice: typeof authenticationSlice): () => firebase.Unsubscribe {
    const dispatch = useDispatch<ThunkDispatch<firebase.Unsubscribe, MinimalExpectedReduxState, Action>>();
    return useCallback(() => {
        return dispatch(subscribeForAuthenticatedUser(slice));
    }, [dispatch, slice]);
}
