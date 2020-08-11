import * as firebase from 'firebase/app';
export interface AuthenticationState {
    firebaseUser: firebase.User | undefined | null;
    loading: boolean;
}
export declare function createAuthenticationState(values?: Partial<AuthenticationState>): Readonly<AuthenticationState>;
export declare function isAuthenticationState(value: unknown): value is AuthenticationState;
