import { google } from '../../../../firebase/authentication/google';

export function handleGooglePress(): void {
    google().catch((error) => console.log(error.message));
}
