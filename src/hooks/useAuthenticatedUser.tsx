import { useRecoilValue } from 'recoil';
import { usersAtom } from '../atoms/usersAtom';
import { authenticationAtom } from '../atoms/authenticationAtom';
import { MinimalUserData } from '..';
import { Document } from '@bma98/firebase-db-manager';

export function useAuthenticatedUser<T extends MinimalUserData, S>(): Document<T, S> | undefined {
    const users = useRecoilValue(usersAtom);
    const auth = useRecoilValue(authenticationAtom);
    if (auth.firebaseUser != null && users.has(auth.firebaseUser.uid)) {
        return users.get(auth.firebaseUser.uid) as Document<T, S>;
    }
    return undefined;
}
