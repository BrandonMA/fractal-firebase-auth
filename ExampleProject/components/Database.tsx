import React from 'react';
import { Text } from 'react-native';
import { Collection, Database } from 'firebase-db-manager';

function DatabaseProvider(): JSX.Element {
    const usersCollection = new Collection<User, null>('Users', null);
    const collections = {
        users: usersCollection
    };
    const database = new Database(collections);
    return <Text>Loading</Text>;
}

export default React.memo(DatabaseProvider);
