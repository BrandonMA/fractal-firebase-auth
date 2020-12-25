# react-firebase-auth

## Description

React Components to use firebase on react with custom Recoil logic to manage shared state

### Example

Example is web only so be aware of that, you can make it work on native if you eject and add the respective firebase config files.

### Installation

yarn add @bma98/react-firebase-auth

### Peer dependencies

yarn add @react-native-firebase/app @react-native-firebase/firestore @react-native-firebase/auth firebase recoil

They are not included on the library itself as you may be using different versions for other libraries(or any other reason for this matter). If we add them to the library, if you have a different version, let's say recoil 0.1.1, atoms are not gonna work.
