import { LoadingBackground } from '@bma98/fractal-ui';
import React, { useEffect } from 'react';
import { MinimalExpectedDatabase, MinimalUserData } from '../../types';
import { createUserDocument } from '../../firebase/users/createUserDocument';
import { useAuthenticationState } from '../../hooks/useAuthenticationState';

export interface CreateUserScreenProps {
    database: MinimalExpectedDatabase<MinimalUserData, unknown>;
    createUserObject: (basicUser: MinimalUserData) => any;
}

export function CreateUserScreen({ database, createUserObject }: CreateUserScreenProps): JSX.Element {
    const authenticationState = useAuthenticationState();

    useEffect(() => {
        if (authenticationState.firebaseUser != null) {
            const finalUser = createUserObject({
                email: authenticationState.firebaseUser.email ?? '',
                id: authenticationState.firebaseUser.uid
            });
            createUserDocument(database, finalUser).catch((error) => alert(error.message));
        }
    }, [database, authenticationState, createUserObject]);

    return <LoadingBackground />;
}
