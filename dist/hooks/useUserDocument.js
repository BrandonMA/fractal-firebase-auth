import { useContext } from 'react';
import { UserDocumentContext } from '../context/UserDocumentProvider';
export function useUserDocument() {
    var user = useContext(UserDocumentContext)[0];
    return user;
}
//# sourceMappingURL=useUserDocument.js.map