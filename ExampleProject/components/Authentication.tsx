import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { AppState } from '../redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { signUp } from 'react-firebase-auth';

interface ReduxFunctions {
    signUp: (email: string, password: string) => Promise<void>;
}

function Authentication(props: ReduxFunctions): JSX.Element {
    const { signUp } = props;
    useEffect(() => {
        signUp('maldonado.brandon177@gmail.com', 'Pudin123');
    }, [signUp]);
    return <Text>Sign In here</Text>;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<void, AppState, Action>): ReduxFunctions => ({
    async signUp(email: string, password: string): Promise<void> {
        await dispatch(
            signUp({
                email,
                password
            })
        );
    }
});

export default connect(null, mapDispatchToProps)(Authentication);
