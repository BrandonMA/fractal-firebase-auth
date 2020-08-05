import 'firebase/auth';
import { AuthenticationState } from '../types/AuthenticationState';
export declare function signIn(email: string, password: string): Promise<AuthenticationState>;
