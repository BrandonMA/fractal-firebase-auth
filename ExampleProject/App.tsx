import React from 'react';
import { Firebase } from 'react-firebase-auth';
import { StyleSheet, Text, View } from 'react-native';
import firebaseConfig from './firebase';
import Loading from './components/Loading';

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
            <Firebase firebaseConfig={firebaseConfig} loadingComponent={<Loading />}>
                <Text>Firebase is ready!</Text>
            </Firebase>
        </View>
    );
}
