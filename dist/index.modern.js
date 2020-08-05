import { useState, useEffect } from 'react';
import { atom, selector, useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { auth, initializeApp } from 'firebase/app';
import 'firebase/auth';

var authenticationAtom = atom({
  key: 'authenticationAtom',
  "default": {
    firebaseUser: undefined,
    loading: true
  }
});

var usersAtom = atom({
  key: 'usersAtom',
  "default": new Map()
});

var currentUserSelector = selector({
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
  return auth().onAuthStateChanged(function (user) {
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
  var _useRecoilState = useRecoilState(authenticationAtom),
      authenticationState = _useRecoilState[0],
      setAuthenticationState = _useRecoilState[1];

  var setUsers = useSetRecoilState(usersAtom);
  var currentUser = useRecoilValue(currentUserSelector);

  var _useState = useState(true),
      loadingUserFromDatabase = _useState[0],
      setLoadingUserFromDatabase = _useState[1];

  var database = props.database,
      loadingComponent = props.loadingComponent,
      authenticationComponent = props.authenticationComponent,
      userNotAvailableComponent = props.userNotAvailableComponent,
      children = props.children;
  useEffect(function () {
    var unsubscribe = subscribeForAuthenticatedUser(function (authState) {
      setAuthenticationState(authState);
    });
    return function () {
      unsubscribe();
    };
  }, [setAuthenticationState]);
  useEffect(function () {
    var unsubscribe;

    if (authenticationState.firebaseUser != null) {
      unsubscribe = subscribeForUser(database, authenticationState.firebaseUser.uid, function (document) {
        if (document != null) {
          setUsers(function (oldUsers) {
            return oldUsers.set(document.id(), document);
          });
        }

        setLoadingUserFromDatabase(false);
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
    if (loadingUserFromDatabase && currentUser == null) {
      return loadingComponent;
    } else {
      if (currentUser == null) {
        return userNotAvailableComponent;
      } else {
        return children;
      }
    }
  }
}

function FirebaseInit(props) {
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

var signIn = function signIn(email, password) {
  try {
    return Promise.resolve(auth().signInWithEmailAndPassword(email, password)).then(function (userCredential) {
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
    return Promise.resolve(auth().signOut()).then(function () {
      return {
        firebaseUser: undefined,
        loading: false
      };
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var signUp = function signUp(email, password) {
  try {
    return Promise.resolve(auth().createUserWithEmailAndPassword(email, password)).then(function (userCredential) {
      return {
        firebaseUser: userCredential.user,
        loading: false
      };
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

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

export { Authenticate, FirebaseInit, authenticationAtom, createUser, currentUserSelector, isAuthenticationState, isMinimalExpectedDatabase, isMinimalExpectedReduxState, isMinimalUserData, isUsersState, signIn, signOut, signUp, subscribeForAuthenticatedUser, usersAtom };
//# sourceMappingURL=index.modern.js.map
