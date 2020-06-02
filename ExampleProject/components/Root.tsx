import React from 'react';
import { Text } from 'react-native';
import { authenticationSlice } from '../redux';
import { Authenticate } from 'react-firebase-auth';
import UserNotAvailable from './UserNotAvailable';
import Loading from './Loading';
import Authentication from './Authentication';

function Root(): JSX.Element {
    return (
        <Authenticate
            authenticationSlice={authenticationSlice}
            userNotAvailableComponent={<UserNotAvailable />}
            authenticationComponent={<Authentication />}
            loadingComponent={<Loading text='authentication' />}
        >
            <Text>User ready!</Text>
        </Authenticate>
    );
}

export default Root;
