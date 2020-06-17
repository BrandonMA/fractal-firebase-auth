import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { UsersState } from '../types/UsersState';
import { MinimalUserData, MinimalUser } from '../types/MinimalUser';

type UsersMinimalState = UsersState<MinimalUserData, unknown>;

const initialState: Readonly<UsersMinimalState> = Object.freeze({
    values: new Map()
});

export function createUsersSlice<T extends MinimalUserData, S>(): Slice<
    Readonly<UsersMinimalState>,
    {
        setUser: (state: UsersMinimalState, action: PayloadAction<MinimalUser<T, S>>) => void;
    },
    'users'
> {
    return createSlice({
        name: 'users',
        initialState,
        reducers: {
            setUser: (state, action: PayloadAction<MinimalUser<T, S>>): void => {
                state.values.set(action.payload.id(), action.payload);
            }
        }
    });
}

export type UsersSlice = ReturnType<typeof createUsersSlice>;
