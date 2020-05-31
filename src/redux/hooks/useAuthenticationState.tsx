import { useSelector } from 'react-redux';
import { AuthenticationState } from '../types/AuthenticationState';
import { isMinimalExpectedReduxState } from '../types/MinimalExpectedReduxState';

const getState = (state: unknown): Readonly<AuthenticationState> => {
    if (isMinimalExpectedReduxState(state)) {
        return state.authentication;
    } else {
        throw Error('State does not have the expected shape');
    }
};

const useAuthenticationState = (): Readonly<AuthenticationState> => {
    return useSelector(getState);
};

export default useAuthenticationState;
