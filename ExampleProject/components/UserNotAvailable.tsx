import React, { useContext, useEffect } from 'react';
import { Text } from 'react-native';
import { DatabaseContext, createDatabase } from './DatabaseProvider';
import { useAuthenticationState, MinimalUserData, createUser } from 'react-firebase-auth';
import { ThunkDispatch } from 'redux-thunk';
import { AppState, usersSlice } from '../redux';
import { Action } from 'redux';
import { connect } from 'react-redux';

interface ReduxFunctions {
    createUser: (database: ReturnType<typeof createDatabase>, data: MinimalUserData) => Promise<void>;
}

function UserNotAvailable(props: ReduxFunctions): JSX.Element {
    const database = useContext(DatabaseContext);
    const authenticationState = useAuthenticationState();
    const { createUser } = props;

    useEffect(() => {
        if (authenticationState.firebaseUser != null && database != null) {
            const userData = {
                email: authenticationState.firebaseUser.email ?? '',
                id: authenticationState.firebaseUser.uid
            };
            createUser(database, userData);
        }
    }, [createUser, database, authenticationState]);

    return <Text>Saving user data in the database</Text>;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<void, AppState, Action>): ReduxFunctions => ({
    async createUser(database: ReturnType<typeof createDatabase>, data: MinimalUserData): Promise<void> {
        await dispatch(createUser(database, data, usersSlice));
    }
});

export default connect(null, mapDispatchToProps)(UserNotAvailable);
