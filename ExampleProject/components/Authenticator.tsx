import { useEffect } from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../redux';
import subscribeForAuthenticatedUserThunk from '../redux/thunks/subscribeForAuthenticatedUserThunk';
import { connect } from 'react-redux';

interface ReduxFunctions {
    subscribeForAuthenticatedUser: () => void;
}

interface Props extends ReduxFunctions {
    children: JSX.Element;
}

function Authentication(props: Props): JSX.Element {
    const { subscribeForAuthenticatedUser } = props;

    useEffect(() => {
        subscribeForAuthenticatedUser();
    }, [subscribeForAuthenticatedUser]);

    return props.children;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<void, AppState, Action>): ReduxFunctions => ({
    subscribeForAuthenticatedUser(): void {
        dispatch(subscribeForAuthenticatedUserThunk());
    }
});

export default connect(null, mapDispatchToProps)(Authentication);
