import firebase from 'firebase/app';
import { MinimalExpectedDatabase } from '../types/MinimalExpectedDatabase';
import { MinimalUserData, isMinimalUserData } from '../types';

export function subscribeForUser<T extends MinimalUserData, S>(
    database: MinimalExpectedDatabase<T, S>,
    id: string,
    onFetchDone?: (newDocument?: MinimalUserData) => void
): firebase.Unsubscribe {
    return database.collections.users.subscribeToDocument(
        id,
        (newDocument) => {
            if (onFetchDone && isMinimalUserData(newDocument)) {
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
