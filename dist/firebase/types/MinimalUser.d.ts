import { Document, IDEnabled } from 'firebase-db-manager';
export interface MinimalUserData extends IDEnabled {
    email: string;
}
export declare function isMinimalUserData(value: unknown): value is MinimalUserData;
export declare type MinimalUser<T extends MinimalUserData, S> = Document<T, S>;
