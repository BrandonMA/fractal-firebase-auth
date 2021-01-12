import { useContext } from 'react';
import { FirebaseUserContext } from '../context/FirebaseUserProvider';
export function useFirebaseUser() {
    var user = useContext(FirebaseUserContext)[0];
    return user;
}
//# sourceMappingURL=useFirebaseUser.js.map