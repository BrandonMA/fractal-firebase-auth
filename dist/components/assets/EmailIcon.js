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
import React, { memo } from 'react';
import Svg, { Path } from 'react-native-svg';
export var EmailIcon = memo(function (props) {
    return (React.createElement(Svg, __assign({ viewBox: '0 0 30 30', width: 30, height: 30 }, props),
        React.createElement(Path, { d: 'M2.537 6l11.274 10.521a1.746 1.746 0 002.378 0L27.463 6H2.537zM1 7.3v15.286l7.906-7.906L1 7.3zm28 0l-7.906 7.38L29 22.586V7.3zm-18.633 8.745L2.414 24h25.172l-7.955-7.955-2.076 1.937a3.74 3.74 0 01-2.557 1.004 3.735 3.735 0 01-2.555-1.004l-2.076-1.937z' })));
});
//# sourceMappingURL=EmailIcon.js.map