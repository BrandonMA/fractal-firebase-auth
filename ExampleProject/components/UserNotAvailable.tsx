import React, { useContext, useEffect } from 'react';
import { Text } from 'react-native';
import { DatabaseContext } from './DatabaseProvider';
import { useAuthenticationState, MinimalUserData } from 'react-firebase-auth';

interface ReduxFunctions {
    createUser: (user: MinimalUserData) => Promise<void>;
}

function UserNotAvailable(): JSX.Element {
    const database = useContext(DatabaseContext);
    const authenticationState = useAuthenticationState();

    useEffect(() => {
        if (authenticationState.firebaseUser != null) {
            const userData = {
                email: authenticationState.firebaseUser.email ?? '',
                id: authenticationState.firebaseUser.uid
            };
        }
    });

    return <Text>Saving user data in the database</Text>;
}

export default UserNotAvailable;
