var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useCallback, useState } from 'react';
import { Button, Message, IconTextField, Separator, TextButton } from '@bma98/fractal-ui';
import { renderEmailIcon } from '../util/renderEmailIcon';
import { resetPassword } from '../../../../firebase/authentication/resetPassword';
import { renderResetIcon } from '../util/renderResetIcon';
import { LayoutAnimation } from 'react-native';
export function PasswordReset(_a) {
    var _this = this;
    var emailPlaceholder = _a.emailPlaceholder, resetPasswordText = _a.resetPasswordText, resetPasswordDescriptionText = _a.resetPasswordDescriptionText, onSecondaryButtonPress = _a.onSecondaryButtonPress, signInText = _a.signInText;
    var _b = useState(''), email = _b[0], setEmail = _b[1];
    var _c = useState(false), showMessage = _c[0], setShowMessage = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var toggleLoading = useCallback(function () { return setLoading(function (currentValue) { return !currentValue; }); }, []);
    var handlePasswordReset = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(email !== '')) return [3 /*break*/, 4];
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                    toggleLoading();
                    setShowMessage(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, resetPassword(email)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    alert(error_1.message);
                    toggleLoading();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement(IconTextField, { value: email, onChangeText: setEmail, placeholder: emailPlaceholder, leftImage: renderEmailIcon, marginBottom: 'm' }),
        showMessage && !loading ? (React.createElement(Message, { icon: renderResetIcon, messageType: 'success', title: resetPasswordText, description: resetPasswordDescriptionText, marginBottom: 'm' })) : null,
        React.createElement(Button, { loading: loading, text: resetPasswordText, variant: 'warningInteractiveColor', marginBottom: 'm', onPress: handlePasswordReset }),
        React.createElement(Separator, { marginBottom: 'm' }),
        React.createElement(TextButton, { onPress: onSecondaryButtonPress, alignSelf: 'center', variant: 'mainInteractiveColor' }, signInText)));
}
//# sourceMappingURL=PasswordReset.js.map