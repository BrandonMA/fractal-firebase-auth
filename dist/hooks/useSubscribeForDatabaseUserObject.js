import { useContext, useEffect, useState } from 'react';
import { subscribeForUser } from '../firebase/users/subscribeForUser';
import { FirebaseUserContext } from '../context/FirebaseUserProvider';
export function useSubscribeForDatabaseUserObject(firebaseUser, database) {
    var _a = useContext(FirebaseUserContext), setUser = _a[1];
    var _b = useState(true), loadingUserFromDatabase = _b[0], setLoadingUserFromDatabase = _b[1];
    useEffect(function () {
        var unsubscribe;
        if (firebaseUser != null) {
            unsubscribe = subscribeForUser(database, firebaseUser.uid, function (document) {
                if (document != null) {
                    setUser(document);
                }
                setLoadingUserFromDatabase(false);
            });
        }
        return function () {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [firebaseUser, database, setUser]);
    return loadingUserFromDatabase;
}
//# sourceMappingURL=useSubscribeForDatabaseUserObject.js.map