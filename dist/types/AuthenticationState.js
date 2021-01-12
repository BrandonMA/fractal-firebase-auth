import produce from 'immer';
export function createAuthenticationState(values) {
    return produce({
        firebaseUser: undefined,
        loading: true,
        credential: undefined
    }, function (draft) {
        Object.assign(draft, values);
    });
}
export function isAuthenticationState(value) {
    var castedValue = value;
    return castedValue.loading != null;
}
//# sourceMappingURL=AuthenticationState.js.map