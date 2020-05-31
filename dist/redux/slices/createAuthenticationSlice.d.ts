import { PayloadAction } from '@reduxjs/toolkit';
import { AuthenticationState } from '../types/AuthenticationState';
declare type ReducerFunction = (state: AuthenticationState, action: PayloadAction<AuthenticationState>) => void;
interface ExtraReducers {
    [key: string]: ReducerFunction;
}
export declare function createAuthenticationSlice(extraReducers?: ExtraReducers): import("@reduxjs/toolkit").Slice<AuthenticationState, {
    setLoadingFirebaseData: (state: {
        firebaseUser: {
            delete: () => Promise<void>;
            emailVerified: boolean;
            getIdTokenResult: (forceRefresh?: boolean | undefined) => Promise<import("firebase").auth.IdTokenResult>;
            getIdToken: (forceRefresh?: boolean | undefined) => Promise<string>;
            isAnonymous: boolean;
            linkAndRetrieveDataWithCredential: (credential: import("firebase").auth.AuthCredential) => Promise<import("firebase").auth.UserCredential>;
            linkWithCredential: (credential: import("firebase").auth.AuthCredential) => Promise<import("firebase").auth.UserCredential>;
            linkWithPhoneNumber: (phoneNumber: string, applicationVerifier: import("firebase").auth.ApplicationVerifier) => Promise<import("firebase").auth.ConfirmationResult>;
            linkWithPopup: (provider: import("firebase").auth.AuthProvider) => Promise<import("firebase").auth.UserCredential>;
            linkWithRedirect: (provider: import("firebase").auth.AuthProvider) => Promise<void>;
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
                enroll: (assertion: import("firebase").auth.MultiFactorAssertion, displayName?: string | null | undefined) => Promise<void>;
                getSession: () => Promise<import("firebase").auth.MultiFactorSession>;
                unenroll: (option: string | import("firebase").auth.MultiFactorInfo) => Promise<void>;
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
            reauthenticateAndRetrieveDataWithCredential: (credential: import("firebase").auth.AuthCredential) => Promise<import("firebase").auth.UserCredential>;
            reauthenticateWithCredential: (credential: import("firebase").auth.AuthCredential) => Promise<import("firebase").auth.UserCredential>;
            reauthenticateWithPhoneNumber: (phoneNumber: string, applicationVerifier: import("firebase").auth.ApplicationVerifier) => Promise<import("firebase").auth.ConfirmationResult>;
            reauthenticateWithPopup: (provider: import("firebase").auth.AuthProvider) => Promise<import("firebase").auth.UserCredential>;
            reauthenticateWithRedirect: (provider: import("firebase").auth.AuthProvider) => Promise<void>;
            refreshToken: string;
            reload: () => Promise<void>;
            sendEmailVerification: (actionCodeSettings?: import("firebase").auth.ActionCodeSettings | null | undefined) => Promise<void>;
            tenantId: string | null;
            toJSON: () => Object;
            unlink: (providerId: string) => Promise<import("firebase").User>;
            updateEmail: (newEmail: string) => Promise<void>;
            updatePassword: (newPassword: string) => Promise<void>;
            updatePhoneNumber: (phoneCredential: import("firebase").auth.AuthCredential) => Promise<void>;
            updateProfile: (profile: {
                displayName?: string | null | undefined;
                photoURL?: string | null | undefined;
            }) => Promise<void>;
            verifyBeforeUpdateEmail: (newEmail: string, actionCodeSettings?: import("firebase").auth.ActionCodeSettings | null | undefined) => Promise<void>;
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
