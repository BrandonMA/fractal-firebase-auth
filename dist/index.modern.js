import { useSelector, useDispatch } from 'react-redux';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth, initializeApp } from 'firebase/app';
import 'firebase/auth';
import { useCallback, useState, useEffect } from 'react';

function isAuthenticationState(value) {
  var castedValue = value;
  return castedValue.loading != null;
}

function isMinimalExpectedReduxState(value) {
  var castedValue = value;
  return castedValue.authentication != null && isAuthenticationState(castedValue.authentication) && castedValue.users != null;
}

function getState(state) {
  if (isMinimalExpectedReduxState(state)) {
    return state.authentication;
  } else {
    throw Error('State does not have the expected shape');
  }
}

function useAuthenticationState() {
  return useSelector(getState);
}

function isUsersState(value) {
  var casted = value;
  return casted.values != null;
}

function getUsers(state) {
  if (isMinimalExpectedReduxState(state) && isUsersState(state.users)) {
    return state.users;
  } else {
    throw Error('State does not have the expected shape');
  }
}

function useCurrentUser() {
  var authState = useAuthenticationState();
  var users = useSelector(getUsers);

  if (authState.firebaseUser != null) {
    return users.values.get(authState.firebaseUser.uid);
  } else {
    return null;
  }
}

var signIn = createAsyncThunk('authentication/signIn', function (user) {
  try {
    return Promise.resolve(auth().signInWithEmailAndPassword(user.email, user.password)).then(function (userCredential) {
      return {
        firebaseUser: userCredential.user,
        loading: false
      };
    });
  } catch (e) {
    return Promise.reject(e);
  }
});

var signOut = createAsyncThunk('authentication/signOut', function () {
  try {
    return Promise.resolve(auth().signOut()).then(function () {
      return {
        firebaseUser: undefined,
        loading: false
      };
    });
  } catch (e) {
    return Promise.reject(e);
  }
});

var signUp = createAsyncThunk('authentication/signUp', function (user) {
  try {
    return Promise.resolve(auth().createUserWithEmailAndPassword(user.email, user.password)).then(function (userCredential) {
      return {
        firebaseUser: userCredential.user,
        loading: false
      };
    });
  } catch (e) {
    return Promise.reject(e);
  }
});

var subscribeForAuthenticatedUser = function subscribeForAuthenticatedUser(slice) {
  return function (dispatch) {
    return auth().onAuthStateChanged(function (user) {
      dispatch(slice.actions.setAuthenticationState({
        firebaseUser: user,
        loading: false
      }));
    }, function (error) {
      alert(error.message);
    });
  };
};

function createUser(database, data, usersSlice) {
  return function (dispatch) {
    try {
      return Promise.resolve(database.collections.users.createDocument(data)).then(function (userDocument) {
        dispatch(usersSlice.actions.setUser(userDocument));
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function useSignIn(email, password) {
  var dispatch = useDispatch();
  return useCallback(function () {
    try {
      return Promise.resolve(dispatch(signIn({
        email: email,
        password: password
      }))).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  }, [email, password, dispatch]);
}

function useSignOut() {
  var dispatch = useDispatch();
  return useCallback(function () {
    try {
      return Promise.resolve(dispatch(signOut())).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  }, [dispatch]);
}

function useSignUp(email, password) {
  var dispatch = useDispatch();
  return useCallback(function () {
    try {
      return Promise.resolve(dispatch(signUp({
        email: email,
        password: password
      }))).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  }, [email, password, dispatch]);
}

function useSubscribeForAuthenticatedUser(slice) {
  var dispatch = useDispatch();
  return useCallback(function () {
    return dispatch(subscribeForAuthenticatedUser(slice));
  }, [dispatch, slice]);
}

function subscribeForUser(database, id, usersSlice, onFetchDone) {
  return function (dispatch) {
    return database.collections.users.subscribeToDocument(id, function (newDocument) {
      dispatch(usersSlice.actions.setUser(newDocument));

      if (onFetchDone) {
        onFetchDone();
      }
    }, function (error) {
      alert(error.message);
    }, function () {
      if (onFetchDone) {
        onFetchDone();
      }
    });
  };
}

function useSubscribeForUser(database, id, usersSlice, onFetchDone) {
  var dispatch = useDispatch();
  return useCallback(function () {
    return dispatch(subscribeForUser(database, id, usersSlice, onFetchDone));
  }, [dispatch, database, id, usersSlice, onFetchDone]);
}

function updateUser(database, data, usersSlice) {
  return function (dispatch) {
    try {
      return Promise.resolve(database.collections.users.updateDocument(data)).then(function (userDocument) {
        dispatch(usersSlice.actions.setUser(userDocument));
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function useUpdateUser(database, data, usersSlice) {
  var dispatch = useDispatch();
  return useCallback(function () {
    return dispatch(updateUser(database, data, usersSlice));
  }, [dispatch, database, data, usersSlice]);
}

var initialState = Object.freeze({
  firebaseUser: undefined,
  loading: true
});

function replaceAuthenticationState(state, action) {
  state.loading = action.payload.loading;
  state.firebaseUser = action.payload.firebaseUser;
}

var authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    setFirebaseUser: function setFirebaseUser(state, action) {
      state.firebaseUser = action.payload;
    },
    setLoadingFirebaseData: function setLoadingFirebaseData(state, action) {
      state.loading = action.payload;
    },
    setAuthenticationState: replaceAuthenticationState
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(signIn.fulfilled, replaceAuthenticationState);
    builder.addCase(signOut.fulfilled, replaceAuthenticationState);
    builder.addCase(signUp.fulfilled, replaceAuthenticationState);
  }
});

var initialState$1 = Object.freeze({
  values: new Map()
});
function createUsersSlice() {
  return createSlice({
    name: 'users',
    initialState: initialState$1,
    reducers: {
      setUser: function setUser(state, action) {
        state.values.set(action.payload.id(), action.payload);
      }
    }
  });
}

function Authenticate(props) {
  var _authenticationState$, _authenticationState$2;

  var authenticationState = useAuthenticationState();
  var currentUser = useCurrentUser();

  var _useState = useState(false),
      listeningForUser = _useState[0],
      setListeningForUser = _useState[1];

  var database = props.database,
      authenticationSlice = props.authenticationSlice,
      usersSlice = props.usersSlice;
  var subscribeForAuthenticatedUser = useSubscribeForAuthenticatedUser(authenticationSlice);
  var onFetch = useCallback(function () {
    setListeningForUser(true);
  }, []);
  var subscribeForUser = useSubscribeForUser(database, (_authenticationState$ = (_authenticationState$2 = authenticationState.firebaseUser) === null || _authenticationState$2 === void 0 ? void 0 : _authenticationState$2.uid) != null ? _authenticationState$ : '', usersSlice, onFetch);
  useEffect(function () {
    var unsubscribe = subscribeForAuthenticatedUser();
    return function () {
      unsubscribe();
    };
  }, [subscribeForAuthenticatedUser]);
  useEffect(function () {
    var unsubscribe;

    if (authenticationState.firebaseUser != null) {
      unsubscribe = subscribeForUser();
    }

    return function () {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [subscribeForUser, authenticationState]);

  if (authenticationState.firebaseUser === undefined && authenticationState.loading) {
    return props.loadingComponent;
  } else if (authenticationState.firebaseUser === null && authenticationState.loading === false) {
    return props.authenticationComponent;
  } else {
    if (listeningForUser) {
      if (currentUser == null) {
        return props.userNotAvailableComponent;
      } else {
        return props.children;
      }
    }

    return props.loadingComponent;
  }
}

function Firebase(props) {
  var _useState = useState(false),
      firebaseReady = _useState[0],
      setFirebaseReady = _useState[1];

  var firebaseConfig = props.firebaseConfig;
  useEffect(function () {
    initializeApp(firebaseConfig);
    setFirebaseReady(true);
  }, [firebaseConfig]);
  return firebaseReady ? props.children : props.loadingComponent;
}

export { Authenticate, Firebase, authenticationSlice, createUser, createUsersSlice, isAuthenticationState, isMinimalExpectedReduxState, isUsersState, signIn, signOut, signUp, subscribeForAuthenticatedUser, useAuthenticationState, useCurrentUser, useSignIn, useSignOut, useSignUp, useSubscribeForAuthenticatedUser, useSubscribeForUser, useUpdateUser };
//# sourceMappingURL=index.modern.js.map
