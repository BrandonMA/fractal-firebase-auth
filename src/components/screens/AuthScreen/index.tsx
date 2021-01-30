import React, { useCallback, useState } from 'react';
import { Background, BaseBox, Cell, ErrorMessage, PaddedContainer, SocialMediaButtons } from '@bma98/fractal-ui';
import { InteractionManager, LayoutAnimation, ScrollView, ViewStyle } from 'react-native';
import { AuthenticationScreenProps } from './types/AuthenticationScreenProps';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { PasswordReset } from './components/PasswordReset';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apple, facebook, google } from '../../../firebase';

type AuthenticationScreenState = 'signIn' | 'signUp' | 'passwordReset';

const scrollViewStyle: ViewStyle = { alignItems: 'center' };

export function AuthScreen({
    logo,
    background,
    removeAppleButton = true,
    androidID = '',
    ...others
}: AuthenticationScreenProps): JSX.Element {
    const [state, setState] = useState<AuthenticationScreenState>('signIn');
    const [googleLoading, setGoogleLoading] = useState(false);
    const [facebookLoading, setFacebookLoading] = useState(false);
    const [appleLoading, setAppleLoading] = useState(false);

    const toggleState = useCallback(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setState((currentState) => (currentState === 'signIn' ? 'signUp' : 'signIn'));
    }, []);

    const handlePasswordReset = useCallback(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setState('passwordReset');
    }, []);

    const handleGooglePress = useCallback(() => {
        InteractionManager.runAfterInteractions(async () => {
            setGoogleLoading(true);
            try {
                await google(androidID);
            } catch (error) {
                console.log(error.message);
                setGoogleLoading(false);
            }
        });
    }, [androidID]);

    const handleFacebookPress = useCallback(() => {
        InteractionManager.runAfterInteractions(async () => {
            setFacebookLoading(true);
            try {
                await facebook();
            } catch (error) {
                console.log(error.message);
                setFacebookLoading(false);
            }
        });
    }, []);

    const handleApplePress = useCallback(() => {
        InteractionManager.runAfterInteractions(async () => {
            setAppleLoading(true);
            try {
                await apple();
            } catch (error) {
                console.log(error.message);
                setAppleLoading(false);
            }
        });
    }, []);

    return (
        <Background>
            {background}
            <ScrollView contentContainerStyle={scrollViewStyle}>
                <SafeAreaView />
                <BaseBox flex={1} maxWidth={600} alignItems={'center'} width={'100%'}>
                    {logo}
                    <PaddedContainer width={'100%'}>
                        <Cell>
                            <ErrorMessage>
                                {state === 'signIn' ? (
                                    <SignIn {...others} onPasswordReset={handlePasswordReset} onSecondaryButtonPress={toggleState} />
                                ) : state === 'signUp' ? (
                                    <SignUp {...others} onSecondaryButtonPress={toggleState} />
                                ) : (
                                    <PasswordReset {...others} onSecondaryButtonPress={toggleState} />
                                )}
                            </ErrorMessage>
                        </Cell>
                    </PaddedContainer>
                    <SocialMediaButtons
                        width={'100%'}
                        onApplePress={handleApplePress}
                        onGooglePress={handleGooglePress}
                        onFacebookPress={handleFacebookPress}
                        googleLoading={googleLoading}
                        appleLoading={appleLoading}
                        facebookLoading={facebookLoading}
                        removeAppleButton={removeAppleButton}
                    />
                </BaseBox>
            </ScrollView>
        </Background>
    );
}
