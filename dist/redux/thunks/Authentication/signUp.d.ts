import 'firebase/auth';
import { AuthenticationState } from '../../types/AuthenticationState';
import { EmailPasswordPair } from '../../types/EmailPasswordPair';
export declare const signUp: ((arg: EmailPasswordPair) => import("@reduxjs/toolkit").AsyncThunkAction<AuthenticationState, EmailPasswordPair, {}>) & {
    pending: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[string, EmailPasswordPair], undefined, string, never, {
        arg: EmailPasswordPair;
        requestId: string;
    }>;
    rejected: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[Error | null, string, EmailPasswordPair, unknown?], unknown, string, import("@reduxjs/toolkit").SerializedError, {
        arg: EmailPasswordPair;
        requestId: string;
        aborted: boolean;
        condition: boolean;
    }>;
    fulfilled: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[AuthenticationState, string, EmailPasswordPair], AuthenticationState, string, never, {
        arg: EmailPasswordPair;
        requestId: string;
    }>;
    typePrefix: string;
};
