import { HelperAuthenticationScreenProps } from '../types/HelperAuthenticationScreenProps';
import React, { useCallback, useState } from 'react';
import { signUp } from '../../../../firebase';
import { BaseBox, Button, FractalTheme, IconTextField, Separator } from '@bma98/fractal-ui';
import { renderEmailIcon } from '../util/renderEmailIcon';
import { renderPasswordIcon } from '../util/renderPasswordIcon';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';

export function SignUp({
    emailPlaceholder,
    passwordPlaceholder,
    signInText,
    signUpText,
    onSecondaryButtonPress,
    byAcceptingTerms,
    termsAndConditions,
    and,
    privacyPolicy,
    onTermsPressed,
    onPrivacyPressed
}: HelperAuthenticationScreenProps): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toggleLoading = useCallback(() => setLoading((currentValue) => !currentValue), []);
    const { colors } = useTheme<FractalTheme>();

    const handleEmailSignUp = async () => {
        if (email !== '' && password !== '') {
            toggleLoading();
            try {
                await signUp(email, password);
            } catch (error) {
                alert(error.message);
                toggleLoading();
            }
        }
    };

    return (
        <>
            <IconTextField
                value={email}
                onChangeText={setEmail}
                placeholder={emailPlaceholder}
                leftImage={renderEmailIcon}
                marginBottom={'m'}
            />
            <IconTextField
                value={password}
                onChangeText={setPassword}
                placeholder={passwordPlaceholder}
                leftImage={renderPasswordIcon}
                marginBottom={'m'}
                textFieldProps={{
                    secureTextEntry: true
                }}
            />
            <Button loading={loading} text={signUpText} variant={'mainInteractiveColor'} marginBottom={'m'} onPress={handleEmailSignUp} />
            <BaseBox marginBottom={'m'}>
                <Text selectable={false} style={{ color: colors.labelColor, textAlign: 'center' }}>
                    {byAcceptingTerms}
                    <TouchableOpacity onPress={onTermsPressed}>
                        <Text style={{ color: colors.mainInteractiveColor }}>{termsAndConditions}</Text>
                    </TouchableOpacity>
                    {and}
                    <TouchableOpacity onPress={onPrivacyPressed}>
                        <Text style={{ color: colors.mainInteractiveColor }}>{privacyPolicy}</Text>
                    </TouchableOpacity>
                </Text>
            </BaseBox>
            <Separator marginBottom={'m'} />
            <Button text={signInText} variant={'alternativeInteractiveColor'} onPress={onSecondaryButtonPress} />
        </>
    );
}
