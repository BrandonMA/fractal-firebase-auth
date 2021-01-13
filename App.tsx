import React, { useMemo } from 'react';
import { registerRootComponent } from 'expo';
import { firebaseConfig } from './firebase';
import { FirebaseInit, AuthScreen, useFirebaseUser, ComponentRoutePair, FractalFirebaseAuthRoot, CreateUserScreen } from './src';
import { IDEnabled, Database, Collection } from '@bma98/firebase-db-manager';
import { FractalNavigationRoot } from '@bma98/fractal-navigation';
import { PaddedContainer, LoadingBackground, Text, BaseBox } from '@bma98/fractal-ui';
import { Image } from 'react-native';
import { BackgroundExample } from './BackgroundExample';

interface User extends IDEnabled {
    email: string;
}

type UserCollection = Collection<User, null>;
type DatabaseType = Database<{
    users: UserCollection;
}>;

function createDatabase(): DatabaseType {
    return new Database({
        users: new Collection<User, null>('Users', null)
    });
}

function Home(): JSX.Element {
    const currentUser = useFirebaseUser<User, null>();
    return (
        <PaddedContainer>
            <Text>Logged In! {currentUser?.data?.email}</Text>
        </PaddedContainer>
    );
}

const authPair: ComponentRoutePair = {
    route: '/auth',
    component: (
        <AuthScreen
            resetPasswordText={'Reset Password'}
            resetPasswordDescriptionText={'Please check your email to finish the process.'}
            logo={
                <Image
                    source={{
                        uri:
                            'https://firebasestorage.googleapis.com/v0/b/fir-db-manager-12154.appspot.com/o/Logo.png?alt=media&token=75aca343-619e-4d99-b177-436d4c0ea943'
                    }}
                    style={{ height: 200, width: 200, borderRadius: 16, marginTop: 16 }}
                />
            }
            forgotPasswordText={'Forgot your password?'}
            signInText={'Sign In'}
            signUpText={'Sign Up'}
            emailPlaceholder={'Email'}
            passwordPlaceholder={'Password'}
            background={
                <>
                    <BaseBox flex={1} />
                    <BackgroundExample width={'100%'} style={{ marginBottom: -50 }} />
                </>
            }
        />
    )
};

const loadingPair: ComponentRoutePair = {
    route: '/loading',
    component: <LoadingBackground />
};

const appPair: ComponentRoutePair = {
    route: '/app',
    component: <Home />
};

function FirebaseReady(): JSX.Element {
    const database = useMemo(() => createDatabase(), []);

    const createUserPair: ComponentRoutePair = useMemo(() => {
        return {
            route: '/create_user',
            component: <CreateUserScreen database={database} />
        };
    }, [database]);

    return (
        <FractalFirebaseAuthRoot
            database={database}
            loadingPair={loadingPair}
            authPair={authPair}
            createUser={createUserPair}
            app={appPair}
        />
    );
}

export function App(): JSX.Element {
    return (
        <FractalNavigationRoot>
            <FirebaseInit loadingComponent={<LoadingBackground />} firebaseConfig={firebaseConfig}>
                <FirebaseReady />
            </FirebaseInit>
        </FractalNavigationRoot>
    );
}

export default registerRootComponent(App);
