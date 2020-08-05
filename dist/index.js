var react = require('react');
var recoil = require('recoil');
var firebase = require('firebase/app');
require('firebase/auth');

var authenticationAtom = recoil.atom({
  key: 'authenticationAtom',
  "default": {
    firebaseUser: undefined,
    loading: true
  }
});

var usersAtom = recoil.atom({
  key: 'usersAtom',
  "default": new Map()
});

var currentUserSelector = recoil.selector({
  key: 'currentUserSelector',
  get: function get(_ref) {
    var _get = _ref.get;

    var auth = _get(authenticationAtom);

    var users = _get(usersAtom);

    if (auth.firebaseUser != null) {
      return users.get(auth.firebaseUser.uid);
    }

    return undefined;
  }
});

function subscribeForAuthenticatedUser(onFetch) {
  return firebase.auth().onAuthStateChanged(function (user) {
    onFetch({
      firebaseUser: user,
      loading: false
    });
  }, function (error) {
    alert(error.message);
  });
}

function subscribeForUser(database, id, onFetchDone) {
  return database.collections.users.subscribeToDocument(id, function (newDocument) {
    if (onFetchDone) {
      onFetchDone(newDocument);
    }
  }, function (error) {
    alert(error.message);
  }, function () {
    if (onFetchDone) {
      onFetchDone();
    }
  });
}

function Authenticate(props) {
  var _useRecoilState = recoil.useRecoilState(authenticationAtom),
      authenticationState = _useRecoilState[0],
      setAuthenticationState = _useRecoilState[1];

  var setUsers = recoil.useSetRecoilState(usersAtom);
  var currentUser = recoil.useRecoilValue(currentUserSelector);

  var _useState = react.useState(false),
      listeningForUser = _useState[0],
      setListeningForUser = _useState[1];

  var database = props.database,
      loadingComponent = props.loadingComponent,
      authenticationComponent = props.authenticationComponent,
      userNotAvailableComponent = props.userNotAvailableComponent,
      children = props.children,
      errorComponet = props.errorComponet;
  react.useEffect(function () {
    var unsubscribe = subscribeForAuthenticatedUser(function (authState) {
      setAuthenticationState(authState);
    });
    return function () {
      unsubscribe();
    };
  }, [setAuthenticationState]);
  react.useEffect(function () {
    var unsubscribe;

    if (authenticationState.firebaseUser != null) {
      unsubscribe = subscribeForUser(database, authenticationState.firebaseUser.uid, function (document) {
        if (document != null) {
          setUsers(function (oldUsers) {
            return oldUsers.set(document.id(), document);
          });
        }

        setListeningForUser(true);
      });
    }

    return function () {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [authenticationState, database, setUsers]);

  if (authenticationState.firebaseUser === undefined && authenticationState.loading) {
    return loadingComponent;
  } else if (authenticationState.firebaseUser === null && authenticationState.loading === false) {
    return authenticationComponent;
  } else {
    if (listeningForUser) {
      if (currentUser == null) {
        return userNotAvailableComponent;
      } else {
        return children;
      }
    }

    return errorComponet;
  }
}

function FirebaseInit(props) {
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

var authenticationAtom$1 = recoil.atom({
  key: 'authenticationAtom',
  "default": {
    firebaseUser: undefined,
    loading: true
  }
});

var usersAtom$1 = recoil.atom({
  key: 'usersAtom',
  "default": new Map()
});

var currentUserSelector$1 = recoil.selector({
  key: 'currentUserSelector',
  get: function get(_ref) {
    var _get = _ref.get;

    var auth = _get(authenticationAtom$1);

    var users = _get(usersAtom$1);

    if (auth.firebaseUser != null) {
      return users.get(auth.firebaseUser.uid);
    }

    return undefined;
  }
});

var signIn = function signIn(email, password) {
  try {
    return Promise.resolve(firebase.auth().signInWithEmailAndPassword(email, password)).then(function (userCredential) {
      return {
        firebaseUser: userCredential.user,
        loading: false
      };
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var signOut = function signOut() {
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
};

var signUp = function signUp(user) {
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
};

function subscribeForAuthenticatedUser$1(onFetch) {
  return firebase.auth().onAuthStateChanged(function (user) {
    onFetch({
      firebaseUser: user,
      loading: false
    });
  }, function (error) {
    alert(error.message);
  });
}

var createUser = function createUser(database, data) {
  try {
    return Promise.resolve(database.collections.users.createDocument(data));
  } catch (e) {
    return Promise.reject(e);
  }
};

function isAuthenticationState(value) {
  var castedValue = value;
  return castedValue.loading != null;
}

function isMinimalExpectedReduxState(value) {
  var castedValue = value;
  return castedValue.authentication != null && isAuthenticationState(castedValue.authentication) && castedValue.users != null;
}

function isMinimalUserData(value) {
  var castedValue = value;
  return castedValue.email != null;
}

function isUsersState(value) {
  var casted = value;
  return casted.values != null;
}

function isMinimalExpectedDatabase(value) {
  var casted = value;
  return casted.collections.users != null;
}

exports.Authenticate = Authenticate;
exports.FirebaseInit = FirebaseInit;
exports.authenticationAtom = authenticationAtom$1;
exports.createUser = createUser;
exports.currentUserSelector = currentUserSelector$1;
exports.isAuthenticationState = isAuthenticationState;
exports.isMinimalExpectedDatabase = isMinimalExpectedDatabase;
exports.isMinimalExpectedReduxState = isMinimalExpectedReduxState;
exports.isMinimalUserData = isMinimalUserData;
exports.isUsersState = isUsersState;
exports.signIn = signIn;
exports.signOut = signOut;
exports.signUp = signUp;
exports.subscribeForAuthenticatedUser = subscribeForAuthenticatedUser$1;
exports.usersAtom = usersAtom$1;
//# sourceMappingURL=index.js.map
