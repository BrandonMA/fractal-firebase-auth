import firebase from 'firebase/app';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { MinimalExpectedReduxState } from '../..';
import { MinimalExpectedDatabase } from '../../types/MinimalExpectedDatabase';
import { MinimalUserData } from '../../types';
import { UsersSlice } from '../../slices';

export function subscribeForUser<T extends MinimalUserData, S>(
    database: MinimalExpectedDatabase<T, S>,
    id: string,
    usersSlice: UsersSlice,
    onFetchDone?: () => void
) {
    return (dispatch: ThunkDispatch<Promise<void>, MinimalExpectedReduxState, Action>): firebase.Unsubscribe => {
        return database.collections.users.subscribeToDocument(
            id,
            (newDocument) => {
                dispatch(usersSlice.actions.setUser(newDocument));
                if (onFetchDone) {
                    onFetchDone();
                }
            },
            (error) => {
                alert(error.message);
            },
            () => {
                if (onFetchDone) {
                    onFetchDone();
                }
            }
        );
    };
}
