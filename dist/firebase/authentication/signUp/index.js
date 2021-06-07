var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import firebase from 'firebase/app';
import 'firebase/auth';
import { createAuthenticationState } from '../../../types/AuthenticationState';
export function signUp(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const userCredential = yield firebase.auth().createUserWithEmailAndPassword(email, password);
        return createAuthenticationState({
            firebaseUser: userCredential.user,
            loading: false,
            credential: userCredential
        });
    });
}
//# sourceMappingURL=index.js.map