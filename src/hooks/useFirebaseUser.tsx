import { MinimalUserData } from '..';
import { Document } from '@bma98/firebase-db-manager';
import { useContext } from 'react';
import { FirebaseUserContext } from '../context/FirebaseUserProvider';

export function useFirebaseUser<T extends MinimalUserData, S>(): Document<T, S> | undefined {
    const [user] = useContext(FirebaseUserContext);
    return (user as unknown) as Document<T, S>;
}
