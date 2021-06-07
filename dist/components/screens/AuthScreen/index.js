var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useCallback, useState } from 'react';
import { Background, BaseBox, Cell, ErrorMessage, PaddedContainer, SocialMediaButtons } from '@bma98/fractal-ui';
import { InteractionManager, LayoutAnimation, ScrollView } from 'react-native';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { PasswordReset } from './components/PasswordReset';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apple, facebook, google } from '../../../firebase';
const scrollViewStyle = { alignItems: 'center' };
export function AuthScreen(_a) {
    var { logo, background, removeAppleButton = true, androidID = '' } = _a, others = __rest(_a, ["logo", "background", "removeAppleButton", "androidID"]);
    const [state, setState] = useState('signIn');
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
        InteractionManager.runAfterInteractions(() => __awaiter(this, void 0, void 0, function* () {
            setGoogleLoading(true);
            try {
                yield google(androidID);
            }
            catch (error) {
                console.log(error.message);
                setGoogleLoading(false);
            }
        }));
    }, [androidID]);
    const handleFacebookPress = useCallback(() => {
        InteractionManager.runAfterInteractions(() => __awaiter(this, void 0, void 0, function* () {
            setFacebookLoading(true);
            try {
                yield facebook();
            }
            catch (error) {
                console.log(error.message);
                setFacebookLoading(false);
            }
        }));
    }, []);
    const handleApplePress = useCallback(() => {
        InteractionManager.runAfterInteractions(() => __awaiter(this, void 0, void 0, function* () {
            setAppleLoading(true);
            try {
                yield apple();
            }
            catch (error) {
                console.log(error.message);
                setAppleLoading(false);
            }
        }));
    }, []);
    return (React.createElement(Background, null,
        background,
        React.createElement(ScrollView, { contentContainerStyle: scrollViewStyle },
            React.createElement(SafeAreaView, null),
            React.createElement(BaseBox, { flex: 1, maxWidth: 600, alignItems: 'center', width: '100%' },
                logo,
                React.createElement(PaddedContainer, { width: '100%' },
                    React.createElement(Cell, null,
                        React.createElement(ErrorMessage, null, state === 'signIn' ? (React.createElement(SignIn, Object.assign({}, others, { onPasswordReset: handlePasswordReset, onSecondaryButtonPress: toggleState }))) : state === 'signUp' ? (React.createElement(SignUp, Object.assign({}, others, { onSecondaryButtonPress: toggleState }))) : (React.createElement(PasswordReset, Object.assign({}, others, { onSecondaryButtonPress: toggleState })))))),
                React.createElement(SocialMediaButtons, { width: '100%', onApplePress: handleApplePress, onGooglePress: handleGooglePress, onFacebookPress: handleFacebookPress, googleLoading: googleLoading, appleLoading: appleLoading, facebookLoading: facebookLoading, removeAppleButton: removeAppleButton })))));
}
//# sourceMappingURL=index.js.map