import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthenticationState } from '../types/AuthenticationState';
import { signIn } from '../thunks/Authentication/signIn';
import { signOut } from '../thunks/Authentication/signOut';
import { signUp } from '../thunks/Authentication/signUp';

const initialState: AuthenticationState = {
    firebaseUser: undefined,
    loading: true
};

type ReducerFunction = (state: AuthenticationState, action: PayloadAction<AuthenticationState>) => void;
interface ExtraReducers {
    [key: string]: ReducerFunction;
}

// eslint-disable-next-line
export function createAuthenticationSlice(extraReducers?: ExtraReducers) {
    return createSlice({
        name: 'authentication',
        initialState,
        reducers: {
            setLoadingFirebaseData: (state, action: PayloadAction<boolean>): void => {
                state.loading = action.payload;
            }
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
                        builder.addCase(reducerKey, extraReducers[reducerKey]);
                    }
                }
            }
        }
    });
}
