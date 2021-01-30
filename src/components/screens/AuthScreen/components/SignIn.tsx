import { HelperAuthenticationScreenProps } from '../types/HelperAuthenticationScreenProps';
import React, { useCallback, useState } from 'react';
import { signIn } from '../../../../firebase';
import { Button, IconTextField, Separator, TextButton } from '@bma98/fractal-ui';
import { renderEmailIcon } from '../util/renderEmailIcon';
import { renderPasswordIcon } from '../util/renderPasswordIcon';

export function SignIn({
    emailPlaceholder,
    passwordPlaceholder,
    onPasswordReset,
    signInText,
    signUpText,
    forgotPasswordText,
    onSecondaryButtonPress
}: HelperAuthenticationScreenProps): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toggleLoading = useCallback(() => setLoading((currentValue) => !currentValue), []);

    const handleEmailSignIn = async () => {
        if (email !== '' && password !== '') {
            toggleLoading();
            try {
                await signIn(email, password);
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
            <Button loading={loading} text={signInText} variant={'mainInteractiveColor'} marginBottom={'m'} onPress={handleEmailSignIn} />
            <TextButton onPress={onPasswordReset} alignSelf={'center'} variant={'mainInteractiveColor'} marginBottom={'m'}>
                {forgotPasswordText}
            </TextButton>
            <Separator marginBottom={'m'} />
            <Button text={signUpText} variant={'alternativeInteractiveColor'} onPress={onSecondaryButtonPress} />
        </>
    );
}
