/// <reference types="react" />
export interface AuthenticationScreenProps {
    emailPlaceholder: string;
    passwordPlaceholder: string;
    signInText: string;
    signUpText: string;
    forgotPasswordText: string;
    resetPasswordText: string;
    resetPasswordDescriptionText: string;
    byAcceptingTerms: string;
    and: string;
    termsAndConditions: string;
    privacyPolicy: string;
    onTermsPressed: () => void;
    onPrivacyPressed: () => void;
    logo?: JSX.Element;
    removeAppleButton?: boolean;
    background?: JSX.Element;
    footer?: JSX.Element;
}
