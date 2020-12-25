import { useRecoilValue } from 'recoil';
import { usersAtom } from '../atoms/usersAtom';
import { MinimalUserData } from '..';
import { Document } from '@bma98/firebase-db-manager';
import { useAuthenticationState } from './useAuthenticationState';

export function useAuthenticatedUser<T extends MinimalUserData, S>(): Document<T, S> | undefined {
    const users = useRecoilValue(usersAtom);
    const auth = useAuthenticationState();
    if (auth.firebaseUser != null && users.has(auth.firebaseUser.uid)) {
        return users.get(auth.firebaseUser.uid) as Document<T, S>;
    }
    return undefined;
}
