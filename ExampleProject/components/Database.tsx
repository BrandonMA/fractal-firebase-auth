import React from 'react';
import { Text } from 'react-native';

function Database(): JSX.Element {
    // const userSubCollections = {
    //     pets: new SubCollection<Pet, null>('Pets', null)
    // };
    // const usersCollection = new Collection<User, typeof userSubCollections>('Users', userSubCollections);
    // const collections = {
    //     users: usersCollection
    // };
    // const database = new Database(collections);
    return <Text>Loading</Text>;
}

export default React.memo(Database);
