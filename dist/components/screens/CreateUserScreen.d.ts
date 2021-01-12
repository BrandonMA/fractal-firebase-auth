/// <reference types="react" />
import { MinimalExpectedDatabase, MinimalUserData } from '../../types';
export interface CreateUserScreenProps {
    database: MinimalExpectedDatabase<MinimalUserData, unknown>;
}
export declare function CreateUserScreen({ database }: CreateUserScreenProps): JSX.Element;
