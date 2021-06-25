import { MinimalUserData } from '..';
import { Document } from '@bma98/firebase-db-manager';
import { useContext } from 'react';
import { UserDocumentContext } from '../context/UserDocumentProvider';

export function useUserDocument<T extends MinimalUserData, S>(): Document<T, S> | undefined | null {
    const [user] = useContext(UserDocumentContext);
    return user as unknown as Document<T, S>;
}
