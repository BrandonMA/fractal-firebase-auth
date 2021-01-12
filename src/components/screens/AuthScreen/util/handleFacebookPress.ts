import { facebook } from '../../../../firebase/authentication/facebook';

export function handleFacebookPress(): void {
    facebook().catch((error) => console.log(error.message));
}
