import { google } from '../../../../firebase/authentication/google';

export function handleGooglePress(androidID: string): void {
    google(androidID).catch((error) => console.log(error.message));
}
