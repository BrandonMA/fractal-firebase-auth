import React, { ReactElement } from 'react';
import { MinimalExpectedDatabase, MinimalUserData } from '../types';
import { useAuthenticateChildren, useSubscribeForAuthenticatedUser, useSubscribeForUserDocument, useUserDocument } from '../hooks';
import { FadeRoute, Redirect, useLocation } from '@bma98/fractal-navigation';
import { ComponentRouteProps } from '../types/ComponentRouteProps';

export interface AuthenticateProps<UserType extends MinimalUserData, UserSubCollection> {
    database: MinimalExpectedDatabase<UserType, UserSubCollection>;
    children: Array<ReactElement<ComponentRouteProps>>;
}

export function Authenticate<UserType extends MinimalUserData, UserSubCollection>({
    database,
    children
}: AuthenticateProps<UserType, UserSubCollection>): JSX.Element {
    const [app, loadingPair, authPair, createUser] = useAuthenticateChildren(children);
    const { firebaseUser, loading } = useSubscribeForAuthenticatedUser();
    const isLoadingUserDocument = useSubscribeForUserDocument(firebaseUser, database);
    const userDocument = useUserDocument();
    const { pathname } = useLocation();

    const isLoadingFirebaseUser = firebaseUser === undefined && loading;
    const isFirebaseUserMissing = firebaseUser === null && !loading;
    const isUserDocumentMissing = userDocument == null;

    function getRedirect(): JSX.Element | null {
        if (isLoadingFirebaseUser) {
            return <Redirect from={pathname} to={loadingPair.route} />;
        } else if (isFirebaseUserMissing) {
            return <Redirect from={pathname} to={authPair.route} />;
        } else if (isLoadingUserDocument && isUserDocumentMissing) {
            return <Redirect from={pathname} to={loadingPair.route} />;
        } else if (!isLoadingUserDocument && isUserDocumentMissing) {
            return <Redirect from={pathname} to={createUser.route} />;
        } else if (!isLoadingUserDocument && !isUserDocumentMissing) {
            return <Redirect from={pathname} to={app.route} />;
        } else {
            return null;
        }
    }

    return (
        <>
            <FadeRoute path={loadingPair.route}>{loadingPair.component}</FadeRoute>
            {isFirebaseUserMissing ? <FadeRoute path={authPair.route}>{authPair.component}</FadeRoute> : null}
            {!isLoadingUserDocument && !isUserDocumentMissing && !isFirebaseUserMissing ? (
                <FadeRoute path={app.route}>{app.component}</FadeRoute>
            ) : null}
            {!isLoadingUserDocument && isUserDocumentMissing && !isFirebaseUserMissing ? (
                <FadeRoute path={createUser.route}>{createUser.component}</FadeRoute>
            ) : null}
            {getRedirect()}
        </>
    );
}
