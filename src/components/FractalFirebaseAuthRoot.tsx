import { AuthenticationStateProvider, UserDocumentProvider } from '../context';
import React from 'react';
import { Authenticate, AuthenticateProps } from './Authenticate';
import { MinimalUserData } from '../types';

export function FractalFirebaseAuthRoot<UserType extends MinimalUserData, UserSubCollection>(
    props: AuthenticateProps<UserType, UserSubCollection>
): JSX.Element {
    return (
        <AuthenticationStateProvider>
            <UserDocumentProvider>
                <Authenticate {...props} />
            </UserDocumentProvider>
        </AuthenticationStateProvider>
    );
}
