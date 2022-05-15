import React, { ReactElement } from 'react';
import { MinimalExpectedDatabase, MinimalUserData } from '../types';
import { useAuthenticateChildren, useSubscribeForAuthenticatedUser, useSubscribeForUserDocument, useUserDocument } from '../hooks';
import { Redirect, useLocation } from '@bma98/fractal-navigation-router';
import { ComponentRouteProps } from '../types/ComponentRouteProps';
import { AuthenticationCheck } from '@bma98/fractal-auth-screen';
import { Switch, Route } from '@bma98/fractal-navigation-router';

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
    const { pathname } = useLocation();
    const Wrapper = WrapperComponent ?? React.Fragment;

    const isLoadingFirebaseUser = firebaseUser === undefined && loading;
    const isFirebaseUserMissing = firebaseUser === null && !loading;
    const isUserDocumentMissing = userDocument == null;

    const firebaseAuthenticationState: FirebaseAuthenticationState = (() => {
        if (isLoadingFirebaseUser) {
            return 'loading';
        } else if (isFirebaseUserMissing) {
            return 'firebaseUserIsMissing';
        } else if (isLoadingUserDocument && isUserDocumentMissing) {
            return 'loading';
        } else if (!isLoadingUserDocument && isUserDocumentMissing) {
            return 'firestoreUserDocumentIsMissing';
        } else if (!isLoadingUserDocument && !isUserDocumentMissing) {
            return 'accessIsAllowed';
        } else {
            return 'loading';
        }
    })();

    const authenticationState = (() => {
        if (firebaseAuthenticationState === 'loading') {
            return 'loading';
        } else if (firebaseAuthenticationState === 'firebaseUserIsMissing') {
            return 'accessIsNotAllowed';
        } else if (firebaseAuthenticationState === 'firestoreUserDocumentIsMissing') {
            return 'accessIsNotAllowed';
        } else {
            return 'accessIsAllowed';
        }
    })();

    const RedirectComponent = (() => {
        if (firebaseAuthenticationState === 'firebaseUserIsMissing') {
            return <Redirect from={pathname} to={authPair.route} />;
        } else if (firebaseAuthenticationState === 'firestoreUserDocumentIsMissing') {
            return <Redirect from={pathname} to={createUser.route} />;
        } else {
            return <Redirect from={pathname} to={app.route} />;
        }
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
