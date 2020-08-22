!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react"),require("recoil"),require("immer"),require("firebase/app"),require("firebase/auth")):"function"==typeof define&&define.amd?define(["exports","react","recoil","immer","firebase/app","firebase/auth"],t):t((e=e||self).reactFirebaseAuth={},e.react,e.recoil,e.immer,e.firebase)}(this,function(e,t,n,r,i){function u(e){return r({firebaseUser:void 0,loading:!0},function(t){Object.assign(t,e)})}r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r;var o=n.atom({key:"authenticationAtom",default:u(),dangerouslyAllowMutability:!0}),a=n.atom({key:"usersAtom",default:new Map});function s(){var e=n.useRecoilValue(a),t=n.useRecoilValue(o);if(null!=t.firebaseUser&&e.has(t.firebaseUser.uid))return e.get(t.firebaseUser.uid)}function c(e){return i.auth().onAuthStateChanged(function(t){e(u({firebaseUser:t,loading:!1}))},function(e){alert(e.message)})}function l(e,t,n){return e.collections.users.subscribeToDocument(t,function(e){n&&n(e)},function(e){alert(e.message)},function(){n&&n()})}e.Authenticate=function(e){var r=n.useRecoilState(o),i=r[0],u=r[1],f=n.useSetRecoilState(a),d=s(),m=t.useState(!0),b=m[0],h=m[1],p=e.database;return t.useEffect(function(){var e=c(function(e){u(e)});return function(){e()}},[u]),t.useEffect(function(){var e;return null!=i.firebaseUser&&(e=l(p,i.firebaseUser.uid,function(e){null!=e&&f(function(t){return t.set(e.id(),e)}),h(!1)})),function(){e&&e()}},[i,p,f]),void 0===i.firebaseUser&&i.loading?e.loadingComponent:null===i.firebaseUser&&!1===i.loading?e.authenticationComponent:b&&null==d?e.loadingComponent:null==d?e.userNotAvailableComponent:e.children},e.FirebaseInit=function(e){var n=t.useState(!1),r=n[0],u=n[1],o=e.firebaseConfig;return t.useLayoutEffect(function(){i.initializeApp(o),u(!0)},[o]),r?e.children:e.loadingComponent},e.authenticationAtom=o,e.createAuthenticationState=u,e.createUser=function(e,t){try{return Promise.resolve(e.collections.users.createDocument(t))}catch(e){return Promise.reject(e)}},e.isAuthenticationState=function(e){return null!=e.loading},e.isMinimalExpectedDatabase=function(e){return null!=e.collections.users},e.isMinimalUserData=function(e){return null!=e.email},e.signIn=function(e,t){try{return Promise.resolve(i.auth().signInWithEmailAndPassword(e,t)).then(function(e){return u({firebaseUser:e.user,loading:!1})})}catch(e){return Promise.reject(e)}},e.signOut=function(){try{return Promise.resolve(i.auth().signOut()).then(function(){return u({loading:!1})})}catch(e){return Promise.reject(e)}},e.signUp=function(e,t){try{return Promise.resolve(i.auth().createUserWithEmailAndPassword(e,t)).then(function(e){return u({firebaseUser:e.user,loading:!1})})}catch(e){return Promise.reject(e)}},e.subscribeForAuthenticatedUser=c,e.subscribeForUser=l,e.updateUser=function(e,t){try{return Promise.resolve(e.collections.users.updateDocument(t))}catch(e){return Promise.reject(e)}},e.useAuthenticatedUser=s,e.usersAtom=a});
//# sourceMappingURL=index.umd.js.map
