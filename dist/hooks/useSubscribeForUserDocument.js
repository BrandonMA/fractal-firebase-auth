import { useContext, useEffect, useState } from 'react';
import { subscribeForUserDocument } from '../firebase/users/subscribeForUserDocument';
import { UserDocumentContext } from '../context/UserDocumentProvider';
export function useSubscribeForUserDocument(firebaseUser, database) {
    var _a = useContext(UserDocumentContext), setUser = _a[1];
    var _b = useState(true), loadingUserFromDatabase = _b[0], setLoadingUserFromDatabase = _b[1];
    useEffect(function () {
        var unsubscribe;
        if (firebaseUser != null) {
            unsubscribe = subscribeForUserDocument(database, firebaseUser.uid, function (document) {
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
//# sourceMappingURL=useSubscribeForUserDocument.js.map