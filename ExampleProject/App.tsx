import React from 'react';
import { Firebase, Authenticate } from 'react-firebase-auth';
import { StyleSheet, Text, View } from 'react-native';
import firebaseConfig from './firebase';
import Loading from './components/Loading';
import DatabaseProvider from './components/DatabaseProvider';
import Authentication from './components/Authentication';
import UserNotAvailable from './components/UserNotAvailable';
import { Provider } from 'react-redux';
import store from './redux';
import Authenticator from './components/Authenticator';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default function App(): JSX.Element {
    return (
        <View style={styles.container}>
            <Provider store={store}>
                <Firebase firebaseConfig={firebaseConfig} loadingComponent={<Loading text='firebase' />}>
                    <DatabaseProvider>
                        <Authenticator>
                            <Authenticate
                                userNotAvailableComponent={<UserNotAvailable />}
                                authenticationComponent={<Authentication />}
                                loadingComponent={<Loading text='authentication' />}
                            >
                                <Text>Firebase is ready!</Text>
                            </Authenticate>
                        </Authenticator>
                    </DatabaseProvider>
                </Firebase>
            </Provider>
        </View>
    );
}
