import React, { useContext } from 'react';
import { Text } from 'react-native';
import { authenticationSlice, usersSlice } from '../redux';
import { Authenticate } from 'react-firebase-auth';
import UserNotAvailable from './UserNotAvailable';
import Loading from './Loading';
import Authentication from './Authentication';
import { DatabaseContext } from './DatabaseProvider';

function Root(): JSX.Element {
    const database = useContext(DatabaseContext);
    return database != null ? (
        <Authenticate
            database={database}
            authenticationSlice={authenticationSlice}
            usersSlice={usersSlice}
            userNotAvailableComponent={<UserNotAvailable />}
            authenticationComponent={<Authentication />}
            loadingComponent={<Loading text='authentication' />}
        >
            <Text>User ready!</Text>
        </Authenticate>
    ) : (
        <Loading text='database' />
    );
}

export default Root;
