function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var reactRedux = require('react-redux');
var firebase = require('firebase/app');
var firebase__default = _interopDefault(firebase);
require('firebase/auth');
var react = require('react');
var toolkit = require('@reduxjs/toolkit');

function isAuthenticationState(value) {
  var castedValue = value;
  return castedValue.loading != null;
}

function isMinimalExpectedReduxState(value) {
  var castedValue = value;
  return castedValue.authentication != null && isAuthenticationState(castedValue.authentication) && castedValue.users != null;
}

var getState = function getState(state) {
  if (isMinimalExpectedReduxState(state)) {
    return state.authentication;
  } else {
    throw Error('State does not have the expected shape');
  }
};

var useAuthenticationState = function useAuthenticationState() {
  return reactRedux.useSelector(getState);
};

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
  var users = reactRedux.useSelector(getUsers);

  if (authState.firebaseUser != null) {
    return users.values.get(authState.firebaseUser.uid);
  } else {
    return null;
  }
}

var subscribeForAuthenticatedUser = function subscribeForAuthenticatedUser(slice) {
  return function (dispatch) {
    return firebase__default.auth().onAuthStateChanged(function (user) {
      dispatch(slice.actions.setAuthenticationState({
        firebaseUser: user,
        loading: false
      }));
    }, function (error) {
      alert(error.message);
    });
  };
};

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

function Authenticate(props) {
  var authenticationState = useAuthenticationState();
  var currentUser = useCurrentUser();

  var _useState = react.useState(false),
      listeningForUser = _useState[0],
      setListeningForUser = _useState[1];

  var subscribeForAuthenticatedUser = props.subscribeForAuthenticatedUser,
      database = props.database,
      subscribeForUser = props.subscribeForUser;
  react.useEffect(function () {
    var unsubscribe = subscribeForAuthenticatedUser();
    return function () {
      unsubscribe();
    };
  }, [subscribeForAuthenticatedUser]);
  react.useEffect(function () {
    var unsubscribe;

    if (authenticationState.firebaseUser != null) {
      unsubscribe = subscribeForUser(database, authenticationState.firebaseUser.uid, function () {
        setListeningForUser(true);
      });
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

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    subscribeForAuthenticatedUser: function subscribeForAuthenticatedUser$1() {
      return dispatch(subscribeForAuthenticatedUser(ownProps.authenticationSlice));
    },
    subscribeForUser: function subscribeForUser$1(database, id, onFetchDone) {
      return dispatch(subscribeForUser(database, id, ownProps.usersSlice, onFetchDone));
    }
  };
};

var Authenticate$1 = reactRedux.connect(null, mapDispatchToProps)(Authenticate);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

var signIn = toolkit.createAsyncThunk('authentication/signIn', function (user) {
  try {
    return Promise.resolve(firebase.auth().signInWithEmailAndPassword(user.email, user.password)).then(function (userCredential) {
      return {
        firebaseUser: userCredential.user,
        loading: false
      };
    });
  } catch (e) {
    return Promise.reject(e);
  }
});

var signOut = toolkit.createAsyncThunk('authentication/signOut', function () {
  try {
    return Promise.resolve(firebase.auth().signOut()).then(function () {
      return {
        firebaseUser: undefined,
        loading: false
      };
    });
  } catch (e) {
    return Promise.reject(e);
  }
});

var signUp = toolkit.createAsyncThunk('authentication/signUp', function (user) {
  try {
    return Promise.resolve(firebase.auth().createUserWithEmailAndPassword(user.email, user.password)).then(function (userCredential) {
      return {
        firebaseUser: userCredential.user,
        loading: false
      };
    });
  } catch (e) {
    return Promise.reject(e);
  }
});

var initialState = Object.freeze({
  firebaseUser: undefined,
  loading: true
});

var replaceAuthenticationState = function replaceAuthenticationState(state, action) {
  state.loading = action.payload.loading;
  state.firebaseUser = action.payload.firebaseUser;
};

function createAuthenticationSlice(reducers, _extraReducers) {
  return toolkit.createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: _extends({
      setFirebaseUser: function setFirebaseUser(state, action) {
        state.firebaseUser = action.payload;
      },
      setLoadingFirebaseData: function setLoadingFirebaseData(state, action) {
        state.loading = action.payload;
      },
      setAuthenticationState: replaceAuthenticationState
    }, reducers),
    extraReducers: function extraReducers(builder) {
      builder.addCase(signIn.fulfilled, replaceAuthenticationState);
      builder.addCase(signOut.fulfilled, replaceAuthenticationState);
      builder.addCase(signUp.fulfilled, replaceAuthenticationState);

      if (_extraReducers != null) {
        var keys = Object.keys(_extraReducers);

        if (keys.length > 0) {
          for (var _iterator = _createForOfIteratorHelperLoose(keys), _step; !(_step = _iterator()).done;) {
            var reducerKey = _step.value;
            var data = _extraReducers[reducerKey];
            builder.addCase(data.fullfilled, data.callback);
          }
        }
      }
    }
  });
}

var authSlice = createAuthenticationSlice();
authSlice.actions.setLoadingFirebaseData(false);
function Firebase(props) {
  var _useState = react.useState(false),
      firebaseReady = _useState[0],
      setFirebaseReady = _useState[1];

  var firebaseConfig = props.firebaseConfig;
  react.useEffect(function () {
    firebase.initializeApp(firebaseConfig);
    setFirebaseReady(true);
  }, [firebaseConfig]);
  return firebaseReady ? props.children : props.loadingComponent;
}

var initialState$1 = Object.freeze({
  values: new Map()
});
function createUsersSlice(reducers, _extraReducers) {
  return toolkit.createSlice({
    name: 'users',
    initialState: initialState$1,
    reducers: _extends({
      setUser: function setUser(state, action) {
        state.values.set(action.payload.id(), action.payload);
      }
    }, reducers),
    extraReducers: function extraReducers(builder) {
      if (_extraReducers != null) {
        var keys = Object.keys(_extraReducers);

        if (keys.length > 0) {
          for (var _iterator = _createForOfIteratorHelperLoose(keys), _step; !(_step = _iterator()).done;) {
            var reducerKey = _step.value;
            var data = _extraReducers[reducerKey];
            builder.addCase(data.fullfilled, data.callback);
          }
        }
      }
    }
  });
}

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

exports.Authenticate = Authenticate$1;
exports.Firebase = Firebase;
exports.createAuthenticationSlice = createAuthenticationSlice;
exports.createUser = createUser;
exports.createUsersSlice = createUsersSlice;
exports.isAuthenticationState = isAuthenticationState;
exports.isMinimalExpectedReduxState = isMinimalExpectedReduxState;
exports.isUsersState = isUsersState;
exports.signIn = signIn;
exports.signOut = signOut;
exports.signUp = signUp;
exports.subscribeForAuthenticatedUser = subscribeForAuthenticatedUser;
exports.useAuthenticationState = useAuthenticationState;
exports.useCurrentUser = useCurrentUser;
//# sourceMappingURL=index.js.map
