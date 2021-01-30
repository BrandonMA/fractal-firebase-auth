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
var scrollViewStyle = { alignItems: 'center' };
export function AuthScreen(_a) {
    var _this = this;
    var logo = _a.logo, background = _a.background, _b = _a.removeAppleButton, removeAppleButton = _b === void 0 ? true : _b, _c = _a.androidID, androidID = _c === void 0 ? '' : _c, others = __rest(_a, ["logo", "background", "removeAppleButton", "androidID"]);
    var _d = useState('signIn'), state = _d[0], setState = _d[1];
    var _e = useState(false), googleLoading = _e[0], setGoogleLoading = _e[1];
    var _f = useState(false), facebookLoading = _f[0], setFacebookLoading = _f[1];
    var _g = useState(false), appleLoading = _g[0], setAppleLoading = _g[1];
    var toggleState = useCallback(function () {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setState(function (currentState) { return (currentState === 'signIn' ? 'signUp' : 'signIn'); });
    }, []);
    var handlePasswordReset = useCallback(function () {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setState('passwordReset');
    }, []);
    var handleGooglePress = useCallback(function () {
        InteractionManager.runAfterInteractions(function () { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setGoogleLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, google(androidID)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1.message);
                        setGoogleLoading(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    }, [androidID]);
    var handleFacebookPress = useCallback(function () {
        InteractionManager.runAfterInteractions(function () { return __awaiter(_this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setFacebookLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, facebook()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2.message);
                        setFacebookLoading(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    }, []);
    var handleApplePress = useCallback(function () {
        InteractionManager.runAfterInteractions(function () { return __awaiter(_this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setAppleLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, apple()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3.message);
                        setAppleLoading(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    }, []);
    return (React.createElement(Background, null,
        background,
        React.createElement(ScrollView, { contentContainerStyle: scrollViewStyle },
            React.createElement(SafeAreaView, null),
            React.createElement(BaseBox, { flex: 1, maxWidth: 600, alignItems: 'center', width: '100%' },
                logo,
                React.createElement(PaddedContainer, { width: '100%' },
                    React.createElement(Cell, null,
                        React.createElement(ErrorMessage, null, state === 'signIn' ? (React.createElement(SignIn, __assign({}, others, { onPasswordReset: handlePasswordReset, onSecondaryButtonPress: toggleState }))) : state === 'signUp' ? (React.createElement(SignUp, __assign({}, others, { onSecondaryButtonPress: toggleState }))) : (React.createElement(PasswordReset, __assign({}, others, { onSecondaryButtonPress: toggleState })))))),
                React.createElement(SocialMediaButtons, { width: '100%', onApplePress: handleApplePress, onGooglePress: handleGooglePress, onFacebookPress: handleFacebookPress, googleLoading: googleLoading, appleLoading: appleLoading, facebookLoading: facebookLoading, removeAppleButton: removeAppleButton })))));
}
//# sourceMappingURL=index.js.map