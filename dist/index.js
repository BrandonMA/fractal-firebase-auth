var firebase = require('firebase/app');
var React = require('react');

var Firebase = function Firebase(props) {
  var _React$useState = React.useState(false),
      firebaseReady = _React$useState[0],
      setFirebaseReady = _React$useState[1];

  var firebaseConfig = props.firebaseConfig;
  React.useEffect(function () {
    firebase.initializeApp(firebaseConfig);
    setFirebaseReady(true);
  }, [firebaseConfig]);
  return firebaseReady ? props.children : props.loadingComponent;
};

exports.Firebase = Firebase;
//# sourceMappingURL=index.js.map
