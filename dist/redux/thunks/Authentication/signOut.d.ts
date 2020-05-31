import 'firebase/auth';
import { AuthenticationState } from '../../types/AuthenticationState';
export declare const signOut: (() => import("@reduxjs/toolkit").AsyncThunkAction<AuthenticationState, void, {}>) & {
    pending: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[string, void], undefined, string, never, {
        arg: void;
        requestId: string;
    }>;
    rejected: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[Error | null, string, void, unknown?], unknown, string, import("@reduxjs/toolkit").SerializedError, {
        arg: void;
        requestId: string;
        aborted: boolean;
        condition: boolean;
    }>;
    fulfilled: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[AuthenticationState, string, void], AuthenticationState, string, never, {
        arg: void;
        requestId: string;
    }>;
    typePrefix: string;
};
