import { LoadingBackground } from '@bma98/fractal-ui';
import React, { useEffect } from 'react';
import { MinimalExpectedDatabase, MinimalUserData } from '../../types';
import { createUser } from '../../firebase/users/createUser';
import { useAuthenticationState } from '../../hooks/useAuthenticationState';

export interface CreateUserScreenProps {
    database: MinimalExpectedDatabase<MinimalUserData, unknown>;
}

export function CreateUserScreen({ database }: CreateUserScreenProps): JSX.Element {
    const authenticationState = useAuthenticationState();

    useEffect(() => {
        if (authenticationState.firebaseUser != null) {
            createUser(database, {
                email: authenticationState.firebaseUser.email ?? '',
                id: authenticationState.firebaseUser.uid
            }).catch((error) => alert(error.message));
        }
    }, [database, authenticationState]);

    return <LoadingBackground />;
}
