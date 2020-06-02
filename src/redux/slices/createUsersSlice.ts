import { createSlice, PayloadAction, ActionCreatorWithPreparedPayload } from '@reduxjs/toolkit';
import { UsersState } from '../types/UsersState';
import { MinimalUserData, MinimalUser } from '../types/MinimalUser';

type UsersMinimalState = UsersState<MinimalUserData, unknown>;

const initialState: Readonly<UsersMinimalState> = Object.freeze({
    values: new Map()
});

type ReducerFunction = (state: UsersMinimalState, action: PayloadAction<UsersMinimalState>) => void;
interface ExtraReducers<ThunkArg = void> {
    [key: string]: {
        callback: ReducerFunction;
        fullfilled: ActionCreatorWithPreparedPayload<[UsersMinimalState, string, ThunkArg], UsersMinimalState, string, never>;
    };
}

// eslint-disable-next-line
export function createUsersSlice<T extends MinimalUserData, S, ThunkArg = void>(
    reducers?: ExtraReducers<ThunkArg>,
    extraReducers?: ExtraReducers<ThunkArg>
) {
    return createSlice({
        name: 'users',
        initialState,
        reducers: {
            setUser: (state, action: PayloadAction<MinimalUser<T, S>>): void => {
                state.values.set(action.payload.id(), action.payload);
            },
            ...reducers
        },
        extraReducers: (builder) => {
            // Inject extra reducers
            if (extraReducers != null) {
                const keys = Object.keys(extraReducers);
                if (keys.length > 0) {
                    for (const reducerKey of keys) {
                        const data = extraReducers[reducerKey];
                        builder.addCase(data.fullfilled, data.callback);
                    }
                }
            }
        }
    });
}

export type UsersSlice = ReturnType<typeof createUsersSlice>;
