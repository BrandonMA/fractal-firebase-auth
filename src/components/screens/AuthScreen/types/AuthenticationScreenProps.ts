export interface AuthenticationScreenProps {
    emailPlaceholder: string;
    passwordPlaceholder: string;
    signInText: string;
    signUpText: string;
    forgotPasswordText: string;
    resetPasswordText: string;
    resetPasswordDescriptionText: string;
    logo?: JSX.Element;
    removeAppleButton?: boolean;
    background?: JSX.Element;
}
