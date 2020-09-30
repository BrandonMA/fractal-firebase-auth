import auth from '@react-native-firebase/auth';
export function reauthenticate(password) {
    var _a;
    var user = auth().currentUser;
    var credential = auth.EmailAuthProvider.credential((_a = user === null || user === void 0 ? void 0 : user.email) !== null && _a !== void 0 ? _a : '', password);
    return credential;
}
//# sourceMappingURL=index.native.js.map