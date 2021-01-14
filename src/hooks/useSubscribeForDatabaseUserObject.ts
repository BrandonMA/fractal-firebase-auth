import { useContext, useEffect, useState } from 'react';
import { subscribeForUserDocument } from '../firebase/users/subscribeForUserDocument';
import { MinimalUserData, MinimalExpectedDatabase } from '../types';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirebaseUserContext } from '../context/FirebaseUserProvider';

export function useSubscribeForDatabaseUserObject<T extends MinimalUserData, S>(
    firebaseUser: FirebaseAuthTypes.User | null | undefined,
    database: MinimalExpectedDatabase<T, S>
): boolean {
    const [, setUser] = useContext(FirebaseUserContext);
    const [loadingUserFromDatabase, setLoadingUserFromDatabase] = useState(true);

    useEffect(() => {
        let unsubscribe: () => void | undefined;
        if (firebaseUser != null) {
            unsubscribe = subscribeForUserDocument(database, firebaseUser.uid, (document) => {
                if (document != null) {
                    setUser(document);
                }
                setLoadingUserFromDatabase(false);
            });
        }
        return (): void => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [firebaseUser, database, setUser]);

    return loadingUserFromDatabase;
}
