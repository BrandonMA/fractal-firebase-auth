import { apple } from '../../../../firebase/authentication/apple';

export function handleApplePress(): void {
    apple().catch((error) => console.log(error.message));
}
