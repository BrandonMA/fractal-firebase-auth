import { ReactElement } from 'react';
import { MinimalExpectedDatabase, MinimalUserData } from '../types';
import { ComponentRouteProps } from '../types/ComponentRouteProps';
export interface AuthenticateProps<UserType extends MinimalUserData, UserSubCollection> {
    database: MinimalExpectedDatabase<UserType, UserSubCollection>;
    children: Array<ReactElement<ComponentRouteProps>>;
}
export declare function Authenticate<UserType extends MinimalUserData, UserSubCollection>({ database, children }: AuthenticateProps<UserType, UserSubCollection>): ReactElement;
