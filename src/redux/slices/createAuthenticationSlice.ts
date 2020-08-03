import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthenticationState } from '../types/AuthenticationState';
import { signOut } from '../thunks/Authentication/signOut';
import * as firebase from 'firebase/app';

const initialState: Readonly<AuthenticationState> = Object.freeze({
    firebaseUser: undefined,
    loading: true
});

function replaceAuthenticationState(state: AuthenticationState, action: PayloadAction<AuthenticationState>): void {
    state.loading = action.payload.loading;
    state.firebaseUser = action.payload.firebaseUser;
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setFirebaseUser: (state, action: PayloadAction<firebase.User | null | undefined>): void => {
            state.firebaseUser = action.payload;
        },
        setLoadingFirebaseData: (state, action: PayloadAction<boolean>): void => {
            state.loading = action.payload;
        },
        setAuthenticationState: replaceAuthenticationState
    },
    extraReducers: (builder) => {
        builder.addCase(signOut.fulfilled, replaceAuthenticationState);
    }
});
