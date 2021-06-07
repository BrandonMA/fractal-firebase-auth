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
import { signUp } from '../../../../firebase';
import { BaseBox, Button, IconTextField, Separator } from '@bma98/fractal-ui';
import { renderEmailIcon } from '../util/renderEmailIcon';
import { renderPasswordIcon } from '../util/renderPasswordIcon';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
export function SignUp({ emailPlaceholder, passwordPlaceholder, signInText, signUpText, onSecondaryButtonPress, byAcceptingTerms, termsAndConditions, and, privacyPolicy, onTermsPressed, onPrivacyPressed }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toggleLoading = useCallback(() => setLoading((currentValue) => !currentValue), []);
    const { colors } = useTheme();
    const handleEmailSignUp = () => __awaiter(this, void 0, void 0, function* () {
        if (email !== '' && password !== '') {
            toggleLoading();
            try {
                yield signUp(email, password);
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
        React.createElement(Button, { loading: loading, text: signUpText, variant: 'mainInteractiveColor', marginBottom: 'm', onPress: handleEmailSignUp }),
        React.createElement(BaseBox, { marginBottom: 'm' },
            React.createElement(Text, { selectable: false, style: { color: colors.labelColor, textAlign: 'center' } },
                byAcceptingTerms,
                React.createElement(TouchableOpacity, { onPress: onTermsPressed },
                    React.createElement(Text, { style: { color: colors.mainInteractiveColor } }, termsAndConditions)),
                and,
                React.createElement(TouchableOpacity, { onPress: onPrivacyPressed },
                    React.createElement(Text, { style: { color: colors.mainInteractiveColor } }, privacyPolicy)))),
        React.createElement(Separator, { marginBottom: 'm' }),
        React.createElement(Button, { text: signInText, variant: 'alternativeInteractiveColor', onPress: onSecondaryButtonPress })));
}
//# sourceMappingURL=SignUp.js.map