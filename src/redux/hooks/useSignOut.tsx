import { useDispatch } from 'react-redux';
import { signOut } from '../thunks';
import { useCallback } from 'react';

export function useSignOut(): () => Promise<void> {
    const dispatch = useDispatch();
    return useCallback(async () => {
        await dispatch(signOut());
    }, [dispatch]);
}
