import produce from 'immer';
export function createAuthenticationState(values) {
    var newObject = produce({
        firebaseUser: undefined,
        loading: true,
        credential: undefined
    }, function (draft) {
        Object.assign(draft, values);
    });
    return newObject;
}
export function isAuthenticationState(value) {
    var castedValue = value;
    return castedValue.loading != null;
}
//# sourceMappingURL=AuthenticationState.js.map