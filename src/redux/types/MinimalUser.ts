import { Document, IDEnabled } from 'firebase-db-manager';

export interface MinimalUserData extends IDEnabled {
    email: string;
}

export type MinimalUser<T extends MinimalUserData, S> = Document<T, S>;
