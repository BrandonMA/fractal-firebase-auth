import { apple } from '../../../../firebase/authentication/apple';
export function handleApplePress() {
    apple()["catch"](function (error) { return console.log(error.message); });
}
//# sourceMappingURL=handleApplePress.js.map