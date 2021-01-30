import { HelperAuthenticationScreenProps } from '../types/HelperAuthenticationScreenProps';
import React, { useCallback, useState } from 'react';
import { Button, Message, IconTextField, Separator, TextButton } from '@bma98/fractal-ui';
import { renderEmailIcon } from '../util/renderEmailIcon';
import { resetPassword } from '../../../../firebase/authentication/resetPassword';
import { renderResetIcon } from '../util/renderResetIcon';
import { LayoutAnimation } from 'react-native';

export function PasswordReset({
    emailPlaceholder,
    resetPasswordText,
    resetPasswordDescriptionText,
    onSecondaryButtonPress,
    signInText
}: HelperAuthenticationScreenProps): JSX.Element {
    const [email, setEmail] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const toggleLoading = useCallback(() => setLoading((currentValue) => !currentValue), []);

    const handlePasswordReset = async () => {
        if (email !== '') {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            toggleLoading();
            setShowMessage(true);
            try {
                await resetPassword(email);
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
            {showMessage && !loading ? (
                <Message
                    icon={renderResetIcon}
                    messageType={'success'}
                    title={resetPasswordText}
                    description={resetPasswordDescriptionText}
                    marginBottom={'m'}
                />
            ) : null}
            <Button
                loading={loading}
                text={resetPasswordText}
                variant={'warningInteractiveColor'}
                marginBottom={'m'}
                onPress={handlePasswordReset}
            />
            <Separator marginBottom={'m'} />
            <TextButton onPress={onSecondaryButtonPress} alignSelf={'center'} variant={'mainInteractiveColor'}>
                {signInText}
            </TextButton>
        </>
    );
}
