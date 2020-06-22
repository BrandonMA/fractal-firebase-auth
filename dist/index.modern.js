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

function t(t){for(var n=arguments.length,r=Array(n>1?n-1:0),e=1;e<n;e++)r[e-1]=arguments[e];if("production"!==process.env.NODE_ENV){var i=Q[t],o=i?"function"==typeof i?i.apply(null,r):i:"unknown error nr: "+t;throw Error("[Immer] "+o)}throw Error("[Immer] minified error nr: "+t+(r.length?" "+r.join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function n(t){return !!t&&!!t[H]}function r(t){return !!t&&(function(t){if(!t||"object"!=typeof t)return !1;var n=Object.getPrototypeOf(t);return !n||n===Object.prototype}(t)||Array.isArray(t)||!!t[B]||!!t.constructor[B]||s(t)||v(t))}function i(t,n,r){void 0===r&&(r=!1),0===o(t)?(r?Object.keys:V)(t).forEach((function(e){r&&"symbol"==typeof e||n(e,t[e],t);})):t.forEach((function(r,e){return n(e,r,t)}));}function o(t){var n=t[H];return n?n.i>3?n.i-4:n.i:Array.isArray(t)?1:s(t)?2:v(t)?3:0}function u(t,n){return 2===o(t)?t.has(n):Object.prototype.hasOwnProperty.call(t,n)}function a(t,n){return 2===o(t)?t.get(n):t[n]}function f(t,n,r){var e=o(t);2===e?t.set(n,r):3===e?(t.delete(n),t.add(r)):t[n]=r;}function c(t,n){return t===n?0!==t||1/t==1/n:t!=t&&n!=n}function s(t){return U&&t instanceof Map}function v(t){return W&&t instanceof Set}function p(t){return t.o||t.t}function l(t){if(Array.isArray(t))return t.slice();var n=Y(t);delete n[H];for(var r=V(n),e=0;e<r.length;e++){var i=r[e],o=n[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(n[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:t[i]});}return Object.create(Object.getPrototypeOf(t),n)}function d(t,e){Object.isFrozen(t)||n(t)||!r(t)||(o(t)>1&&(t.set=t.add=t.clear=t.delete=h),Object.freeze(t),e&&i(t,(function(t,n){return d(n,!0)}),!0));}function h(){t(2);}function b(n){var r=Z[n];return r||t("production"!==process.env.NODE_ENV?18:19,n),r}function y(t,n){Z[t]=n;}function m(){return "production"===process.env.NODE_ENV||$||t(0),$}function _(t,n){n&&(b("Patches"),t.u=[],t.s=[],t.v=n);}function j(t){O(t),t.p.forEach(w),t.p=null;}function O(t){t===$&&($=t.l);}function g(t){return $={p:[],l:$,h:t,m:!0,_:0}}function w(t){var n=t[H];0===n.i||1===n.i?n.j():n.O=!0;}function S(n,e){e._=e.p.length;var i=e.p[0],o=void 0!==n&&n!==i;return e.h.g||b("ES5").S(e,n,o),o?(i[H].P&&(j(e),t(4)),r(n)&&(n=P(e,n),e.l||A(e,n)),e.u&&b("Patches").M(i[H],n,e.u,e.s)):n=P(e,i,[]),j(e),e.u&&e.v(e.u,e.s),n!==q?n:void 0}function P(t,n,r){if(null==(e=n)||"object"!=typeof e||Object.isFrozen(e))return n;var e,o=n[H];if(!o)return i(n,(function(e,i){return M(t,o,n,e,i,r)}),!0),n;if(o.A!==t)return n;if(!o.P)return A(t,o.t,!0),o.t;if(!o.I){o.I=!0,o.A._--;var u=4===o.i||5===o.i?o.o=l(o.k):o.o;i(u,(function(n,e){return M(t,o,u,n,e,r)})),A(t,u,!1),r&&t.u&&b("Patches").R(o,r,t.u,t.s);}return o.o}function M(e,i,o,a,c,s){if("production"!==process.env.NODE_ENV&&c===o&&t(5),n(c)){var v=P(e,c,s&&i&&3!==i.i&&!u(i.D,a)?s.concat(a):void 0);if(f(o,a,v),!n(v))return;e.m=!1;}if(r(c)&&!Object.isFrozen(c)){if(!e.h.N&&e._<1)return;P(e,c),i&&i.A.l||A(e,c);}}function A(t,n,r){void 0===r&&(r=!1),t.h.N&&t.m&&d(n,r);}function x(t,n){var r=t[H];return (r?p(r):t)[n]}function z(t){t.P||(t.P=!0,t.l&&z(t.l));}function I(t){t.o||(t.o=l(t.t));}function E(t,n,r){var e=s(n)?b("MapSet").T(n,r):v(n)?b("MapSet").F(n,r):t.g?function(t,n){var r=Array.isArray(t),e={i:r?1:0,A:n?n.A:m(),P:!1,I:!1,D:{},l:n,t:t,k:null,o:null,j:null,C:!1},i=e,o=tt;r&&(i=[e],o=nt);var u=Proxy.revocable(i,o),a=u.revoke,f=u.proxy;return e.k=f,e.j=a,f}(n,r):b("ES5").J(n,r);return (r?r.A:m()).p.push(e),e}function k(e){return n(e)||t(22,e),function t(n){if(!r(n))return n;var e,u=n[H],c=o(n);if(u){if(!u.P&&(u.i<4||!b("ES5").K(u)))return u.t;u.I=!0,e=R(n,c),u.I=!1;}else e=R(n,c);return i(e,(function(n,r){u&&a(u.t,n)===r||f(e,n,t(r));})),3===c?new Set(e):e}(e)}function R(t,n){switch(n){case 2:return new Map(t);case 3:return Array.from(t)}return l(t)}function T(){function n(t,n){function r(){this.constructor=t;}u(t,n),t.prototype=(r.prototype=n.prototype,new r);}function e(t){t.o||(t.D=new Map,t.o=new Map(t.t));}function i(t){t.o||(t.o=new Set,t.t.forEach((function(n){if(r(n)){var e=E(t.A.h,n,t);t.p.set(n,e),t.o.add(e);}else t.o.add(n);})));}function o(n){n.O&&t(3,JSON.stringify(p(n)));}var u=function(t,n){return (u=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n;}||function(t,n){for(var r in n)n.hasOwnProperty(r)&&(t[r]=n[r]);})(t,n)},a=function(){function t(t,n){return this[H]={i:2,l:n,A:n?n.A:m(),P:!1,I:!1,o:void 0,D:void 0,t:t,k:this,C:!1,O:!1},this}n(t,Map);var i=t.prototype;return Object.defineProperty(i,"size",{get:function(){return p(this[H]).size}}),i.has=function(t){return p(this[H]).has(t)},i.set=function(t,n){var r=this[H];return o(r),p(r).get(t)!==n&&(e(r),z(r),r.D.set(t,!0),r.o.set(t,n),r.D.set(t,!0)),this},i.delete=function(t){if(!this.has(t))return !1;var n=this[H];return o(n),e(n),z(n),n.D.set(t,!1),n.o.delete(t),!0},i.clear=function(){var t=this[H];return o(t),e(t),z(t),t.D=new Map,t.o.clear()},i.forEach=function(t,n){var r=this;p(this[H]).forEach((function(e,i){t.call(n,r.get(i),i,r);}));},i.get=function(t){var n=this[H];o(n);var i=p(n).get(t);if(n.I||!r(i))return i;if(i!==n.t.get(t))return i;var u=E(n.A.h,i,n);return e(n),n.o.set(t,u),u},i.keys=function(){return p(this[H]).keys()},i.values=function(){var t,n=this,r=this.keys();return (t={})[L]=function(){return n.values()},t.next=function(){var t=r.next();return t.done?t:{done:!1,value:n.get(t.value)}},t},i.entries=function(){var t,n=this,r=this.keys();return (t={})[L]=function(){return n.entries()},t.next=function(){var t=r.next();if(t.done)return t;var e=n.get(t.value);return {done:!1,value:[t.value,e]}},t},i[L]=function(){return this.entries()},t}(),f=function(){function t(t,n){return this[H]={i:3,l:n,A:n?n.A:m(),P:!1,I:!1,o:void 0,t:t,k:this,p:new Map,O:!1,C:!1},this}n(t,Set);var r=t.prototype;return Object.defineProperty(r,"size",{get:function(){return p(this[H]).size}}),r.has=function(t){var n=this[H];return o(n),n.o?!!n.o.has(t)||!(!n.p.has(t)||!n.o.has(n.p.get(t))):n.t.has(t)},r.add=function(t){var n=this[H];return o(n),this.has(t)||(i(n),z(n),n.o.add(t)),this},r.delete=function(t){if(!this.has(t))return !1;var n=this[H];return o(n),i(n),z(n),n.o.delete(t)||!!n.p.has(t)&&n.o.delete(n.p.get(t))},r.clear=function(){var t=this[H];return o(t),i(t),z(t),t.o.clear()},r.values=function(){var t=this[H];return o(t),i(t),t.o.values()},r.entries=function(){var t=this[H];return o(t),i(t),t.o.entries()},r.keys=function(){return this.values()},r[L]=function(){return this.values()},r.forEach=function(t,n){for(var r=this.values(),e=r.next();!e.done;)t.call(n,e.value,e.value,this),e=r.next();},t}();y("MapSet",{T:function(t,n){return new a(t,n)},F:function(t,n){return new f(t,n)}});}var K,$,G="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),U="undefined"!=typeof Map,W="undefined"!=typeof Set,X="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,q=G?Symbol("immer-nothing"):((K={})["immer-nothing"]=!0,K),B=G?Symbol("immer-draftable"):"__$immer_draftable",H=G?Symbol("immer-state"):"__$immer_state",L="undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator",Q={0:"Illegal state",1:"Immer drafts cannot have computed properties",2:"This object has been frozen and should not be mutated",3:function(t){return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+t},4:"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",5:"Immer forbids circular references",6:"The first or second argument to `produce` must be a function",7:"The third argument to `produce` must be a function or undefined",8:"First argument to `createDraft` must be a plain object, an array, or an immerable object",9:"First argument to `finishDraft` must be a draft returned by `createDraft`",10:"The given draft is already finalized",11:"Object.defineProperty() cannot be used on an Immer draft",12:"Object.setPrototypeOf() cannot be used on an Immer draft",13:"Immer only supports deleting array indices",14:"Immer only supports setting array indices and the 'length' property",15:function(t){return "Cannot apply patch, path doesn't resolve: "+t},16:'Sets cannot have "replace" patches.',17:function(t){return "Unsupported patch operation: "+t},18:function(t){return "The plugin for '"+t+"' has not been loaded into Immer. To enable the plugin, import and call `enable"+t+"()` when initializing your application."},19:"plugin not loaded",20:"Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",21:function(t){return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '"+t+"'"},22:function(t){return "'current' expects a draft, got: "+t},23:function(t){return "'original' expects a draft, got: "+t}},V="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:Object.getOwnPropertyNames,Y=Object.getOwnPropertyDescriptors||function(t){var n={};return V(t).forEach((function(r){n[r]=Object.getOwnPropertyDescriptor(t,r);})),n},Z={},tt={get:function(t,n){if(n===H)return t;var e=p(t);if(!u(e,n))return function(t,n,r){if(r in n)for(var e=Object.getPrototypeOf(n);e;){var i,o=Object.getOwnPropertyDescriptor(e,r);if(o)return "value"in o?o.value:null===(i=o.get)||void 0===i?void 0:i.call(t.k);e=Object.getPrototypeOf(e);}}(t,e,n);var i=e[n];return t.I||!r(i)?i:i===x(t.t,n)?(I(t),t.o[n]=E(t.A.h,i,t)):i},has:function(t,n){return n in p(t)},ownKeys:function(t){return Reflect.ownKeys(p(t))},set:function(t,n,r){if(t.D[n]=!0,!t.P){if(c(r,x(p(t),n))&&void 0!==r)return !0;I(t),z(t);}return t.o[n]=r,!0},deleteProperty:function(t,n){return void 0!==x(t.t,n)||n in t.t?(t.D[n]=!1,I(t),z(t)):delete t.D[n],t.o&&delete t.o[n],!0},getOwnPropertyDescriptor:function(t,n){var r=p(t),e=Reflect.getOwnPropertyDescriptor(r,n);return e?{writable:!0,configurable:1!==t.i||"length"!==n,enumerable:e.enumerable,value:r[n]}:e},defineProperty:function(){t(11);},getPrototypeOf:function(t){return Object.getPrototypeOf(t.t)},setPrototypeOf:function(){t(12);}},nt={};i(tt,(function(t,n){nt[t]=function(){return arguments[0]=arguments[0][0],n.apply(this,arguments)};})),nt.deleteProperty=function(n,r){return "production"!==process.env.NODE_ENV&&isNaN(parseInt(r))&&t(13),tt.deleteProperty.call(this,n[0],r)},nt.set=function(n,r,e){return "production"!==process.env.NODE_ENV&&"length"!==r&&isNaN(parseInt(r))&&t(14),tt.set.call(this,n[0],r,e,n[0])};var rt=function(){function e(t){this.g=X,this.N="production"!==process.env.NODE_ENV,"boolean"==typeof(null==t?void 0:t.useProxies)&&this.setUseProxies(t.useProxies),"boolean"==typeof(null==t?void 0:t.autoFreeze)&&this.setAutoFreeze(t.autoFreeze),this.produce=this.produce.bind(this),this.produceWithPatches=this.produceWithPatches.bind(this);}var i=e.prototype;return i.produce=function(n,e,i){if("function"==typeof n&&"function"!=typeof e){var o=e;e=n;var u=this;return function(t){var n=this;void 0===t&&(t=o);for(var r=arguments.length,i=Array(r>1?r-1:0),a=1;a<r;a++)i[a-1]=arguments[a];return u.produce(t,(function(t){var r;return (r=e).call.apply(r,[n,t].concat(i))}))}}var a;if("function"!=typeof e&&t(6),void 0!==i&&"function"!=typeof i&&t(7),r(n)){var f=g(this),c=E(this,n,void 0),s=!0;try{a=e(c),s=!1;}finally{s?j(f):O(f);}return "undefined"!=typeof Promise&&a instanceof Promise?a.then((function(t){return _(f,i),S(t,f)}),(function(t){throw j(f),t})):(_(f,i),S(a,f))}if(!n||"object"!=typeof n){if((a=e(n))===q)return;return void 0===a&&(a=n),this.N&&d(a,!0),a}t(21,n);},i.produceWithPatches=function(t,n){var r,e,i=this;return "function"==typeof t?function(n){for(var r=arguments.length,e=Array(r>1?r-1:0),o=1;o<r;o++)e[o-1]=arguments[o];return i.produceWithPatches(n,(function(n){return t.apply(void 0,[n].concat(e))}))}:[this.produce(t,n,(function(t,n){r=t,e=n;})),r,e]},i.createDraft=function(e){r(e)||t(8),n(e)&&(e=k(e));var i=g(this),o=E(this,e,void 0);return o[H].C=!0,O(i),o},i.finishDraft=function(n,r){var e=n&&n[H];"production"!==process.env.NODE_ENV&&(e&&e.C||t(9),e.I&&t(10));var i=e.A;return _(i,r),S(void 0,i)},i.setAutoFreeze=function(t){this.N=t;},i.setUseProxies=function(n){n&&!X&&t(20),this.g=n;},i.applyPatches=function(t,r){var e;for(e=r.length-1;e>=0;e--){var i=r[e];if(0===i.path.length&&"replace"===i.op){t=i.value;break}}var o=b("Patches").$;return n(t)?o(t,r):this.produce(t,(function(t){return o(t,r.slice(e+1))}))},e}(),et=new rt,ot=et.produceWithPatches.bind(et),ut=et.setAutoFreeze.bind(et),at=et.setUseProxies.bind(et),ft=et.applyPatches.bind(et),ct=et.createDraft.bind(et),st=et.finishDraft.bind(et);//# sourceMappingURL=immer.esm.js.map

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

T();

export { Authenticate, Firebase, authenticationSlice, createUser, createUsersSlice, isAuthenticationState, isMinimalExpectedReduxState, isUsersState, signIn, signOut, signUp, subscribeForAuthenticatedUser, useAuthenticationState, useCreateUser, useCurrentUser, useSignIn, useSignOut, useSignUp, useSubscribeForAuthenticatedUser, useSubscribeForUser, useUpdateUser };
//# sourceMappingURL=index.modern.js.map
