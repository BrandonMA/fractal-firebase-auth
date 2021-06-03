import React, { useCallback, useMemo } from 'react';
import { registerRootComponent } from 'expo';
import { firebaseConfig } from './firebase';
import { AuthScreen, CreateUserScreen, FirebaseInit, FirebaseAuthRoot, signOut, useAuthenticationState, useUserDocument } from './src';
import { Collection, Database, IDEnabled } from '@bma98/firebase-db-manager';
import { FractalNavigationRoot } from '@bma98/fractal-navigation';
import { Button, LoadingBackground, PaddedContainer, Text } from '@bma98/fractal-ui';
import { Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthenticateChildrenKey } from './src/types/AuthenticateChildrenKey';
import { AuthenticateSection } from './src/components/AuthenticateSection';

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
    const { loading, firebaseUser } = useAuthenticationState();
    const currentUser = useUserDocument<User, null>();

    return (
        <ScrollView>
            <SafeAreaView />
            <PaddedContainer>
                <Text marginBottom='m'>Logged In! {currentUser?.data?.email}</Text>
                <Button marginBottom='m' text='Sign Out' onPress={signOut} />
                {!loading && firebaseUser != null ? <Text>{firebaseUser.uid}</Text> : <Text>Still getting the user</Text>}
            </PaddedContainer>
        </ScrollView>
    );
}

function AppContent(): JSX.Element {
    const database = useMemo(() => createDatabase(), []);

    const createUser = useCallback(
        async (id: string, email: string) => {
            const newUser = {
                id,
                email
            };

            await database.collections.users.createDocument(newUser);
        },
        [database]
    );

    return (
        <FirebaseAuthRoot database={database}>
            <AuthenticateSection route={'/create_user'} key={AuthenticateChildrenKey.CreateUser}>
                <CreateUserScreen createUser={createUser} />
            </AuthenticateSection>
            <AuthenticateSection route={'/app'} key={AuthenticateChildrenKey.AppContent}>
                <Home />
            </AuthenticateSection>
            <AuthenticateSection route={'/loading'} key={AuthenticateChildrenKey.Loading}>
                <LoadingBackground />
            </AuthenticateSection>
            <AuthenticateSection route={'/auth'} key={AuthenticateChildrenKey.Authentication}>
                <AuthScreen
                    byAcceptingTerms={'By creating an account you accept our '}
                    termsAndConditions={'Terms and Conditions '}
                    and={'and '}
                    privacyPolicy={'Privacy Policy'}
                    resetPasswordText={'Reset Password'}
                    resetPasswordDescriptionText={'Please check your email to finish the process.'}
                    onTermsPressed={() => console.log('Show terms and conditions')}
                    onPrivacyPressed={() => console.log('Show privacy policy')}
                    logo={
                        <Image
                            source={{
                                uri: 'https://firebasestorage.googleapis.com/v0/b/fir-db-manager-12154.appspot.com/o/Logo.png?alt=media&token=75aca343-619e-4d99-b177-436d4c0ea943'
                            }}
                            style={{ height: 200, width: 200, borderRadius: 16, marginTop: 16 }}
                        />
                    }
                    forgotPasswordText={'Forgot your password?'}
                    signInText={'Sign In'}
                    signUpText={'Sign Up'}
                    emailPlaceholder={'Email'}
                    passwordPlaceholder={'Password'}
                    androidID={'870719140957-hfimiu57e6l1ubtbe82ec6l4er1m8nrb.apps.googleusercontent.com'}
                />
            </AuthenticateSection>
        </FirebaseAuthRoot>
    );
}

export function App(): JSX.Element {
    return (
        <FractalNavigationRoot>
            <FirebaseInit loadingComponent={<LoadingBackground />} firebaseConfig={firebaseConfig}>
                <AppContent />
            </FirebaseInit>
        </FractalNavigationRoot>
    );
}

export default registerRootComponent(App);
