import { authenticationSlice } from '../slices';
export declare function useSubscribeForAuthenticatedUser(slice: typeof authenticationSlice): () => firebase.Unsubscribe;
