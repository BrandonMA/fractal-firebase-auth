/// <reference types="react" />
import { MinimalExpectedDatabase, MinimalUserData } from '../types';
interface Props<UserType extends MinimalUserData, UserSubCollection> {
    database: MinimalExpectedDatabase<UserType, UserSubCollection>;
    loadingComponent: JSX.Element;
    authenticationComponent: JSX.Element;
    userNotAvailableComponent: JSX.Element;
    children: JSX.Element;
}
export declare function Authenticate<UserType extends MinimalUserData, UserSubCollection>(props: Props<UserType, UserSubCollection>): JSX.Element;
export {};
