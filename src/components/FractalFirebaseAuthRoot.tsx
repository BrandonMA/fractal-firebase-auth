import { AuthenticationStateProvider, FirebaseUserProvider } from '../context';
import React from 'react';
import { Authenticate, AuthenticateProps } from './Authenticate';
import { MinimalUserData } from '../types';

export function FractalFirebaseAuthRoot<UserType extends MinimalUserData, UserSubCollection>(
    props: AuthenticateProps<UserType, UserSubCollection>
): JSX.Element {
    return (
        <AuthenticationStateProvider>
            <FirebaseUserProvider>
                <Authenticate {...props} />
            </FirebaseUserProvider>
        </AuthenticationStateProvider>
    );
}
