import React, { useCallback, useState } from 'react';
import { Background, BaseBox, Cell, ErrorMessage, PaddedContainer, SocialMediaButtons } from '@bma98/fractal-ui';
import { LayoutAnimation, ScrollView, ViewStyle } from 'react-native';
import { AuthenticationScreenProps } from './types/AuthenticationScreenProps';
import { handleGooglePress } from './util/handleGooglePress';
import { handleFacebookPress } from './util/handleFacebookPress';
import { handleApplePress } from './util/handleApplePress';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { PasswordReset } from './components/PasswordReset';

type AuthenticationScreenState = 'signIn' | 'signUp' | 'passwordReset';

const scrollViewStyle: ViewStyle = { alignItems: 'center' };

export function AuthScreen({ logo, background, removeAppleButton = true, ...others }: AuthenticationScreenProps): JSX.Element {
    const [state, setState] = useState<AuthenticationScreenState>('signIn');

    const toggleState = useCallback(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setState((currentState) => (currentState === 'signIn' ? 'signUp' : 'signIn'));
    }, []);

    const handlePasswordReset = useCallback(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setState('passwordReset');
    }, []);

    return (
        <Background>
            {background}
            <ScrollView contentContainerStyle={scrollViewStyle}>
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
                        removeAppleButton={removeAppleButton}
                    />
                </BaseBox>
            </ScrollView>
        </Background>
    );
}
