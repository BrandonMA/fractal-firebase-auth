import React, { useState, useCallback } from 'react';
import { TextInput, View, Button } from 'react-native';
import { AppState } from '../redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { signUp, signIn } from 'react-firebase-auth';

interface ReduxFunctions {
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
}

type AuthenticationState = 'signIn' | 'signUp';

function Authentication(props: ReduxFunctions): JSX.Element {
    const { signUp, signIn } = props;
    const [currentState, setCurrentState] = useState<AuthenticationState>('signIn');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAuthButton = useCallback(() => {
        if (currentState === 'signIn') {
            signIn(email, password);
        } else {
            signUp(email, password);
        }
    }, [currentState, signUp, signIn, email, password]);

    const toggleAuthState = useCallback(() => {
        setCurrentState((currentState) => (currentState === 'signIn' ? 'signUp' : 'signIn'));
    }, []);

    return (
        <View>
            <TextInput placeholder='Email' onChangeText={setEmail} />
            <TextInput placeholder='Password' onChangeText={setPassword} />
            <Button title={currentState} onPress={handleAuthButton} />
            <Button title={currentState === 'signIn' ? 'signUp' : 'signIn'} onPress={toggleAuthState} />
        </View>
    );
}

const mapDispatchToProps = (dispatch: ThunkDispatch<void, AppState, Action>): ReduxFunctions => ({
    async signUp(email: string, password: string): Promise<void> {
        await dispatch(
            signUp({
                email,
                password
            })
        );
    },
    async signIn(email: string, password: string): Promise<void> {
        await dispatch(
            signIn({
                email,
                password
            })
        );
    }
});

export default connect(null, mapDispatchToProps)(Authentication);
