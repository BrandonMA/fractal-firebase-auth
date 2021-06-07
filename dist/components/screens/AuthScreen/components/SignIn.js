var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useCallback, useState } from 'react';
import { signIn } from '../../../../firebase';
import { Button, IconTextField, Separator, TextButton } from '@bma98/fractal-ui';
import { renderEmailIcon } from '../util/renderEmailIcon';
import { renderPasswordIcon } from '../util/renderPasswordIcon';
export function SignIn({ emailPlaceholder, passwordPlaceholder, onPasswordReset, signInText, signUpText, forgotPasswordText, onSecondaryButtonPress }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toggleLoading = useCallback(() => setLoading((currentValue) => !currentValue), []);
    const handleEmailSignIn = () => __awaiter(this, void 0, void 0, function* () {
        if (email !== '' && password !== '') {
            toggleLoading();
            try {
                yield signIn(email, password);
            }
            catch (error) {
                alert(error.message);
                toggleLoading();
            }
        }
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(IconTextField, { value: email, onChangeText: setEmail, placeholder: emailPlaceholder, leftImage: renderEmailIcon, marginBottom: 'm' }),
        React.createElement(IconTextField, { value: password, onChangeText: setPassword, placeholder: passwordPlaceholder, leftImage: renderPasswordIcon, marginBottom: 'm', textFieldProps: {
                secureTextEntry: true
            } }),
        React.createElement(Button, { loading: loading, text: signInText, variant: 'mainInteractiveColor', marginBottom: 'm', onPress: handleEmailSignIn }),
        React.createElement(TextButton, { onPress: onPasswordReset, alignSelf: 'center', variant: 'mainInteractiveColor', marginBottom: 'm' }, forgotPasswordText),
        React.createElement(Separator, { marginBottom: 'm' }),
        React.createElement(Button, { text: signUpText, variant: 'alternativeInteractiveColor', onPress: onSecondaryButtonPress })));
}
//# sourceMappingURL=SignIn.js.map