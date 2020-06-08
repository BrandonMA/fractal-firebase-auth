import { AuthenticationSlice } from '../slices/createAuthenticationSlice';
export declare function useSubscribeForAuthenticatedUser(slice: AuthenticationSlice): () => firebase.Unsubscribe;
