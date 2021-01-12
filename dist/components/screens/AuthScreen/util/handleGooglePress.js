import { google } from '../../../../firebase/authentication/google';
export function handleGooglePress() {
    google()["catch"](function (error) { return console.log(error.message); });
}
//# sourceMappingURL=handleGooglePress.js.map