import { useRecoilValue } from 'recoil';
import { usersAtom } from '../atoms/usersAtom';
import { authenticationAtom } from '../atoms/authenticationAtom';
export function useAuthenticatedUser() {
    var users = useRecoilValue(usersAtom);
    var auth = useRecoilValue(authenticationAtom);
    if (auth.firebaseUser != null && users.has(auth.firebaseUser.uid)) {
        return users.get(auth.firebaseUser.uid);
    }
    return undefined;
}
//# sourceMappingURL=useAuthenticatedUser.jsx.map