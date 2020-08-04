import * as firebase from 'firebase/app';

export interface AuthenticationState {
    firebaseUser: firebase.User | undefined | null;
    loading: boolean;
}

export function isAuthenticationState(value: unknown): value is AuthenticationState {
    const castedValue = value as AuthenticationState;
    return castedValue.loading != null;
}
