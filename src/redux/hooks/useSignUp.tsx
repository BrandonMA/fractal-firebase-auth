import { useDispatch } from 'react-redux';
import { signUp } from '../thunks';
import { useCallback } from 'react';

export function useSignUp(email: string, password: string): () => Promise<void> {
    const dispatch = useDispatch();
    return useCallback(async () => {
        await dispatch(
            signUp({
                email,
                password
            })
        );
    }, [email, password, dispatch]);
}
