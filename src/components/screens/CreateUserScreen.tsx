import { LoadingBackground } from '@bma98/fractal-ui';
import React, { useEffect } from 'react';
import { useAuthenticationState } from '../../hooks/useAuthenticationState';

export interface CreateUserScreenProps {
    createUser: (id: string, email: string) => void;
}

export function CreateUserScreen({ createUser }: CreateUserScreenProps): JSX.Element {
    const { firebaseUser } = useAuthenticationState();

    useEffect(() => {
        if (firebaseUser != null) {
            createUser(firebaseUser.uid, firebaseUser.email ?? '');
        }
    }, [createUser, firebaseUser]);

    return <LoadingBackground />;
}
