var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
import { LayoutAnimation, ScrollView } from 'react-native';
import { handleGooglePress } from './util/handleGooglePress';
import { handleFacebookPress } from './util/handleFacebookPress';
import { handleApplePress } from './util/handleApplePress';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { PasswordReset } from './components/PasswordReset';
var scrollViewStyle = { alignItems: 'center' };
export function AuthScreen(_a) {
    var logo = _a.logo, background = _a.background, _b = _a.removeAppleButton, removeAppleButton = _b === void 0 ? true : _b, others = __rest(_a, ["logo", "background", "removeAppleButton"]);
    var _c = useState('signIn'), state = _c[0], setState = _c[1];
    var toggleState = useCallback(function () {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setState(function (currentState) { return (currentState === 'signIn' ? 'signUp' : 'signIn'); });
    }, []);
    var handlePasswordReset = useCallback(function () {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setState('passwordReset');
    }, []);
    return (React.createElement(Background, null,
        background,
        React.createElement(ScrollView, { contentContainerStyle: scrollViewStyle },
            React.createElement(BaseBox, { flex: 1, maxWidth: 600, alignItems: 'center', width: '100%' },
                logo,
                React.createElement(PaddedContainer, { width: '100%' },
                    React.createElement(Cell, null,
                        React.createElement(ErrorMessage, null, state === 'signIn' ? (React.createElement(SignIn, __assign({}, others, { onPasswordReset: handlePasswordReset, onSecondaryButtonPress: toggleState }))) : state === 'signUp' ? (React.createElement(SignUp, __assign({}, others, { onSecondaryButtonPress: toggleState }))) : (React.createElement(PasswordReset, __assign({}, others, { onSecondaryButtonPress: toggleState })))))),
                React.createElement(SocialMediaButtons, { width: '100%', onApplePress: handleApplePress, onGooglePress: handleGooglePress, onFacebookPress: handleFacebookPress, removeAppleButton: removeAppleButton })))));
}
//# sourceMappingURL=index.js.map