import React, { createContext, useMemo } from 'react';
import { Collection, Database } from 'firebase-db-manager';
import { MinimalUserData } from 'react-firebase-auth';

// eslint-disable-next-line
export function createDatabase() {
    const usersCollection = new Collection<MinimalUserData, null>('Users', null);
    const collections = {
        users: usersCollection
    };
    return new Database(collections);
}

export const DatabaseContext = createContext<ReturnType<typeof createDatabase> | undefined>(undefined);

interface Props {
    children: JSX.Element;
}

function DatabaseProvider(props: Props): JSX.Element {
    const database = useMemo(() => createDatabase(), []);
    return <DatabaseContext.Provider value={database}>{props.children}</DatabaseContext.Provider>;
}

export default React.memo(DatabaseProvider);
