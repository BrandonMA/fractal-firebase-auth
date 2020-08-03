import { useDispatch } from 'react-redux';
import { signUp } from '../thunks';
import { useCallback } from 'react';
import { authenticationSlice } from '../slices/createAuthenticationSlice';

export function useSignUp(slice: typeof authenticationSlice, email: string, password: string): () => Promise<void> {
    const dispatch = useDispatch();
    return useCallback(async () => {
        await dispatch(
            signUp(slice, {
                email,
                password
            })
        );
    }, [slice, email, password, dispatch]);
}
