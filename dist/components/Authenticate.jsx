import { useSubscribeForAuthenticatedUser, useSubscribeForDatabaseUserObject, useAuthenticatedUser } from '../hooks';
export function Authenticate(props) {
    var database = props.database;
    var authenticationState = useSubscribeForAuthenticatedUser();
    var loadingUserFromDatabase = useSubscribeForDatabaseUserObject(authenticationState, database);
    var currentUser = useAuthenticatedUser();
    if (authenticationState.firebaseUser === undefined && authenticationState.loading) {
        return props.loadingComponent;
    }
    else if (authenticationState.firebaseUser === null && authenticationState.loading === false) {
        return props.authenticationComponent;
    }
    else {
        if (loadingUserFromDatabase && currentUser == null) {
            return props.loadingComponent;
        }
        else {
            if (currentUser == null) {
                return props.userNotAvailableComponent;
            }
            else {
                return props.children;
            }
        }
    }
}
//# sourceMappingURL=Authenticate.jsx.map