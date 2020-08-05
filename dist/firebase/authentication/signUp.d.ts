import 'firebase/auth';
import { EmailPasswordPair } from '../types/EmailPasswordPair';
import { AuthenticationState } from '../types/AuthenticationState';
export declare function signUp(user: EmailPasswordPair): Promise<AuthenticationState>;
