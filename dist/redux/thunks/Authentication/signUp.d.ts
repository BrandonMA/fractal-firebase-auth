import 'firebase/auth';
import { AuthenticationState } from '../../types/AuthenticationState';
import { EmailPasswordPair } from '../../types/EmailPasswordPair';
export declare const signUp: import("@reduxjs/toolkit").AsyncThunk<AuthenticationState, EmailPasswordPair, {}>;
