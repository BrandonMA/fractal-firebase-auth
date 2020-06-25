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

function isMinimalExpectedDatabase(value) {
  var casted = value;
  return casted.collections.users != null;
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

function useUpdateUser(database, usersSlice) {
  var dispatch = useDispatch();
  return useCallback(function (data) {
    return dispatch(updateUser(database, data, usersSlice));
  }, [dispatch, database, usersSlice]);
}

function useCreateUser(database, data, usersSlice) {
  var dispatch = useDispatch();
  return useCallback(function () {
    return dispatch(createUser(database, data, usersSlice));
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

function n(n){for(var t=arguments.length,r=Array(t>1?t-1:0),e=1;e<t;e++)r[e-1]=arguments[e];if("production"!==process.env.NODE_ENV){var i=V[n],o=i?"function"==typeof i?i.apply(null,r):i:"unknown error nr: "+n;throw Error("[Immer] "+o)}throw Error("[Immer] minified error nr: "+n+(r.length?" "+r.join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function t(n){return !!n&&!!n[L]}function r(n){return !!n&&(function(n){if(!n||"object"!=typeof n)return !1;var t=Object.getPrototypeOf(n);return !t||t===Object.prototype}(n)||Array.isArray(n)||!!n[H]||!!n.constructor[H]||s(n)||v(n))}function i(n,t,r){void 0===r&&(r=!1),0===o(n)?(r?Object.keys:Y)(n).forEach((function(e){r&&"symbol"==typeof e||t(e,n[e],n);})):n.forEach((function(r,e){return t(e,r,n)}));}function o(n){var t=n[L];return t?t.i>3?t.i-4:t.i:Array.isArray(n)?1:s(n)?2:v(n)?3:0}function u(n,t){return 2===o(n)?n.has(t):Object.prototype.hasOwnProperty.call(n,t)}function a(n,t){return 2===o(n)?n.get(t):n[t]}function f(n,t,r){var e=o(n);2===e?n.set(t,r):3===e?(n.delete(t),n.add(r)):n[t]=r;}function c(n,t){return n===t?0!==n||1/n==1/t:n!=n&&t!=t}function s(n){return W&&n instanceof Map}function v(n){return X&&n instanceof Set}function p(n){return n.o||n.t}function l(n){if(Array.isArray(n))return n.slice();var t=Z(n);delete t[L];for(var r=Y(t),e=0;e<r.length;e++){var i=r[e],o=t[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(t[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:n[i]});}return Object.create(Object.getPrototypeOf(n),t)}function d(n,e){b(n)||t(n)||!r(n)||(o(n)>1&&(n.set=n.add=n.clear=n.delete=h),Object.freeze(n),e&&i(n,(function(n,t){return d(t,!0)}),!0));}function h(){n(2);}function b(n){return null==n||"object"!=typeof n||Object.isFrozen(n)}function y(t){var r=nn[t];return r||n("production"!==process.env.NODE_ENV?18:19,t),r}function m(n,t){nn[n]=t;}function _(){return "production"===process.env.NODE_ENV||G||n(0),G}function j(n,t){t&&(y("Patches"),n.u=[],n.s=[],n.v=t);}function g(n){O(n),n.p.forEach(S),n.p=null;}function O(n){n===G&&(G=n.l);}function w(n){return G={p:[],l:G,h:n,m:!0,_:0}}function S(n){var t=n[L];0===t.i||1===t.i?t.j():t.g=!0;}function P(t,e){e._=e.p.length;var i=e.p[0],o=void 0!==t&&t!==i;return e.h.O||y("ES5").S(e,t,o),o?(i[L].P&&(g(e),n(4)),r(t)&&(t=M(e,t),e.l||x(e,t)),e.u&&y("Patches").M(i[L],t,e.u,e.s)):t=M(e,i,[]),g(e),e.u&&e.v(e.u,e.s),t!==B?t:void 0}function M(n,t,r){if(b(t))return t;var e=t[L];if(!e)return i(t,(function(i,o){return A(n,e,t,i,o,r)}),!0),t;if(e.A!==n)return t;if(!e.P)return x(n,e.t,!0),e.t;if(!e.I){e.I=!0,e.A._--;var o=4===e.i||5===e.i?e.o=l(e.k):e.o;i(o,(function(t,i){return A(n,e,o,t,i,r)})),x(n,o,!1),r&&n.u&&y("Patches").R(e,r,n.u,n.s);}return e.o}function A(e,i,o,a,c,s){if("production"!==process.env.NODE_ENV&&c===o&&n(5),t(c)){var v=M(e,c,s&&i&&3!==i.i&&!u(i.D,a)?s.concat(a):void 0);if(f(o,a,v),!t(v))return;e.m=!1;}if(r(c)&&!b(c)){if(!e.h.N&&e._<1)return;M(e,c),i&&i.A.l||x(e,c);}}function x(n,t,r){void 0===r&&(r=!1),n.h.N&&n.m&&d(t,r);}function z(n,t){var r=n[L];return (r?p(r):n)[t]}function I(n){n.P||(n.P=!0,n.l&&I(n.l));}function E(n){n.o||(n.o=l(n.t));}function k(n,t,r){var e=s(t)?y("MapSet").T(t,r):v(t)?y("MapSet").F(t,r):n.O?function(n,t){var r=Array.isArray(n),e={i:r?1:0,A:t?t.A:_(),P:!1,I:!1,D:{},l:t,t:n,k:null,o:null,j:null,C:!1},i=e,o=tn;r&&(i=[e],o=rn);var u=Proxy.revocable(i,o),a=u.revoke,f=u.proxy;return e.k=f,e.j=a,f}(t,r):y("ES5").J(t,r);return (r?r.A:_()).p.push(e),e}function R(e){return t(e)||n(22,e),function n(t){if(!r(t))return t;var e,u=t[L],c=o(t);if(u){if(!u.P&&(u.i<4||!y("ES5").K(u)))return u.t;u.I=!0,e=D(t,c),u.I=!1;}else e=D(t,c);return i(e,(function(t,r){u&&a(u.t,t)===r||f(e,t,n(r));})),3===c?new Set(e):e}(e)}function D(n,t){switch(t){case 2:return new Map(n);case 3:return Array.from(n)}return l(n)}function F(){function t(n,t){function r(){this.constructor=n;}u(n,t),n.prototype=(r.prototype=t.prototype,new r);}function e(n){n.o||(n.D=new Map,n.o=new Map(n.t));}function i(n){n.o||(n.o=new Set,n.t.forEach((function(t){if(r(t)){var e=k(n.A.h,t,n);n.p.set(t,e),n.o.add(e);}else n.o.add(t);})));}function o(t){t.g&&n(3,JSON.stringify(p(t)));}var u=function(n,t){return (u=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t;}||function(n,t){for(var r in t)t.hasOwnProperty(r)&&(n[r]=t[r]);})(n,t)},a=function(){function n(n,t){return this[L]={i:2,l:t,A:t?t.A:_(),P:!1,I:!1,o:void 0,D:void 0,t:n,k:this,C:!1,g:!1},this}t(n,Map);var i=n.prototype;return Object.defineProperty(i,"size",{get:function(){return p(this[L]).size}}),i.has=function(n){return p(this[L]).has(n)},i.set=function(n,t){var r=this[L];return o(r),p(r).has(n)&&p(r).get(n)===t||(e(r),I(r),r.D.set(n,!0),r.o.set(n,t),r.D.set(n,!0)),this},i.delete=function(n){if(!this.has(n))return !1;var t=this[L];return o(t),e(t),I(t),t.D.set(n,!1),t.o.delete(n),!0},i.clear=function(){var n=this[L];return o(n),e(n),I(n),n.D=new Map,n.o.clear()},i.forEach=function(n,t){var r=this;p(this[L]).forEach((function(e,i){n.call(t,r.get(i),i,r);}));},i.get=function(n){var t=this[L];o(t);var i=p(t).get(n);if(t.I||!r(i))return i;if(i!==t.t.get(n))return i;var u=k(t.A.h,i,t);return e(t),t.o.set(n,u),u},i.keys=function(){return p(this[L]).keys()},i.values=function(){var n,t=this,r=this.keys();return (n={})[Q]=function(){return t.values()},n.next=function(){var n=r.next();return n.done?n:{done:!1,value:t.get(n.value)}},n},i.entries=function(){var n,t=this,r=this.keys();return (n={})[Q]=function(){return t.entries()},n.next=function(){var n=r.next();if(n.done)return n;var e=t.get(n.value);return {done:!1,value:[n.value,e]}},n},i[Q]=function(){return this.entries()},n}(),f=function(){function n(n,t){return this[L]={i:3,l:t,A:t?t.A:_(),P:!1,I:!1,o:void 0,t:n,k:this,p:new Map,g:!1,C:!1},this}t(n,Set);var r=n.prototype;return Object.defineProperty(r,"size",{get:function(){return p(this[L]).size}}),r.has=function(n){var t=this[L];return o(t),t.o?!!t.o.has(n)||!(!t.p.has(n)||!t.o.has(t.p.get(n))):t.t.has(n)},r.add=function(n){var t=this[L];return o(t),this.has(n)||(i(t),I(t),t.o.add(n)),this},r.delete=function(n){if(!this.has(n))return !1;var t=this[L];return o(t),i(t),I(t),t.o.delete(n)||!!t.p.has(n)&&t.o.delete(t.p.get(n))},r.clear=function(){var n=this[L];return o(n),i(n),I(n),n.o.clear()},r.values=function(){var n=this[L];return o(n),i(n),n.o.values()},r.entries=function(){var n=this[L];return o(n),i(n),n.o.entries()},r.keys=function(){return this.values()},r[Q]=function(){return this.values()},r.forEach=function(n,t){for(var r=this.values(),e=r.next();!e.done;)n.call(t,e.value,e.value,this),e=r.next();},n}();m("MapSet",{T:function(n,t){return new a(n,t)},F:function(n,t){return new f(n,t)}});}var $,G,U="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),W="undefined"!=typeof Map,X="undefined"!=typeof Set,q="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,B=U?Symbol("immer-nothing"):(($={})["immer-nothing"]=!0,$),H=U?Symbol("immer-draftable"):"__$immer_draftable",L=U?Symbol("immer-state"):"__$immer_state",Q="undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator",V={0:"Illegal state",1:"Immer drafts cannot have computed properties",2:"This object has been frozen and should not be mutated",3:function(n){return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+n},4:"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",5:"Immer forbids circular references",6:"The first or second argument to `produce` must be a function",7:"The third argument to `produce` must be a function or undefined",8:"First argument to `createDraft` must be a plain object, an array, or an immerable object",9:"First argument to `finishDraft` must be a draft returned by `createDraft`",10:"The given draft is already finalized",11:"Object.defineProperty() cannot be used on an Immer draft",12:"Object.setPrototypeOf() cannot be used on an Immer draft",13:"Immer only supports deleting array indices",14:"Immer only supports setting array indices and the 'length' property",15:function(n){return "Cannot apply patch, path doesn't resolve: "+n},16:'Sets cannot have "replace" patches.',17:function(n){return "Unsupported patch operation: "+n},18:function(n){return "The plugin for '"+n+"' has not been loaded into Immer. To enable the plugin, import and call `enable"+n+"()` when initializing your application."},19:"plugin not loaded",20:"Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",21:function(n){return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '"+n+"'"},22:function(n){return "'current' expects a draft, got: "+n},23:function(n){return "'original' expects a draft, got: "+n}},Y="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(n){return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))}:Object.getOwnPropertyNames,Z=Object.getOwnPropertyDescriptors||function(n){var t={};return Y(n).forEach((function(r){t[r]=Object.getOwnPropertyDescriptor(n,r);})),t},nn={},tn={get:function(n,t){if(t===L)return n;var e=p(n);if(!u(e,t))return function(n,t,r){if(r in t)for(var e=Object.getPrototypeOf(t);e;){var i,o=Object.getOwnPropertyDescriptor(e,r);if(o)return "value"in o?o.value:null===(i=o.get)||void 0===i?void 0:i.call(n.k);e=Object.getPrototypeOf(e);}}(n,e,t);var i=e[t];return n.I||!r(i)?i:i===z(n.t,t)?(E(n),n.o[t]=k(n.A.h,i,n)):i},has:function(n,t){return t in p(n)},ownKeys:function(n){return Reflect.ownKeys(p(n))},set:function(n,t,r){if(n.D[t]=!0,!n.P){if(c(r,z(p(n),t))&&void 0!==r)return !0;E(n),I(n);}return n.o[t]=r,!0},deleteProperty:function(n,t){return void 0!==z(n.t,t)||t in n.t?(n.D[t]=!1,E(n),I(n)):delete n.D[t],n.o&&delete n.o[t],!0},getOwnPropertyDescriptor:function(n,t){var r=p(n),e=Reflect.getOwnPropertyDescriptor(r,t);return e?{writable:!0,configurable:1!==n.i||"length"!==t,enumerable:e.enumerable,value:r[t]}:e},defineProperty:function(){n(11);},getPrototypeOf:function(n){return Object.getPrototypeOf(n.t)},setPrototypeOf:function(){n(12);}},rn={};i(tn,(function(n,t){rn[n]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)};})),rn.deleteProperty=function(t,r){return "production"!==process.env.NODE_ENV&&isNaN(parseInt(r))&&n(13),tn.deleteProperty.call(this,t[0],r)},rn.set=function(t,r,e){return "production"!==process.env.NODE_ENV&&"length"!==r&&isNaN(parseInt(r))&&n(14),tn.set.call(this,t[0],r,e,t[0])};var en=function(){function e(n){this.O=q,this.N="production"!==process.env.NODE_ENV,"boolean"==typeof(null==n?void 0:n.useProxies)&&this.setUseProxies(n.useProxies),"boolean"==typeof(null==n?void 0:n.autoFreeze)&&this.setAutoFreeze(n.autoFreeze),this.produce=this.produce.bind(this),this.produceWithPatches=this.produceWithPatches.bind(this);}var i=e.prototype;return i.produce=function(t,e,i){if("function"==typeof t&&"function"!=typeof e){var o=e;e=t;var u=this;return function(n){var t=this;void 0===n&&(n=o);for(var r=arguments.length,i=Array(r>1?r-1:0),a=1;a<r;a++)i[a-1]=arguments[a];return u.produce(n,(function(n){var r;return (r=e).call.apply(r,[t,n].concat(i))}))}}var a;if("function"!=typeof e&&n(6),void 0!==i&&"function"!=typeof i&&n(7),r(t)){var f=w(this),c=k(this,t,void 0),s=!0;try{a=e(c),s=!1;}finally{s?g(f):O(f);}return "undefined"!=typeof Promise&&a instanceof Promise?a.then((function(n){return j(f,i),P(n,f)}),(function(n){throw g(f),n})):(j(f,i),P(a,f))}if(!t||"object"!=typeof t){if((a=e(t))===B)return;return void 0===a&&(a=t),this.N&&d(a,!0),a}n(21,t);},i.produceWithPatches=function(n,t){var r,e,i=this;return "function"==typeof n?function(t){for(var r=arguments.length,e=Array(r>1?r-1:0),o=1;o<r;o++)e[o-1]=arguments[o];return i.produceWithPatches(t,(function(t){return n.apply(void 0,[t].concat(e))}))}:[this.produce(n,t,(function(n,t){r=n,e=t;})),r,e]},i.createDraft=function(e){r(e)||n(8),t(e)&&(e=R(e));var i=w(this),o=k(this,e,void 0);return o[L].C=!0,O(i),o},i.finishDraft=function(t,r){var e=t&&t[L];"production"!==process.env.NODE_ENV&&(e&&e.C||n(9),e.I&&n(10));var i=e.A;return j(i,r),P(void 0,i)},i.setAutoFreeze=function(n){this.N=n;},i.setUseProxies=function(t){t&&!q&&n(20),this.O=t;},i.applyPatches=function(n,r){var e;for(e=r.length-1;e>=0;e--){var i=r[e];if(0===i.path.length&&"replace"===i.op){n=i.value;break}}var o=y("Patches").$;return t(n)?o(n,r):this.produce(n,(function(n){return o(n,r.slice(e+1))}))},e}(),on=new en,an=on.produceWithPatches.bind(on),fn=on.setAutoFreeze.bind(on),cn=on.setUseProxies.bind(on),sn=on.applyPatches.bind(on),vn=on.createDraft.bind(on),pn=on.finishDraft.bind(on);//# sourceMappingURL=immer.esm.js.map

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

F();

export { Authenticate, Firebase, authenticationSlice, createUser, createUsersSlice, isAuthenticationState, isMinimalExpectedDatabase, isMinimalExpectedReduxState, isUsersState, signIn, signOut, signUp, subscribeForAuthenticatedUser, useAuthenticationState, useCreateUser, useCurrentUser, useSignIn, useSignOut, useSignUp, useSubscribeForAuthenticatedUser, useSubscribeForUser, useUpdateUser };
//# sourceMappingURL=index.modern.js.map
