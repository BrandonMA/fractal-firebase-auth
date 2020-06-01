import React, { createContext } from 'react';
import { Collection, Database } from 'firebase-db-manager';
import { MinimalUser } from 'react-firebase-auth';

// eslint-disable-next-line
function createDatabase() {
    const usersCollection = new Collection<MinimalUser, null>('Users', null);
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
    return <DatabaseContext.Provider value={createDatabase()}>{props.children}</DatabaseContext.Provider>;
}

export default React.memo(DatabaseProvider);
