import { authenticationSlice } from '../slices/createAuthenticationSlice';
export declare function useSignIn(slice: typeof authenticationSlice, email: string, password: string): () => Promise<void>;
