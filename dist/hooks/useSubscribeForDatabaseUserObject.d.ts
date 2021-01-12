import { MinimalUserData, MinimalExpectedDatabase } from '../types';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
export declare function useSubscribeForDatabaseUserObject<T extends MinimalUserData, S>(firebaseUser: FirebaseAuthTypes.User | null | undefined, database: MinimalExpectedDatabase<T, S>): boolean;
