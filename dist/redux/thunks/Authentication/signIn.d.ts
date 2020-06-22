import 'firebase/auth';
import { AuthenticationState } from '../../types/AuthenticationState';
import { EmailPasswordPair } from '../../types/EmailPasswordPair';
export declare const signIn: import("@reduxjs/toolkit").AsyncThunk<AuthenticationState, EmailPasswordPair, {}>;
