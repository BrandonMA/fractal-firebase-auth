/// <reference types="react" />
import { MinimalExpectedDatabase, MinimalUserData } from './firebase/types';
interface Props {
    database: MinimalExpectedDatabase<MinimalUserData, null>;
    loadingComponent: JSX.Element;
    authenticationComponent: JSX.Element;
    userNotAvailableComponent: JSX.Element;
    children: JSX.Element;
}
export declare function Authenticate(props: Props): JSX.Element;
export {};
