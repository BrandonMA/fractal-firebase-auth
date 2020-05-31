var firebase = require('firebase/app');
var react = require('react');
var toolkit = require('@reduxjs/toolkit');
require('firebase/auth');

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

var initialState = {
  firebaseUser: undefined,
  loading: true
};
function createAuthenticationSlice(_extraReducers) {
  return toolkit.createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
      setLoadingFirebaseData: function setLoadingFirebaseData(state, action) {
        state.loading = action.payload;
      }
    },
    extraReducers: function extraReducers(builder) {
      var replaceAuthenticationState = function replaceAuthenticationState(state, action) {
      };

      builder.addCase(signIn.fulfilled, replaceAuthenticationState);
      builder.addCase(signOut.fulfilled, replaceAuthenticationState);
      builder.addCase(signUp.fulfilled, replaceAuthenticationState);

      if (_extraReducers != null) {
        var keys = Object.keys(_extraReducers);

        if (keys.length > 0) {
          for (var _iterator = _createForOfIteratorHelperLoose(keys), _step; !(_step = _iterator()).done;) {
            var reducerKey = _step.value;
            builder.addCase(reducerKey, _extraReducers[reducerKey]);
          }
        }
      }
    }
  });
}

var authSlice = createAuthenticationSlice();
authSlice.actions.setLoadingFirebaseData(false);
function Firebase(props) {
  console.log(props);

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

exports.Firebase = Firebase;
//# sourceMappingURL=index.js.map
