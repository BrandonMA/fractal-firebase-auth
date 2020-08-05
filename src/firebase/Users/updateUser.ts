import { MinimalExpectedDatabase } from '../types/MinimalExpectedDatabase';
import { MinimalUserData } from '../types';

export async function updateUser<T extends MinimalUserData, S>(database: MinimalExpectedDatabase<T, S>, data: T): Promise<unknown> {
    const userDocument = await database.collections.users.updateDocument(data);
    return userDocument;
}
