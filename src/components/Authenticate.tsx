import React from 'react';
import { MinimalExpectedDatabase, MinimalUserData } from '../types';
import { useSubscribeForAuthenticatedUser, useSubscribeForUserDocument, useUserDocument } from '../hooks';
import { ComponentRoutePair } from '../types/ComponentRoutePair';
import { FadeRoute, Redirect, useLocation } from '@bma98/fractal-navigation';

export interface AuthenticateProps<UserType extends MinimalUserData, UserSubCollection> {
    database: MinimalExpectedDatabase<UserType, UserSubCollection>;
    loadingPair: ComponentRoutePair;
    authPair: ComponentRoutePair;
    createUser: ComponentRoutePair;
    app: ComponentRoutePair;
}

export function Authenticate<UserType extends MinimalUserData, UserSubCollection>({
    authPair,
    loadingPair,
    app,
    createUser,
    database
}: AuthenticateProps<UserType, UserSubCollection>): JSX.Element {
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
            {!isLoadingUserDocument && !isUserDocumentMissing ? <FadeRoute path={app.route}>{app.component}</FadeRoute> : null}
            {!isLoadingUserDocument && isUserDocumentMissing ? <FadeRoute path={createUser.route}>{createUser.component}</FadeRoute> : null}
            {getRedirect()}
        </>
    );
}
