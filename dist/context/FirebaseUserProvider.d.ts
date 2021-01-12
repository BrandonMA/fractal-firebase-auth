import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { MinimalUser, MinimalUserData } from '../types';
export declare type FirebaseUserContextType = [
    MinimalUser<MinimalUserData, unknown> | undefined,
    Dispatch<SetStateAction<MinimalUser<MinimalUserData, unknown>>>
];
export declare const FirebaseUserContext: React.Context<FirebaseUserContextType>;
interface FirebaseUserProviderProps {
    children: ReactNode;
}
export declare function FirebaseUserProvider({ children }: FirebaseUserProviderProps): JSX.Element;
export {};
