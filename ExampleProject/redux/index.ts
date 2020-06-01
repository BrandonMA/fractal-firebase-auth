import { createAuthenticationSlice, createUsersSlice } from 'react-firebase-auth';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

export const authenticationSlice = createAuthenticationSlice();
export const usersSlice = createUsersSlice();

const reducers = combineReducers({
    authentication: authenticationSlice.reducer,
    users: usersSlice.reducer
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, storeEnhancers(applyMiddleware(thunk)));

export type StoreType = typeof store;
export type AppState = ReturnType<typeof reducers>;

export default store;
