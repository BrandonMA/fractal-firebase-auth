import { AuthenticationScreenProps } from './AuthenticationScreenProps';

export interface HelperAuthenticationScreenProps extends Omit<AuthenticationScreenProps, 'logo' | 'androidID'> {
    onSecondaryButtonPress?: () => void;
    onPasswordReset?: () => void;
}
