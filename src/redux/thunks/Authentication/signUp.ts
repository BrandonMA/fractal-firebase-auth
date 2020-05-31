import { createAsyncThunk } from '@reduxjs/toolkit';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthenticationState } from '../../types/AuthenticationState';
import { EmailPasswordPair } from '../../types/EmailPasswordPair';

export const signUp = createAsyncThunk(
    'authentication/signUp',
    async (user: EmailPasswordPair): Promise<AuthenticationState> => {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
        return {
            firebaseUser: userCredential.user,
            loading: false
        };
    }
);
