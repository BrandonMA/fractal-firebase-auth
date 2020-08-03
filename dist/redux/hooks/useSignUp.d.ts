import { authenticationSlice } from '../slices/createAuthenticationSlice';
export declare function useSignUp(slice: typeof authenticationSlice, email: string, password: string): () => Promise<void>;
