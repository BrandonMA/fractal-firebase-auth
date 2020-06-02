import { createSlice, PayloadAction, ActionCreatorWithPreparedPayload } from '@reduxjs/toolkit';
import { AuthenticationState } from '../types/AuthenticationState';
import { signIn } from '../thunks/Authentication/signIn';
import { signOut } from '../thunks/Authentication/signOut';
import { signUp } from '../thunks/Authentication/signUp';
import * as firebase from 'firebase/app';

const initialState: Readonly<AuthenticationState> = Object.freeze({
    firebaseUser: undefined,
    loading: true
});

type ReducerFunction = (state: AuthenticationState, action: PayloadAction<AuthenticationState>) => void;
interface ExtraReducers<ThunkArg = void> {
    [key: string]: {
        callback: ReducerFunction;
        fullfilled: ActionCreatorWithPreparedPayload<[AuthenticationState, string, ThunkArg], AuthenticationState, string, never>;
    };
}

// eslint-disable-next-line
export function createAuthenticationSlice<ThunkArg = void>(reducers?: ExtraReducers<ThunkArg>, extraReducers?: ExtraReducers<ThunkArg>) {
    return createSlice({
        name: 'authentication',
        initialState,
        reducers: {
            setFirebaseUser: (state, action: PayloadAction<firebase.User | null | undefined>): void => {
                state.firebaseUser = action.payload;
            },
            setLoadingFirebaseData: (state, action: PayloadAction<boolean>): void => {
                state.loading = action.payload;
            },
            setAuthenticationState: (state, action: PayloadAction<AuthenticationState>): void => {
                // Used to bypass the has not been read rule
                if (state != null) {
                    state = action.payload;
                }
            },
            ...reducers
        },
        extraReducers: (builder) => {
            const replaceAuthenticationState = (state: AuthenticationState, action: PayloadAction<AuthenticationState>): void => {
                // Used to bypass the has not been read rule
                if (state != null) {
                    state = action.payload;
                }
            };

            builder.addCase(signIn.fulfilled, replaceAuthenticationState);
            builder.addCase(signOut.fulfilled, replaceAuthenticationState);
            builder.addCase(signUp.fulfilled, replaceAuthenticationState);

            // Inject extra reducers
            if (extraReducers != null) {
                const keys = Object.keys(extraReducers);
                if (keys.length > 0) {
                    for (const reducerKey of keys) {
                        const data = extraReducers[reducerKey];
                        builder.addCase(data.fullfilled, data.callback);
                    }
                }
            }
        }
    });
}

export type AuthenticationSlice = ReturnType<typeof createAuthenticationSlice>;
