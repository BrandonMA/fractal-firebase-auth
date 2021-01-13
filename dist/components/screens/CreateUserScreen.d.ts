/// <reference types="react" />
import { MinimalExpectedDatabase, MinimalUserData } from '../../types';
export interface CreateUserScreenProps {
    database: MinimalExpectedDatabase<MinimalUserData, unknown>;
    createUserObject: (basicUser: MinimalUserData) => any;
}
export declare function CreateUserScreen({ database, createUserObject }: CreateUserScreenProps): JSX.Element;
