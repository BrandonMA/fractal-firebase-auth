import { PayloadAction, ActionCreatorWithPreparedPayload } from '@reduxjs/toolkit';
import { AuthenticationState } from '../types/AuthenticationState';
import * as firebase from 'firebase/app';
declare type ReducerFunction = (state: AuthenticationState, action: PayloadAction<AuthenticationState>) => void;
interface ExtraReducers<ThunkArg = void> {
    [key: string]: {
        callback: ReducerFunction;
        fullfilled: ActionCreatorWithPreparedPayload<[AuthenticationState, string, ThunkArg], AuthenticationState, string, never>;
    };
}
export declare function createAuthenticationSlice<ThunkArg = void>(reducers?: ExtraReducers<ThunkArg>, extraReducers?: ExtraReducers<ThunkArg>): import("@reduxjs/toolkit").Slice<Readonly<AuthenticationState>, {
    setFirebaseUser: (state: {
        firebaseUser: {
            delete: () => Promise<void>;
            emailVerified: boolean;
            getIdTokenResult: (forceRefresh?: boolean | undefined) => Promise<firebase.auth.IdTokenResult>;
            getIdToken: (forceRefresh?: boolean | undefined) => Promise<string>;
            isAnonymous: boolean;
            linkAndRetrieveDataWithCredential: (credential: firebase.auth.AuthCredential) => Promise<firebase.auth.UserCredential>;
            linkWithCredential: (credential: firebase.auth.AuthCredential) => Promise<firebase.auth.UserCredential>;
            linkWithPhoneNumber: (phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier) => Promise<firebase.auth.ConfirmationResult>;
            linkWithPopup: (provider: firebase.auth.AuthProvider) => Promise<firebase.auth.UserCredential>;
            linkWithRedirect: (provider: firebase.auth.AuthProvider) => Promise<void>;
            metadata: {
                creationTime?: string | undefined;
                lastSignInTime?: string | undefined;
            };
            multiFactor: {
                enrolledFactors: {
                    uid: string;
                    displayName?: string | null | undefined;
                    enrollmentTime: string;
                    factorId: string;
                }[];
                enroll: (assertion: firebase.auth.MultiFactorAssertion, displayName?: string | null | undefined) => Promise<void>;
                getSession: () => Promise<firebase.auth.MultiFactorSession>;
                unenroll: (option: string | firebase.auth.MultiFactorInfo) => Promise<void>;
            };
            phoneNumber: string | null;
            providerData: ({
                displayName: string | null;
                email: string | null;
                phoneNumber: string | null;
                photoURL: string | null;
                providerId: string;
                uid: string;
            } | null)[];
            reauthenticateAndRetrieveDataWithCredential: (credential: firebase.auth.AuthCredential) => Promise<firebase.auth.UserCredential>;
            reauthenticateWithCredential: (credential: firebase.auth.AuthCredential) => Promise<firebase.auth.UserCredential>;
            reauthenticateWithPhoneNumber: (phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier) => Promise<firebase.auth.ConfirmationResult>;
            reauthenticateWithPopup: (provider: firebase.auth.AuthProvider) => Promise<firebase.auth.UserCredential>;
            reauthenticateWithRedirect: (provider: firebase.auth.AuthProvider) => Promise<void>;
            refreshToken: string;
            reload: () => Promise<void>;
            sendEmailVerification: (actionCodeSettings?: firebase.auth.ActionCodeSettings | null | undefined) => Promise<void>;
            tenantId: string | null;
            toJSON: () => Object;
            unlink: (providerId: string) => Promise<firebase.User>;
            updateEmail: (newEmail: string) => Promise<void>;
            updatePassword: (newPassword: string) => Promise<void>;
            updatePhoneNumber: (phoneCredential: firebase.auth.AuthCredential) => Promise<void>;
            updateProfile: (profile: {
                displayName?: string | null | undefined;
                photoURL?: string | null | undefined;
            }) => Promise<void>;
            verifyBeforeUpdateEmail: (newEmail: string, actionCodeSettings?: firebase.auth.ActionCodeSettings | null | undefined) => Promise<void>;
            displayName: string | null;
            email: string | null;
            photoURL: string | null;
            providerId: string;
            uid: string;
        } | null | undefined;
        loading: boolean;
    }, action: PayloadAction<firebase.User | null | undefined>) => void;
    setLoadingFirebaseData: (state: {
        firebaseUser: {
            delete: () => Promise<void>;
            emailVerified: boolean;
            getIdTokenResult: (forceRefresh?: boolean | undefined) => Promise<firebase.auth.IdTokenResult>;
            getIdToken: (forceRefresh?: boolean | undefined) => Promise<string>;
            isAnonymous: boolean;
            linkAndRetrieveDataWithCredential: (credential: firebase.auth.AuthCredential) => Promise<firebase.auth.UserCredential>;
            linkWithCredential: (credential: firebase.auth.AuthCredential) => Promise<firebase.auth.UserCredential>;
            linkWithPhoneNumber: (phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier) => Promise<firebase.auth.ConfirmationResult>;
            linkWithPopup: (provider: firebase.auth.AuthProvider) => Promise<firebase.auth.UserCredential>;
            linkWithRedirect: (provider: firebase.auth.AuthProvider) => Promise<void>;
            metadata: {
                creationTime?: string | undefined;
                lastSignInTime?: string | undefined;
            };
            multiFactor: {
                enrolledFactors: {
                    uid: string;
                    displayName?: string | null | undefined;
                    enrollmentTime: string;
                    factorId: string;
                }[];
                enroll: (assertion: firebase.auth.MultiFactorAssertion, displayName?: string | null | undefined) => Promise<void>;
                getSession: () => Promise<firebase.auth.MultiFactorSession>;
                unenroll: (option: string | firebase.auth.MultiFactorInfo) => Promise<void>;
            };
            phoneNumber: string | null;
            providerData: ({
                displayName: string | null;
                email: string | null;
                phoneNumber: string | null;
                photoURL: string | null;
                providerId: string;
                uid: string;
            } | null)[];
            reauthenticateAndRetrieveDataWithCredential: (credential: firebase.auth.AuthCredential) => Promise<firebase.auth.UserCredential>;
            reauthenticateWithCredential: (credential: firebase.auth.AuthCredential) => Promise<firebase.auth.UserCredential>;
            reauthenticateWithPhoneNumber: (phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier) => Promise<firebase.auth.ConfirmationResult>;
            reauthenticateWithPopup: (provider: firebase.auth.AuthProvider) => Promise<firebase.auth.UserCredential>;
            reauthenticateWithRedirect: (provider: firebase.auth.AuthProvider) => Promise<void>;
            refreshToken: string;
            reload: () => Promise<void>;
            sendEmailVerification: (actionCodeSettings?: firebase.auth.ActionCodeSettings | null | undefined) => Promise<void>;
            tenantId: string | null;
            toJSON: () => Object;
            unlink: (providerId: string) => Promise<firebase.User>;
            updateEmail: (newEmail: string) => Promise<void>;
            updatePassword: (newPassword: string) => Promise<void>;
            updatePhoneNumber: (phoneCredential: firebase.auth.AuthCredential) => Promise<void>;
            updateProfile: (profile: {
                displayName?: string | null | undefined;
                photoURL?: string | null | undefined;
            }) => Promise<void>;
            verifyBeforeUpdateEmail: (newEmail: string, actionCodeSettings?: firebase.auth.ActionCodeSettings | null | undefined) => Promise<void>;
            displayName: string | null;
            email: string | null;
            photoURL: string | null;
            providerId: string;
            uid: string;
        } | null | undefined;
        loading: boolean;
    }, action: PayloadAction<boolean>) => void;
} | {
    setFirebaseUser: (state: {
        firebaseUser: {
            delete: () => Promise<void>;
            emailVerified: boolean;
            getIdTokenResult: (forceRefresh?: boolean | undefined) => Promise<firebase.auth.IdTokenResult>;
            getIdToken: (forceRefresh?: boolean | undefined) => Promise<string>;
            isAnonymous: boolean;
            linkAndRetrieveDataWithCredential: (credential: firebase.auth.AuthCredential) => Promise<firebase.auth.UserCredential>;
            linkWithCredential: (credential: firebase.auth.AuthCredential) => Promise<firebase.auth.UserCredential>;
            linkWithPhoneNumber: (phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier) => Promise<firebase.auth.ConfirmationResult>;
            linkWithPopup: (provider: firebase.auth.AuthProvider) => Promise<firebase.auth.UserCredential>;
            linkWithRedirect: (provider: firebase.auth.AuthProvider) => Promise<void>;
            metadata: {
                creationTime?: string | undefined;
                lastSignInTime?: string | undefined;
            };
            multiFactor: {
                enrolledFactors: {
                    uid: string;
                    displayName?: string | null | undefined;
                    enrollmentTime: string;
                    factorId: string;
                }[];
                enroll: (assertion: firebase.auth.MultiFactorAssertion, displayName?: string | null | undefined) => Promise<void>;
                getSession: () => Promise<firebase.auth.MultiFactorSession>;
                unenroll: (option: string | firebase.auth.MultiFactorInfo) => Promise<void>;
            };
            phoneNumber: string | null;
            providerData: ({
                displayName: string | null;
                email: string | null;
                phoneNumber: string | null;
                photoURL: string | null;
                providerId: string;
                uid: string;
            } | null)[];
            reauthenticateAndRetrieveDataWithCredential: (credential: firebase.auth.AuthCredential) => Promise<firebase.auth.UserCredential>;
            reauthenticateWithCredential: (credential: firebase.auth.AuthCredential) => Promise<firebase.auth.UserCredential>;
            reauthenticateWithPhoneNumber: (phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier) => Promise<firebase.auth.ConfirmationResult>;
            reauthenticateWithPopup: (provider: firebase.auth.AuthProvider) => Promise<firebase.auth.UserCredential>;
            reauthenticateWithRedirect: (provider: firebase.auth.AuthProvider) => Promise<void>;
            refreshToken: string;
            reload: () => Promise<void>;
            sendEmailVerification: (actionCodeSettings?: firebase.auth.ActionCodeSettings | null | undefined) => Promise<void>;
            tenantId: string | null;
            toJSON: () => Object;
            unlink: (providerId: string) => Promise<firebase.User>;
            updateEmail: (newEmail: string) => Promise<void>;
            updatePassword: (newPassword: string) => Promise<void>;
            updatePhoneNumber: (phoneCredential: firebase.auth.AuthCredential) => Promise<void>;
            updateProfile: (profile: {
                displayName?: string | null | undefined;
                photoURL?: string | null | undefined;
            }) => Promise<void>;
            verifyBeforeUpdateEmail: (newEmail: string, actionCodeSettings?: firebase.auth.ActionCodeSettings | null | undefined) => Promise<void>;
            displayName: string | null;
            email: string | null;
            photoURL: string | null;
            providerId: string;
            uid: string;
        } | null | undefined;
        loading: boolean;
    }, action: PayloadAction<firebase.User | null | undefined>) => void;
    setLoadingFirebaseData: (state: {
        firebaseUser: {
            delete: () => Promise<void>;
            emailVerified: boolean;
            getIdTokenResult: (forceRefresh?: boolean | undefined) => Promise<firebase.auth.IdTokenResult>;
            getIdToken: (forceRefresh?: boolean | undefined) => Promise<string>;
            isAnonymous: boolean;
            linkAndRetrieveDataWithCredential: (credential: firebase.auth.AuthCredential) => Promise<firebase.auth.UserCredential>;
            linkWithCredential: (credential: firebase.auth.AuthCredential) => Promise<firebase.auth.UserCredential>;
            linkWithPhoneNumber: (phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier) => Promise<firebase.auth.ConfirmationResult>;
            linkWithPopup: (provider: firebase.auth.AuthProvider) => Promise<firebase.auth.UserCredential>;
            linkWithRedirect: (provider: firebase.auth.AuthProvider) => Promise<void>;
            metadata: {
                creationTime?: string | undefined;
                lastSignInTime?: string | undefined;
            };
            multiFactor: {
                enrolledFactors: {
                    uid: string;
                    displayName?: string | null | undefined;
                    enrollmentTime: string;
                    factorId: string;
                }[];
                enroll: (assertion: firebase.auth.MultiFactorAssertion, displayName?: string | null | undefined) => Promise<void>;
                getSession: () => Promise<firebase.auth.MultiFactorSession>;
                unenroll: (option: string | firebase.auth.MultiFactorInfo) => Promise<void>;
            };
            phoneNumber: string | null;
            providerData: ({
                displayName: string | null;
                email: string | null;
                phoneNumber: string | null;
                photoURL: string | null;
                providerId: string;
                uid: string;
            } | null)[];
            reauthenticateAndRetrieveDataWithCredential: (credential: firebase.auth.AuthCredential) => Promise<firebase.auth.UserCredential>;
            reauthenticateWithCredential: (credential: firebase.auth.AuthCredential) => Promise<firebase.auth.UserCredential>;
            reauthenticateWithPhoneNumber: (phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier) => Promise<firebase.auth.ConfirmationResult>;
            reauthenticateWithPopup: (provider: firebase.auth.AuthProvider) => Promise<firebase.auth.UserCredential>;
            reauthenticateWithRedirect: (provider: firebase.auth.AuthProvider) => Promise<void>;
            refreshToken: string;
            reload: () => Promise<void>;
            sendEmailVerification: (actionCodeSettings?: firebase.auth.ActionCodeSettings | null | undefined) => Promise<void>;
            tenantId: string | null;
            toJSON: () => Object;
            unlink: (providerId: string) => Promise<firebase.User>;
            updateEmail: (newEmail: string) => Promise<void>;
            updatePassword: (newPassword: string) => Promise<void>;
            updatePhoneNumber: (phoneCredential: firebase.auth.AuthCredential) => Promise<void>;
            updateProfile: (profile: {
                displayName?: string | null | undefined;
                photoURL?: string | null | undefined;
            }) => Promise<void>;
            verifyBeforeUpdateEmail: (newEmail: string, actionCodeSettings?: firebase.auth.ActionCodeSettings | null | undefined) => Promise<void>;
            displayName: string | null;
            email: string | null;
            photoURL: string | null;
            providerId: string;
            uid: string;
        } | null | undefined;
        loading: boolean;
    }, action: PayloadAction<boolean>) => void;
}, "authentication">;
export {};
