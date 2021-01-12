import { HelperAuthenticationScreenProps } from '../types/HelperAuthenticationScreenProps';
import React, { useCallback, useState } from 'react';
import { signUp } from '../../../../firebase';
import { Button, IconTextField, Separator } from '@bma98/fractal-ui';
import { renderEmailIcon } from '../util/renderEmailIcon';
import { renderPasswordIcon } from '../util/renderPasswordIcon';

export function SignUp({
    emailPlaceholder,
    passwordPlaceholder,
    signInText,
    signUpText,
    onSecondaryButtonPress
}: HelperAuthenticationScreenProps): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toggleLoading = useCallback(() => setLoading((currentValue) => !currentValue), []);

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
            <Separator marginBottom={'m'} />
            <Button text={signInText} variant={'alternativeInteractiveColor'} onPress={onSecondaryButtonPress} />
        </>
    );
}
