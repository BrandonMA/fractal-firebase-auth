import { useAuthenticationState } from './redux/hooks/useAuthenticationState';
import { useCurrentUser } from './redux/hooks/useCurrentUser';

interface Props {
    loadingComponent: JSX.Element;
    authenticationComponent: JSX.Element;
    userNotAvailableComponent: JSX.Element;
    children: JSX.Element;
}

export function Authenticate(props: Props): JSX.Element {
    const authenticationState = useAuthenticationState();
    const currentUser = useCurrentUser();
    if (authenticationState.firebaseUser === undefined && authenticationState.loading) {
        return props.loadingComponent;
    } else if (authenticationState.firebaseUser === null && authenticationState.loading === false) {
        return props.authenticationComponent;
    } else {
        if (currentUser === undefined) {
            return props.userNotAvailableComponent;
        } else {
            return props.children;
        }
    }
}
