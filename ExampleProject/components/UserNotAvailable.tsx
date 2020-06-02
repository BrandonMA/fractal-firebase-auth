import React, { useContext, useEffect } from 'react';
import { Text } from 'react-native';
import { DatabaseContext } from './DatabaseProvider';
import { useAuthenticationState } from 'react-firebase-auth';

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
