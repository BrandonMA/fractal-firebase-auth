import { facebook } from '../../../../firebase/authentication/facebook';
export function handleFacebookPress() {
    facebook()["catch"](function (error) { return console.log(error.message); });
}
//# sourceMappingURL=handleFacebookPress.js.map