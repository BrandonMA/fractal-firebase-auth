import { useDispatch } from 'react-redux';
import { subscribeForAuthenticatedUser } from '../thunks';
import { AuthenticationSlice } from '../slices/createAuthenticationSlice';
import { MinimalExpectedReduxState } from '../types/MinimalExpectedReduxState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { useCallback } from 'react';

export function useSubscribeForAuthenticatedUser(slice: AuthenticationSlice): () => firebase.Unsubscribe {
    const dispatch = useDispatch<ThunkDispatch<firebase.Unsubscribe, MinimalExpectedReduxState, Action>>();
    return useCallback(() => {
        return dispatch(subscribeForAuthenticatedUser(slice));
    }, [dispatch, slice]);
}
