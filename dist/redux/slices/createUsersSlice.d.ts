import { PayloadAction, ActionCreatorWithPreparedPayload } from '@reduxjs/toolkit';
import { UsersState } from '../types/UsersState';
import { MinimalUser } from '../types/MinimalUser';
declare type UsersMinimalState = UsersState<MinimalUser>;
declare type ReducerFunction = (state: UsersMinimalState, action: PayloadAction<UsersMinimalState>) => void;
interface ExtraReducers<ThunkArg = void> {
    [key: string]: {
        callback: ReducerFunction;
        fullfilled: ActionCreatorWithPreparedPayload<[UsersMinimalState, string, ThunkArg], UsersMinimalState, string, never>;
    };
}
export declare function createUsersSlice<ThunkArg = void>(reducers?: ExtraReducers<ThunkArg>, extraReducers?: ExtraReducers<ThunkArg>): import("@reduxjs/toolkit").Slice<Readonly<UsersMinimalState>, {
    setUser: (state: {
        users: Map<string, {
            email: string;
            id: string;
        }>;
    }, action: PayloadAction<MinimalUser>) => void;
} | {
    setUser: (state: {
        users: Map<string, {
            email: string;
            id: string;
        }>;
    }, action: PayloadAction<MinimalUser>) => void;
}, "users">;
export {};
