import React, { useCallback, useMemo } from 'react';
import { registerRootComponent } from 'expo';
import { firebaseConfig } from './firebase';
import { AuthenticationScreen } from '@bma98/fractal-auth-screen';
import {
    CreateUserScreen,
    FirebaseInit,
    FirebaseAuthRoot,
    signOut,
    useAuthenticationState,
    useUserDocument,
    signIn,
    signUp,
    resetPassword
} from './src';
import { Collection, Database, IDEnabled } from '@bma98/firebase-db-manager';
import { NavigationBarConfig, NavigationRouter, StackNavigator, StackScreen, useNavigate } from '@bma98/fractal-navigation-router';
import { Button, LoadingBackground, PaddingLayer, Text } from '@bma98/fractal-ui';
import { Image, ScrollView } from 'react-native';
import { AuthenticateChildrenKey } from './src/types/AuthenticateChildrenKey';
import { AuthenticateSection } from './src/components/AuthenticateSection';
import { NavigationBarInsetsLayer } from '@bma98/fractal-navigation';

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

export function Home() {
    const { loading, firebaseUser } = useAuthenticationState();
    const currentUser = useUserDocument<User, null>();
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate('/app/profile');
    };

    return (
        <StackNavigator path='/app'>
            <StackScreen path='/app' navBarConfig={<NavigationBarConfig title={'Home'} />}>
                <NavigationBarInsetsLayer>
                    <ScrollView>
                        <PaddingLayer>
                            <Text marginBottom={12}>{`Logged In! ${currentUser?.data?.email}`}</Text>
                            <Button marginBottom={12} text='Sign Out' onPress={signOut} />
                            <Button marginBottom={12} text='Go To Profile' onPress={goToProfile} />
                            {!loading && firebaseUser != null ? <Text>{firebaseUser.uid}</Text> : <Text>Still getting the user</Text>}
                        </PaddingLayer>
                    </ScrollView>
                </NavigationBarInsetsLayer>
            </StackScreen>
            <StackScreen path='/app/profile' navBarConfig={<NavigationBarConfig title={'Profile'} />}>
                <NavigationBarInsetsLayer>
                    <ScrollView>
                        <PaddingLayer>
                            <Text marginBottom={12}>User Profile</Text>
                        </PaddingLayer>
                    </ScrollView>
                </NavigationBarInsetsLayer>
            </StackScreen>
        </StackNavigator>
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
                <AuthenticationScreen
                    byAcceptingTerms={'By creating an account you accept our '}
                    termsAndConditions={'Terms and Conditions '}
                    and={'and '}
                    privacyPolicy={'Privacy Policy'}
                    resetPasswordText={'Reset Password'}
                    resetPasswordDescriptionText={'Please check your email to finish the process.'}
                    onTermsButtonPressed={() => console.log('Show terms and conditions')}
                    onPrivacyButtonPressed={() => console.log('Show privacy policy')}
                    logo={
                        <Image
                            source={{
                                uri: 'https://picsum.photos/id/1039/200'
                            }}
                            style={{ height: 200, width: 200, borderRadius: 16, marginTop: 16 }}
                        />
                    }
                    forgotPasswordText={'Forgot your password?'}
                    signInText={'Sign In'}
                    signUpText={'Sign Up'}
                    emailPlaceholder={'Email'}
                    passwordPlaceholder={'Password'}
                    signIn={signIn}
                    signUp={signUp}
                    resetPassword={resetPassword}
                />
            </AuthenticateSection>
        </FirebaseAuthRoot>
    );
}

export function App(): JSX.Element {
    return (
        <NavigationRouter>
            <FirebaseInit loadingComponent={<LoadingBackground />} firebaseConfig={firebaseConfig}>
                <AppContent />
            </FirebaseInit>
        </NavigationRouter>
    );
}

export default registerRootComponent(App);
