import { createAsyncThunk } from '@reduxjs/toolkit';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthenticationState } from '../../types/AuthenticationState';

export const signOut = createAsyncThunk(
    'authentication/signOut',
    async (): Promise<AuthenticationState> => {
        await firebase.auth().signOut();
        return {
            firebaseUser: undefined,
            loading: false
        };
    }
);
