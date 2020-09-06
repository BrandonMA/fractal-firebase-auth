import { MinimalExpectedDatabase, MinimalUserData } from '../types';
import { useSubscribeForAuthenticatedUser, useSubscribeForDatabaseUserObject, useAuthenticatedUser } from '../hooks';

interface Props<UserType extends MinimalUserData, UserSubCollection> {
    database: MinimalExpectedDatabase<UserType, UserSubCollection>;
    loadingComponent: JSX.Element;
    authenticationComponent: JSX.Element;
    userNotAvailableComponent: JSX.Element;
    children: JSX.Element;
}

export function Authenticate<UserType extends MinimalUserData, UserSubCollection>(props: Props<UserType, UserSubCollection>): JSX.Element {
    const { database } = props;
    const authenticationState = useSubscribeForAuthenticatedUser();
    const loadingUserFromDatabase = useSubscribeForDatabaseUserObject(authenticationState, database);
    const currentUser = useAuthenticatedUser();

    if (authenticationState.firebaseUser === undefined && authenticationState.loading) {
        return props.loadingComponent;
    } else if (authenticationState.firebaseUser === null && authenticationState.loading === false) {
        return props.authenticationComponent;
    } else {
        if (loadingUserFromDatabase && currentUser == null) {
            return props.loadingComponent;
        } else {
            if (currentUser == null) {
                return props.userNotAvailableComponent;
            } else {
                return props.children;
            }
        }
    }
}
