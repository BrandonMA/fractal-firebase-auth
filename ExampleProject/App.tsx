import React from 'react';
import { Firebase } from 'react-firebase-auth';
import { StyleSheet, View } from 'react-native';
import firebaseConfig from './firebase';
import Loading from './components/Loading';
import DatabaseProvider from './components/DatabaseProvider';

import { Provider } from 'react-redux';
import store from './redux';
import Root from './components/Root';

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
                        <Root />
                    </DatabaseProvider>
                </Firebase>
            </Provider>
        </View>
    );
}
