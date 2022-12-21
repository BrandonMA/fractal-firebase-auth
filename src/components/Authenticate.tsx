import React, { ReactElement } from 'react';
import { Redirect, useLocation, Switch, Route } from '@bma98/fractal-navigation-router';
import { AuthenticationCheck } from '@bma98/fractal-auth-screen';
import { MinimalExpectedDatabase, MinimalUserData } from '../types';
import { useAuthenticateChildren, useSubscribeForAuthenticatedUser, useSubscribeForUserDocument, useUserDocument } from '../hooks';
import { ComponentRouteProps } from '../types/ComponentRouteProps';

export interface AuthenticateProps<UserType extends MinimalUserData> {
    database: MinimalExpectedDatabase<UserType, unknown>;
    children: Array<ReactElement<ComponentRouteProps>>;
    WrapperComponent?: React.FC;
}

type FirebaseAuthenticationState = 'loading' | 'accessIsAllowed' | 'firebaseUserIsMissing' | 'firestoreUserDocumentIsMissing';

export function Authenticate<UserType extends MinimalUserData>({
    database,
    children,
    WrapperComponent
}: AuthenticateProps<UserType>): ReactElement {
    const [app, loadingPair, authPair, createUser] = useAuthenticateChildren(children);
    const { firebaseUser, loading } = useSubscribeForAuthenticatedUser();
    const isLoadingUserDocument = useSubscribeForUserDocument(firebaseUser, database);
    const userDocument = useUserDocument();
    const { pathname, search } = useLocation();
    const Wrapper = WrapperComponent ?? React.Fragment;

    const isLoadingFirebaseUser = firebaseUser === undefined && loading;
    const isFirebaseUserMissing = firebaseUser === null && !loading;
    const isUserDocumentMissing = userDocument == null;

    const firebaseAuthenticationState: FirebaseAuthenticationState = (() => {
        if (isLoadingFirebaseUser) {
            return 'loading';
        }
        if (isFirebaseUserMissing) {
            return 'firebaseUserIsMissing';
        }
        if (isLoadingUserDocument && isUserDocumentMissing) {
            return 'loading';
        }
        if (!isLoadingUserDocument && isUserDocumentMissing) {
            return 'firestoreUserDocumentIsMissing';
        }
        if (!isLoadingUserDocument && !isUserDocumentMissing) {
            return 'accessIsAllowed';
        }
        return 'loading';
    })();

    const authenticationState = (() => {
        if (firebaseAuthenticationState === 'loading') {
            return 'loading';
        }
        if (firebaseAuthenticationState === 'firebaseUserIsMissing') {
            return 'accessIsNotAllowed';
        }
        if (firebaseAuthenticationState === 'firestoreUserDocumentIsMissing') {
            return 'accessIsNotAllowed';
        }
        return 'accessIsAllowed';
    })();

    const RedirectComponent = (() => {
        if (firebaseAuthenticationState === 'firebaseUserIsMissing') {
            return <Redirect from={pathname} to={{ pathname: authPair.route, search }} />;
        }
        if (firebaseAuthenticationState === 'firestoreUserDocumentIsMissing') {
            return <Redirect from={pathname} to={{ pathname: createUser.route, search }} />;
        }
        return <Redirect from={pathname} to={{ pathname: app.route, search }} />;
    })();

    return (
        <Switch>
            {firebaseAuthenticationState === 'firebaseUserIsMissing' && (
                <Route path={authPair.route}>
                    <Wrapper>{authPair.component}</Wrapper>
                </Route>
            )}
            {firebaseAuthenticationState === 'firestoreUserDocumentIsMissing' && (
                <Route path={createUser.route}>
                    <Wrapper>{createUser.component}</Wrapper>
                </Route>
            )}
            <AuthenticationCheck
                key='Authenticate'
                state={authenticationState}
                loadingComponent={loadingPair.component}
                redirectComponent={RedirectComponent}
            >
                <Wrapper>{app.component}</Wrapper>
            </AuthenticationCheck>
        </Switch>
    );
}
