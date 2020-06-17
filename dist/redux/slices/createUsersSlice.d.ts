import { PayloadAction, Slice } from '@reduxjs/toolkit';
import { UsersState } from '../types/UsersState';
import { MinimalUserData, MinimalUser } from '../types/MinimalUser';
declare type UsersMinimalState = UsersState<MinimalUserData, unknown>;
export declare function createUsersSlice<T extends MinimalUserData, S>(): Slice<Readonly<UsersMinimalState>, {
    setUser: (state: UsersMinimalState, action: PayloadAction<MinimalUser<T, S>>) => void;
}, 'users'>;
export declare type UsersSlice = ReturnType<typeof createUsersSlice>;
export {};
