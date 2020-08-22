import { useRecoilValue } from 'recoil';
import { usersAtom } from './usersAtom';
import { authenticationAtom } from './authenticationAtom';
import { MinimalUserData } from '..';
import { Document } from '@bma98/firebase-db-manager';

export function useAuthenticatedUser(): Document<MinimalUserData, null> | undefined {
    const users = useRecoilValue(usersAtom);
    const auth = useRecoilValue(authenticationAtom);
    if (auth.firebaseUser != null && users.has(auth.firebaseUser.uid)) {
        return users.get(auth.firebaseUser.uid);
    }
    return undefined;
}
