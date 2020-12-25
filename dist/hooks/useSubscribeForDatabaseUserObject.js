import { useEffect, useState } from 'react';
import { subscribeForUser } from '../firebase/users/subscribeForUser';
import { useSetRecoilState } from 'recoil';
import { usersAtom } from '../atoms/usersAtom';
import produce from 'immer';
export function useSubscribeForDatabaseUserObject(authenticationState, database) {
    var setUsers = useSetRecoilState(usersAtom);
    var _a = useState(true), loadingUserFromDatabase = _a[0], setLoadingUserFromDatabase = _a[1];
    useEffect(function () {
        var unsubscribe;
        if (authenticationState.firebaseUser != null) {
            unsubscribe = subscribeForUser(database, authenticationState.firebaseUser.uid, function (document) {
                if (document != null) {
                    setUsers(function (oldUsers) {
                        return produce(oldUsers, function (draft) {
                            draft.set(document.id(), document);
                        });
                    });
                }
                setLoadingUserFromDatabase(false);
            });
        }
        return function () {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [authenticationState, database, setUsers]);
    return loadingUserFromDatabase;
}
//# sourceMappingURL=useSubscribeForDatabaseUserObject.js.map