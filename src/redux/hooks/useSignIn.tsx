import { useDispatch } from 'react-redux';
import { signIn } from '../thunks';
import { useCallback } from 'react';
import { authenticationSlice } from '../slices/createAuthenticationSlice';

export function useSignIn(slice: typeof authenticationSlice, email: string, password: string): () => Promise<void> {
    const dispatch = useDispatch();
    return useCallback(async () => {
        await dispatch(
            signIn(slice, {
                email,
                password
            })
        );
    }, [slice, email, password, dispatch]);
}
