import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';

var Firebase = function Firebase(props) {
  var _React$useState = useState(false),
      firebaseReady = _React$useState[0],
      setFirebaseReady = _React$useState[1];

  var firebaseConfig = props.firebaseConfig;
  useEffect(function () {
    initializeApp(firebaseConfig);
    setFirebaseReady(true);
  }, [firebaseConfig]);
  return firebaseReady ? props.children : props.loadingComponent;
};

export { Firebase };
//# sourceMappingURL=index.modern.js.map
