/// <reference types="react" />
import { MinimalExpectedDatabase, MinimalUserData } from '../types';
import { ComponentRoutePair } from '../types/ComponentRoutePair';
export interface AuthenticateProps<UserType extends MinimalUserData, UserSubCollection> {
    database: MinimalExpectedDatabase<UserType, UserSubCollection>;
    loadingPair: ComponentRoutePair;
    authPair: ComponentRoutePair;
    createUser: ComponentRoutePair;
    app: ComponentRoutePair;
}
export declare function Authenticate<UserType extends MinimalUserData, UserSubCollection>({ authPair, loadingPair, app, createUser, database }: AuthenticateProps<UserType, UserSubCollection>): JSX.Element;
