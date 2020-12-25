import React, { useState } from 'react';
import { registerRootComponent } from 'expo';
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native';
import { firebaseConfig } from './firebase';
import { FirebaseInit, Authenticate, signUp, useAuthenticatedUser, createUser } from './src';
import { IDEnabled, Database, Collection, Document } from '@bma98/firebase-db-manager';
import { useAuthenticationState } from './src/hooks/useAuthenticationState';
import { RecoilRoot } from 'recoil';

function createDatabase() {
    return new Database({
        users: new Collection<User, null>('Users', null)
    });
}

interface User extends IDEnabled {
    name: string;
    email: string;
}

function LoadingComponent(): JSX.Element {
    return <ActivityIndicator size='large' />;
}

function LogIn(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        signUp(email, password);
    };

    return (
        <View>
            <TextInput placeholder='Email' onChangeText={setEmail} />
            <TextInput placeholder='Password' onChangeText={setPassword} />
            <Button title='Log In' onPress={handleLogin} />
        </View>
    );
}

interface FinishProfileProps {
    database: ReturnType<typeof createDatabase>;
}

function FinishProfile(props: FinishProfileProps): JSX.Element {
    const { database } = props;
    const authenticationState = useAuthenticationState();
    const [name, setName] = useState('');

    const handleCreateUser = () => {
        createUser(database, {
            name,
            email: authenticationState.firebaseUser.email,
            id: authenticationState.firebaseUser.uid
        });
    };

    return (
        <View>
            <TextInput placeholder='Name' onChangeText={setName} />
            <Button title='Create user' onPress={handleCreateUser} />
        </View>
    );
}

function Home(): JSX.Element {
    const currentUser = useAuthenticatedUser() as Document<User, null>;
    return <Text>Logged In! {currentUser.data.name}</Text>;
}

function FirebaseReady(): JSX.Element {
    const database = createDatabase();
    return (
        <Authenticate
            database={database}
            authenticationComponent={<LogIn />}
            loadingComponent={<LoadingComponent />}
            userNotAvailableComponent={<FinishProfile database={database} />}
        >
            <Home />
        </Authenticate>
    );
}

export function App(): JSX.Element {
    return (
        <RecoilRoot>
            <View>
                <FirebaseInit loadingComponent={<LoadingComponent />} firebaseConfig={firebaseConfig}>
                    <FirebaseReady />
                </FirebaseInit>
            </View>
        </RecoilRoot>
    );
}

export default registerRootComponent(App);
