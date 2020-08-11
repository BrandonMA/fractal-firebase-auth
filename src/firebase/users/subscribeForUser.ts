import firebase from 'firebase/app';
import { MinimalExpectedDatabase } from '../../types/MinimalExpectedDatabase';
import { MinimalUserData } from '../../types';
import { Document } from '@bma98/firebase-db-manager';

export function subscribeForUser<T extends MinimalUserData, S>(
    database: MinimalExpectedDatabase<T, S>,
    id: string,
    onFetchDone?: (newDocument?: Document<T, S>) => void
): firebase.Unsubscribe {
    return database.collections.users.subscribeToDocument(
        id,
        (newDocument) => {
            if (onFetchDone) {
                onFetchDone(newDocument);
            }
        },
        (error) => {
            alert(error.message);
        },
        () => {
            if (onFetchDone) {
                onFetchDone();
            }
        }
    );
}
