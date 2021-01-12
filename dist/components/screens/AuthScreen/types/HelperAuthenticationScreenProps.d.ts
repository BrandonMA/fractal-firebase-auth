import { AuthenticationScreenProps } from './AuthenticationScreenProps';
export interface HelperAuthenticationScreenProps extends Omit<AuthenticationScreenProps, 'logo'> {
    onSecondaryButtonPress?: () => void;
    onPasswordReset?: () => void;
}
