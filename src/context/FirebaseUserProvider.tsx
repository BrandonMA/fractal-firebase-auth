import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { MinimalUser, MinimalUserData } from '../types';

export type FirebaseUserContextType = [
    MinimalUser<MinimalUserData, unknown> | undefined,
    Dispatch<SetStateAction<MinimalUser<MinimalUserData, unknown>>>
];

export const FirebaseUserContext = createContext<FirebaseUserContextType>([
    undefined,
    () => {
        return;
    }
]);

interface FirebaseUserProviderProps {
    children: ReactNode;
}

export function FirebaseUserProvider({ children }: FirebaseUserProviderProps): JSX.Element {
    const handleState = useState<MinimalUser<MinimalUserData, unknown> | undefined>(undefined);
    return <FirebaseUserContext.Provider value={handleState}>{children}</FirebaseUserContext.Provider>;
}
