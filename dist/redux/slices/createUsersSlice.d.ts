import { PayloadAction, ActionCreatorWithPreparedPayload } from '@reduxjs/toolkit';
import { UsersState } from '../types/UsersState';
import { MinimalUserData, MinimalUser } from '../types/MinimalUser';
declare type UsersMinimalState = UsersState<MinimalUserData, unknown>;
declare type ReducerFunction = (state: UsersMinimalState, action: PayloadAction<UsersMinimalState>) => void;
interface ExtraReducers<ThunkArg = void> {
    [key: string]: {
        callback: ReducerFunction;
        fullfilled: ActionCreatorWithPreparedPayload<[UsersMinimalState, string, ThunkArg], UsersMinimalState, string, never>;
    };
}
export declare function createUsersSlice<T extends MinimalUserData, S, ThunkArg = void>(reducers?: ExtraReducers<ThunkArg>, extraReducers?: ExtraReducers<ThunkArg>): import("@reduxjs/toolkit").Slice<Readonly<UsersMinimalState>, {
    setUser: (state: {
        values: Map<string, {
            collections: unknown;
            data: {
                email: string;
                id: string;
            };
            reference: {
                id: string;
                firestore: {
                    settings: (settings: import("firebase").firestore.Settings) => void;
                    enablePersistence: (settings?: import("firebase").firestore.PersistenceSettings | undefined) => Promise<void>;
                    collection: (collectionPath: string) => import("firebase").firestore.CollectionReference<import("firebase").firestore.DocumentData>;
                    doc: (documentPath: string) => import("firebase").firestore.DocumentReference<import("firebase").firestore.DocumentData>;
                    collectionGroup: (collectionId: string) => import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    runTransaction: <T_1>(updateFunction: (transaction: import("firebase").firestore.Transaction) => Promise<T_1>) => Promise<T_1>;
                    batch: () => import("firebase").firestore.WriteBatch;
                    app: {
                        auth: () => import("firebase").auth.Auth;
                        database: (url?: string | undefined) => import("firebase").database.Database;
                        delete: () => Promise<any>;
                        installations: () => import("firebase").installations.Installations;
                        messaging: () => import("firebase").messaging.Messaging;
                        name: string;
                        options: {
                            constructor: Function;
                            toString: () => string;
                            toLocaleString: () => string;
                            valueOf: () => Object;
                            hasOwnProperty: (v: string | number | symbol) => boolean;
                            isPrototypeOf: (v: Object) => boolean;
                            propertyIsEnumerable: (v: string | number | symbol) => boolean;
                        };
                        storage: (url?: string | undefined) => import("firebase").storage.Storage;
                        firestore: () => import("firebase").firestore.Firestore;
                        functions: (region?: string | undefined) => import("firebase").functions.Functions;
                        performance: () => import("firebase").performance.Performance;
                        remoteConfig: () => import("firebase").remoteConfig.RemoteConfig;
                        analytics: () => import("firebase").analytics.Analytics;
                    };
                    clearPersistence: () => Promise<void>;
                    enableNetwork: () => Promise<void>;
                    disableNetwork: () => Promise<void>;
                    waitForPendingWrites: () => Promise<void>;
                    onSnapshotsInSync: {
                        (observer: {
                            next?: ((value: void) => void) | undefined;
                            error?: ((error: Error) => void) | undefined;
                            complete?: (() => void) | undefined;
                        }): () => void;
                        (onSync: () => void): () => void;
                    };
                    terminate: () => Promise<void>;
                    INTERNAL: {
                        delete: () => Promise<void>;
                    };
                };
                parent: {
                    id: string;
                    parent: {
                        id: string;
                        firestore: {
                            settings: (settings: import("firebase").firestore.Settings) => void;
                            enablePersistence: (settings?: import("firebase").firestore.PersistenceSettings | undefined) => Promise<void>;
                            collection: (collectionPath: string) => import("firebase").firestore.CollectionReference<import("firebase").firestore.DocumentData>;
                            doc: (documentPath: string) => import("firebase").firestore.DocumentReference<import("firebase").firestore.DocumentData>;
                            collectionGroup: (collectionId: string) => import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                            runTransaction: <T_1>(updateFunction: (transaction: import("firebase").firestore.Transaction) => Promise<T_1>) => Promise<T_1>;
                            batch: () => import("firebase").firestore.WriteBatch;
                            app: {
                                auth: () => import("firebase").auth.Auth;
                                database: (url?: string | undefined) => import("firebase").database.Database;
                                delete: () => Promise<any>;
                                installations: () => import("firebase").installations.Installations;
                                messaging: () => import("firebase").messaging.Messaging;
                                name: string;
                                options: {
                                    constructor: Function;
                                    toString: () => string;
                                    toLocaleString: () => string;
                                    valueOf: () => Object;
                                    hasOwnProperty: (v: string | number | symbol) => boolean;
                                    isPrototypeOf: (v: Object) => boolean;
                                    propertyIsEnumerable: (v: string | number | symbol) => boolean;
                                };
                                storage: (url?: string | undefined) => import("firebase").storage.Storage;
                                firestore: () => import("firebase").firestore.Firestore;
                                functions: (region?: string | undefined) => import("firebase").functions.Functions;
                                performance: () => import("firebase").performance.Performance;
                                remoteConfig: () => import("firebase").remoteConfig.RemoteConfig;
                                analytics: () => import("firebase").analytics.Analytics;
                            };
                            clearPersistence: () => Promise<void>;
                            enableNetwork: () => Promise<void>;
                            disableNetwork: () => Promise<void>;
                            waitForPendingWrites: () => Promise<void>;
                            onSnapshotsInSync: {
                                (observer: {
                                    next?: ((value: void) => void) | undefined;
                                    error?: ((error: Error) => void) | undefined;
                                    complete?: (() => void) | undefined;
                                }): () => void;
                                (onSync: () => void): () => void;
                            };
                            terminate: () => Promise<void>;
                            INTERNAL: {
                                delete: () => Promise<void>;
                            };
                        };
                        parent: any;
                        path: string;
                        collection: (collectionPath: string) => import("firebase").firestore.CollectionReference<import("firebase").firestore.DocumentData>;
                        isEqual: (other: import("firebase").firestore.DocumentReference<import("firebase").firestore.DocumentData>) => boolean;
                        set: (data: import("firebase").firestore.DocumentData, options?: import("firebase").firestore.SetOptions | undefined) => Promise<void>;
                        update: {
                            (data: import("firebase").firestore.UpdateData): Promise<void>;
                            (field: string | import("firebase").firestore.FieldPath, value: any, ...moreFieldsAndValues: any[]): Promise<void>;
                        };
                        delete: () => Promise<void>;
                        get: (options?: import("firebase").firestore.GetOptions | undefined) => Promise<import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>>;
                        onSnapshot: {
                            (observer: {
                                next?: ((snapshot: import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>) => void) | undefined;
                                error?: ((error: import("firebase").firestore.FirestoreError) => void) | undefined;
                                complete?: (() => void) | undefined;
                            }): () => void;
                            (options: import("firebase").firestore.SnapshotListenOptions, observer: {
                                next?: ((snapshot: import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>) => void) | undefined;
                                error?: ((error: Error) => void) | undefined;
                                complete?: (() => void) | undefined;
                            }): () => void;
                            (onNext: (snapshot: import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>) => void, onError?: ((error: Error) => void) | undefined, onCompletion?: (() => void) | undefined): () => void;
                            (options: import("firebase").firestore.SnapshotListenOptions, onNext: (snapshot: import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>) => void, onError?: ((error: Error) => void) | undefined, onCompletion?: (() => void) | undefined): () => void;
                        };
                        withConverter: <U>(converter: import("firebase").firestore.FirestoreDataConverter<U>) => import("firebase").firestore.DocumentReference<U>;
                    } | null;
                    path: string;
                    doc: (documentPath?: string | undefined) => import("firebase").firestore.DocumentReference<import("firebase").firestore.DocumentData>;
                    add: (data: import("firebase").firestore.DocumentData) => Promise<import("firebase").firestore.DocumentReference<import("firebase").firestore.DocumentData>>;
                    isEqual: (other: import("firebase").firestore.CollectionReference<import("firebase").firestore.DocumentData>) => boolean;
                    withConverter: <U_1>(converter: import("firebase").firestore.FirestoreDataConverter<U_1>) => import("firebase").firestore.CollectionReference<U_1>;
                    firestore: {
                        settings: (settings: import("firebase").firestore.Settings) => void;
                        enablePersistence: (settings?: import("firebase").firestore.PersistenceSettings | undefined) => Promise<void>;
                        collection: (collectionPath: string) => import("firebase").firestore.CollectionReference<import("firebase").firestore.DocumentData>;
                        doc: (documentPath: string) => import("firebase").firestore.DocumentReference<import("firebase").firestore.DocumentData>;
                        collectionGroup: (collectionId: string) => import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                        runTransaction: <T_1>(updateFunction: (transaction: import("firebase").firestore.Transaction) => Promise<T_1>) => Promise<T_1>;
                        batch: () => import("firebase").firestore.WriteBatch;
                        app: {
                            auth: () => import("firebase").auth.Auth;
                            database: (url?: string | undefined) => import("firebase").database.Database;
                            delete: () => Promise<any>;
                            installations: () => import("firebase").installations.Installations;
                            messaging: () => import("firebase").messaging.Messaging;
                            name: string;
                            options: {
                                constructor: Function;
                                toString: () => string;
                                toLocaleString: () => string;
                                valueOf: () => Object;
                                hasOwnProperty: (v: string | number | symbol) => boolean;
                                isPrototypeOf: (v: Object) => boolean;
                                propertyIsEnumerable: (v: string | number | symbol) => boolean;
                            };
                            storage: (url?: string | undefined) => import("firebase").storage.Storage;
                            firestore: () => import("firebase").firestore.Firestore;
                            functions: (region?: string | undefined) => import("firebase").functions.Functions;
                            performance: () => import("firebase").performance.Performance;
                            remoteConfig: () => import("firebase").remoteConfig.RemoteConfig;
                            analytics: () => import("firebase").analytics.Analytics;
                        };
                        clearPersistence: () => Promise<void>;
                        enableNetwork: () => Promise<void>;
                        disableNetwork: () => Promise<void>;
                        waitForPendingWrites: () => Promise<void>;
                        onSnapshotsInSync: {
                            (observer: {
                                next?: ((value: void) => void) | undefined;
                                error?: ((error: Error) => void) | undefined;
                                complete?: (() => void) | undefined;
                            }): () => void;
                            (onSync: () => void): () => void;
                        };
                        terminate: () => Promise<void>;
                        INTERNAL: {
                            delete: () => Promise<void>;
                        };
                    };
                    where: (fieldPath: string | import("firebase").firestore.FieldPath, opStr: import("firebase").firestore.WhereFilterOp, value: any) => import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    orderBy: (fieldPath: string | import("firebase").firestore.FieldPath, directionStr?: "desc" | "asc" | undefined) => import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    limit: (limit: number) => import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    limitToLast: (limit: number) => import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    startAt: {
                        (snapshot: import("firebase").firestore.DocumentSnapshot<any>): import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                        (...fieldValues: any[]): import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    };
                    startAfter: {
                        (snapshot: import("firebase").firestore.DocumentSnapshot<any>): import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                        (...fieldValues: any[]): import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    };
                    endBefore: {
                        (snapshot: import("firebase").firestore.DocumentSnapshot<any>): import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                        (...fieldValues: any[]): import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    };
                    endAt: {
                        (snapshot: import("firebase").firestore.DocumentSnapshot<any>): import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                        (...fieldValues: any[]): import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    };
                    get: (options?: import("firebase").firestore.GetOptions | undefined) => Promise<import("firebase").firestore.QuerySnapshot<import("firebase").firestore.DocumentData>>;
                    onSnapshot: {
                        (observer: {
                            next?: ((snapshot: import("firebase").firestore.QuerySnapshot<import("firebase").firestore.DocumentData>) => void) | undefined;
                            error?: ((error: Error) => void) | undefined;
                            complete?: (() => void) | undefined;
                        }): () => void;
                        (options: import("firebase").firestore.SnapshotListenOptions, observer: {
                            next?: ((snapshot: import("firebase").firestore.QuerySnapshot<import("firebase").firestore.DocumentData>) => void) | undefined;
                            error?: ((error: Error) => void) | undefined;
                            complete?: (() => void) | undefined;
                        }): () => void;
                        (onNext: (snapshot: import("firebase").firestore.QuerySnapshot<import("firebase").firestore.DocumentData>) => void, onError?: ((error: Error) => void) | undefined, onCompletion?: (() => void) | undefined): () => void;
                        (options: import("firebase").firestore.SnapshotListenOptions, onNext: (snapshot: import("firebase").firestore.QuerySnapshot<import("firebase").firestore.DocumentData>) => void, onError?: ((error: Error) => void) | undefined, onCompletion?: (() => void) | undefined): () => void;
                    };
                };
                path: string;
                collection: (collectionPath: string) => import("firebase").firestore.CollectionReference<import("firebase").firestore.DocumentData>;
                isEqual: (other: import("firebase").firestore.DocumentReference<import("firebase").firestore.DocumentData>) => boolean;
                set: (data: import("firebase").firestore.DocumentData, options?: import("firebase").firestore.SetOptions | undefined) => Promise<void>;
                update: {
                    (data: import("firebase").firestore.UpdateData): Promise<void>;
                    (field: string | import("firebase").firestore.FieldPath, value: any, ...moreFieldsAndValues: any[]): Promise<void>;
                };
                delete: () => Promise<void>;
                get: (options?: import("firebase").firestore.GetOptions | undefined) => Promise<import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>>;
                onSnapshot: {
                    (observer: {
                        next?: ((snapshot: import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>) => void) | undefined;
                        error?: ((error: import("firebase").firestore.FirestoreError) => void) | undefined;
                        complete?: (() => void) | undefined;
                    }): () => void;
                    (options: import("firebase").firestore.SnapshotListenOptions, observer: {
                        next?: ((snapshot: import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>) => void) | undefined;
                        error?: ((error: Error) => void) | undefined;
                        complete?: (() => void) | undefined;
                    }): () => void;
                    (onNext: (snapshot: import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>) => void, onError?: ((error: Error) => void) | undefined, onCompletion?: (() => void) | undefined): () => void;
                    (options: import("firebase").firestore.SnapshotListenOptions, onNext: (snapshot: import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>) => void, onError?: ((error: Error) => void) | undefined, onCompletion?: (() => void) | undefined): () => void;
                };
                withConverter: <U_2>(converter: import("firebase").firestore.FirestoreDataConverter<U_2>) => import("firebase").firestore.DocumentReference<U_2>;
            };
            setReferenceToSubCollections: () => void;
            id: () => string;
            modifyData: (newData: Partial<MinimalUserData>) => MinimalUserData;
            [DRAFTABLE]: boolean;
        }>;
    }, action: PayloadAction<MinimalUser<T, S>>) => void;
} | {
    setUser: (state: {
        values: Map<string, {
            collections: unknown;
            data: {
                email: string;
                id: string;
            };
            reference: {
                id: string;
                firestore: {
                    settings: (settings: import("firebase").firestore.Settings) => void;
                    enablePersistence: (settings?: import("firebase").firestore.PersistenceSettings | undefined) => Promise<void>;
                    collection: (collectionPath: string) => import("firebase").firestore.CollectionReference<import("firebase").firestore.DocumentData>;
                    doc: (documentPath: string) => import("firebase").firestore.DocumentReference<import("firebase").firestore.DocumentData>;
                    collectionGroup: (collectionId: string) => import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    runTransaction: <T_1>(updateFunction: (transaction: import("firebase").firestore.Transaction) => Promise<T_1>) => Promise<T_1>;
                    batch: () => import("firebase").firestore.WriteBatch;
                    app: {
                        auth: () => import("firebase").auth.Auth;
                        database: (url?: string | undefined) => import("firebase").database.Database;
                        delete: () => Promise<any>;
                        installations: () => import("firebase").installations.Installations;
                        messaging: () => import("firebase").messaging.Messaging;
                        name: string;
                        options: {
                            constructor: Function;
                            toString: () => string;
                            toLocaleString: () => string;
                            valueOf: () => Object;
                            hasOwnProperty: (v: string | number | symbol) => boolean;
                            isPrototypeOf: (v: Object) => boolean;
                            propertyIsEnumerable: (v: string | number | symbol) => boolean;
                        };
                        storage: (url?: string | undefined) => import("firebase").storage.Storage;
                        firestore: () => import("firebase").firestore.Firestore;
                        functions: (region?: string | undefined) => import("firebase").functions.Functions;
                        performance: () => import("firebase").performance.Performance;
                        remoteConfig: () => import("firebase").remoteConfig.RemoteConfig;
                        analytics: () => import("firebase").analytics.Analytics;
                    };
                    clearPersistence: () => Promise<void>;
                    enableNetwork: () => Promise<void>;
                    disableNetwork: () => Promise<void>;
                    waitForPendingWrites: () => Promise<void>;
                    onSnapshotsInSync: {
                        (observer: {
                            next?: ((value: void) => void) | undefined;
                            error?: ((error: Error) => void) | undefined;
                            complete?: (() => void) | undefined;
                        }): () => void;
                        (onSync: () => void): () => void;
                    };
                    terminate: () => Promise<void>;
                    INTERNAL: {
                        delete: () => Promise<void>;
                    };
                };
                parent: {
                    id: string;
                    parent: {
                        id: string;
                        firestore: {
                            settings: (settings: import("firebase").firestore.Settings) => void;
                            enablePersistence: (settings?: import("firebase").firestore.PersistenceSettings | undefined) => Promise<void>;
                            collection: (collectionPath: string) => import("firebase").firestore.CollectionReference<import("firebase").firestore.DocumentData>;
                            doc: (documentPath: string) => import("firebase").firestore.DocumentReference<import("firebase").firestore.DocumentData>;
                            collectionGroup: (collectionId: string) => import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                            runTransaction: <T_1>(updateFunction: (transaction: import("firebase").firestore.Transaction) => Promise<T_1>) => Promise<T_1>;
                            batch: () => import("firebase").firestore.WriteBatch;
                            app: {
                                auth: () => import("firebase").auth.Auth;
                                database: (url?: string | undefined) => import("firebase").database.Database;
                                delete: () => Promise<any>;
                                installations: () => import("firebase").installations.Installations;
                                messaging: () => import("firebase").messaging.Messaging;
                                name: string;
                                options: {
                                    constructor: Function;
                                    toString: () => string;
                                    toLocaleString: () => string;
                                    valueOf: () => Object;
                                    hasOwnProperty: (v: string | number | symbol) => boolean;
                                    isPrototypeOf: (v: Object) => boolean;
                                    propertyIsEnumerable: (v: string | number | symbol) => boolean;
                                };
                                storage: (url?: string | undefined) => import("firebase").storage.Storage;
                                firestore: () => import("firebase").firestore.Firestore;
                                functions: (region?: string | undefined) => import("firebase").functions.Functions;
                                performance: () => import("firebase").performance.Performance;
                                remoteConfig: () => import("firebase").remoteConfig.RemoteConfig;
                                analytics: () => import("firebase").analytics.Analytics;
                            };
                            clearPersistence: () => Promise<void>;
                            enableNetwork: () => Promise<void>;
                            disableNetwork: () => Promise<void>;
                            waitForPendingWrites: () => Promise<void>;
                            onSnapshotsInSync: {
                                (observer: {
                                    next?: ((value: void) => void) | undefined;
                                    error?: ((error: Error) => void) | undefined;
                                    complete?: (() => void) | undefined;
                                }): () => void;
                                (onSync: () => void): () => void;
                            };
                            terminate: () => Promise<void>;
                            INTERNAL: {
                                delete: () => Promise<void>;
                            };
                        };
                        parent: any;
                        path: string;
                        collection: (collectionPath: string) => import("firebase").firestore.CollectionReference<import("firebase").firestore.DocumentData>;
                        isEqual: (other: import("firebase").firestore.DocumentReference<import("firebase").firestore.DocumentData>) => boolean;
                        set: (data: import("firebase").firestore.DocumentData, options?: import("firebase").firestore.SetOptions | undefined) => Promise<void>;
                        update: {
                            (data: import("firebase").firestore.UpdateData): Promise<void>;
                            (field: string | import("firebase").firestore.FieldPath, value: any, ...moreFieldsAndValues: any[]): Promise<void>;
                        };
                        delete: () => Promise<void>;
                        get: (options?: import("firebase").firestore.GetOptions | undefined) => Promise<import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>>;
                        onSnapshot: {
                            (observer: {
                                next?: ((snapshot: import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>) => void) | undefined;
                                error?: ((error: import("firebase").firestore.FirestoreError) => void) | undefined;
                                complete?: (() => void) | undefined;
                            }): () => void;
                            (options: import("firebase").firestore.SnapshotListenOptions, observer: {
                                next?: ((snapshot: import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>) => void) | undefined;
                                error?: ((error: Error) => void) | undefined;
                                complete?: (() => void) | undefined;
                            }): () => void;
                            (onNext: (snapshot: import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>) => void, onError?: ((error: Error) => void) | undefined, onCompletion?: (() => void) | undefined): () => void;
                            (options: import("firebase").firestore.SnapshotListenOptions, onNext: (snapshot: import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>) => void, onError?: ((error: Error) => void) | undefined, onCompletion?: (() => void) | undefined): () => void;
                        };
                        withConverter: <U>(converter: import("firebase").firestore.FirestoreDataConverter<U>) => import("firebase").firestore.DocumentReference<U>;
                    } | null;
                    path: string;
                    doc: (documentPath?: string | undefined) => import("firebase").firestore.DocumentReference<import("firebase").firestore.DocumentData>;
                    add: (data: import("firebase").firestore.DocumentData) => Promise<import("firebase").firestore.DocumentReference<import("firebase").firestore.DocumentData>>;
                    isEqual: (other: import("firebase").firestore.CollectionReference<import("firebase").firestore.DocumentData>) => boolean;
                    withConverter: <U_1>(converter: import("firebase").firestore.FirestoreDataConverter<U_1>) => import("firebase").firestore.CollectionReference<U_1>;
                    firestore: {
                        settings: (settings: import("firebase").firestore.Settings) => void;
                        enablePersistence: (settings?: import("firebase").firestore.PersistenceSettings | undefined) => Promise<void>;
                        collection: (collectionPath: string) => import("firebase").firestore.CollectionReference<import("firebase").firestore.DocumentData>;
                        doc: (documentPath: string) => import("firebase").firestore.DocumentReference<import("firebase").firestore.DocumentData>;
                        collectionGroup: (collectionId: string) => import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                        runTransaction: <T_1>(updateFunction: (transaction: import("firebase").firestore.Transaction) => Promise<T_1>) => Promise<T_1>;
                        batch: () => import("firebase").firestore.WriteBatch;
                        app: {
                            auth: () => import("firebase").auth.Auth;
                            database: (url?: string | undefined) => import("firebase").database.Database;
                            delete: () => Promise<any>;
                            installations: () => import("firebase").installations.Installations;
                            messaging: () => import("firebase").messaging.Messaging;
                            name: string;
                            options: {
                                constructor: Function;
                                toString: () => string;
                                toLocaleString: () => string;
                                valueOf: () => Object;
                                hasOwnProperty: (v: string | number | symbol) => boolean;
                                isPrototypeOf: (v: Object) => boolean;
                                propertyIsEnumerable: (v: string | number | symbol) => boolean;
                            };
                            storage: (url?: string | undefined) => import("firebase").storage.Storage;
                            firestore: () => import("firebase").firestore.Firestore;
                            functions: (region?: string | undefined) => import("firebase").functions.Functions;
                            performance: () => import("firebase").performance.Performance;
                            remoteConfig: () => import("firebase").remoteConfig.RemoteConfig;
                            analytics: () => import("firebase").analytics.Analytics;
                        };
                        clearPersistence: () => Promise<void>;
                        enableNetwork: () => Promise<void>;
                        disableNetwork: () => Promise<void>;
                        waitForPendingWrites: () => Promise<void>;
                        onSnapshotsInSync: {
                            (observer: {
                                next?: ((value: void) => void) | undefined;
                                error?: ((error: Error) => void) | undefined;
                                complete?: (() => void) | undefined;
                            }): () => void;
                            (onSync: () => void): () => void;
                        };
                        terminate: () => Promise<void>;
                        INTERNAL: {
                            delete: () => Promise<void>;
                        };
                    };
                    where: (fieldPath: string | import("firebase").firestore.FieldPath, opStr: import("firebase").firestore.WhereFilterOp, value: any) => import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    orderBy: (fieldPath: string | import("firebase").firestore.FieldPath, directionStr?: "desc" | "asc" | undefined) => import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    limit: (limit: number) => import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    limitToLast: (limit: number) => import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    startAt: {
                        (snapshot: import("firebase").firestore.DocumentSnapshot<any>): import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                        (...fieldValues: any[]): import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    };
                    startAfter: {
                        (snapshot: import("firebase").firestore.DocumentSnapshot<any>): import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                        (...fieldValues: any[]): import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    };
                    endBefore: {
                        (snapshot: import("firebase").firestore.DocumentSnapshot<any>): import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                        (...fieldValues: any[]): import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    };
                    endAt: {
                        (snapshot: import("firebase").firestore.DocumentSnapshot<any>): import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                        (...fieldValues: any[]): import("firebase").firestore.Query<import("firebase").firestore.DocumentData>;
                    };
                    get: (options?: import("firebase").firestore.GetOptions | undefined) => Promise<import("firebase").firestore.QuerySnapshot<import("firebase").firestore.DocumentData>>;
                    onSnapshot: {
                        (observer: {
                            next?: ((snapshot: import("firebase").firestore.QuerySnapshot<import("firebase").firestore.DocumentData>) => void) | undefined;
                            error?: ((error: Error) => void) | undefined;
                            complete?: (() => void) | undefined;
                        }): () => void;
                        (options: import("firebase").firestore.SnapshotListenOptions, observer: {
                            next?: ((snapshot: import("firebase").firestore.QuerySnapshot<import("firebase").firestore.DocumentData>) => void) | undefined;
                            error?: ((error: Error) => void) | undefined;
                            complete?: (() => void) | undefined;
                        }): () => void;
                        (onNext: (snapshot: import("firebase").firestore.QuerySnapshot<import("firebase").firestore.DocumentData>) => void, onError?: ((error: Error) => void) | undefined, onCompletion?: (() => void) | undefined): () => void;
                        (options: import("firebase").firestore.SnapshotListenOptions, onNext: (snapshot: import("firebase").firestore.QuerySnapshot<import("firebase").firestore.DocumentData>) => void, onError?: ((error: Error) => void) | undefined, onCompletion?: (() => void) | undefined): () => void;
                    };
                };
                path: string;
                collection: (collectionPath: string) => import("firebase").firestore.CollectionReference<import("firebase").firestore.DocumentData>;
                isEqual: (other: import("firebase").firestore.DocumentReference<import("firebase").firestore.DocumentData>) => boolean;
                set: (data: import("firebase").firestore.DocumentData, options?: import("firebase").firestore.SetOptions | undefined) => Promise<void>;
                update: {
                    (data: import("firebase").firestore.UpdateData): Promise<void>;
                    (field: string | import("firebase").firestore.FieldPath, value: any, ...moreFieldsAndValues: any[]): Promise<void>;
                };
                delete: () => Promise<void>;
                get: (options?: import("firebase").firestore.GetOptions | undefined) => Promise<import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>>;
                onSnapshot: {
                    (observer: {
                        next?: ((snapshot: import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>) => void) | undefined;
                        error?: ((error: import("firebase").firestore.FirestoreError) => void) | undefined;
                        complete?: (() => void) | undefined;
                    }): () => void;
                    (options: import("firebase").firestore.SnapshotListenOptions, observer: {
                        next?: ((snapshot: import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>) => void) | undefined;
                        error?: ((error: Error) => void) | undefined;
                        complete?: (() => void) | undefined;
                    }): () => void;
                    (onNext: (snapshot: import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>) => void, onError?: ((error: Error) => void) | undefined, onCompletion?: (() => void) | undefined): () => void;
                    (options: import("firebase").firestore.SnapshotListenOptions, onNext: (snapshot: import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>) => void, onError?: ((error: Error) => void) | undefined, onCompletion?: (() => void) | undefined): () => void;
                };
                withConverter: <U_2>(converter: import("firebase").firestore.FirestoreDataConverter<U_2>) => import("firebase").firestore.DocumentReference<U_2>;
            };
            setReferenceToSubCollections: () => void;
            id: () => string;
            modifyData: (newData: Partial<MinimalUserData>) => MinimalUserData;
            [DRAFTABLE]: boolean;
        }>;
    }, action: PayloadAction<MinimalUser<T, S>>) => void;
}, "users">;
export declare type UsersSlice = ReturnType<typeof createUsersSlice>;
export {};
