import{useState as e,useEffect as n,useLayoutEffect as r}from"react";import{atom as t,selector as o,useRecoilState as i,useSetRecoilState as u,useRecoilValue as s}from"recoil";import c from"immer";import{auth as a,initializeApp as l}from"firebase/app";import"firebase/auth";function f(e){return c({firebaseUser:void 0,loading:!0},function(n){Object.assign(n,e)})}function m(e){return null!=e.loading}function d(e){return null!=e.email}function g(e){return null!=e.collections.users}var b=t({key:"authenticationAtom",default:f()}),h=t({key:"usersAtom",default:new Map}),p=o({key:"currentUserSelector",get:function(e){var n=e.get,r=n(b),t=n(h);if(null!=r.firebaseUser)return t.get(r.firebaseUser.uid)}});function v(e){return a().onAuthStateChanged(function(n){e(f({firebaseUser:n,loading:!1}))},function(e){alert(e.message)})}function P(e,n,r){return e.collections.users.subscribeToDocument(n,function(e){r&&r(e)},function(e){alert(e.message)},function(){r&&r()})}function U(r){var t=i(b),o=t[0],c=t[1],a=u(h),l=s(p),f=e(!0),m=f[0],d=f[1],g=r.database;return n(function(){var e=v(function(e){c(e)});return function(){e()}},[c]),n(function(){var e;return null!=o.firebaseUser&&(e=P(g,o.firebaseUser.uid,function(e){null!=e&&a(function(n){return n.set(e.id(),e)}),d(!1)})),function(){e&&e()}},[o,g,a]),void 0===o.firebaseUser&&o.loading?r.loadingComponent:null===o.firebaseUser&&!1===o.loading?r.authenticationComponent:m&&null==l?r.loadingComponent:null==l?r.userNotAvailableComponent:r.children}function y(n){var t=e(!1),o=t[0],i=t[1],u=n.firebaseConfig;return r(function(){l(u),i(!0)},[u]),o?n.children:n.loadingComponent}var C=function(e,n){try{return Promise.resolve(a().signInWithEmailAndPassword(e,n)).then(function(e){return f({firebaseUser:e.user,loading:!1})})}catch(e){return Promise.reject(e)}},j=function(){try{return Promise.resolve(a().signOut()).then(function(){return f({loading:!1})})}catch(e){return Promise.reject(e)}},A=function(e,n){try{return Promise.resolve(a().createUserWithEmailAndPassword(e,n)).then(function(e){return f({firebaseUser:e.user,loading:!1})})}catch(e){return Promise.reject(e)}},k=function(e,n){try{return Promise.resolve(e.collections.users.createDocument(n))}catch(e){return Promise.reject(e)}},w=function(e,n){try{return Promise.resolve(e.collections.users.updateDocument(n))}catch(e){return Promise.reject(e)}};export{U as Authenticate,y as FirebaseInit,b as authenticationAtom,f as createAuthenticationState,k as createUser,p as currentUserSelector,m as isAuthenticationState,g as isMinimalExpectedDatabase,d as isMinimalUserData,C as signIn,j as signOut,A as signUp,v as subscribeForAuthenticatedUser,P as subscribeForUser,w as updateUser,h as usersAtom};
//# sourceMappingURL=index.modern.js.map
