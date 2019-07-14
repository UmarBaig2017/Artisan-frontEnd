import React, { Component } from 'react';
import Routers from './Route';
import {Provider} from 'react-redux';
import store from './store';
import firebase from "firebase";


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAHfO6C7EQqqIkIE0nqNKo8bQDSK5Wrfqo",
    authDomain: "adminpanelbruc.firebaseapp.com",
    databaseURL: "https://adminpanelbruc.firebaseio.com",
    projectId: "adminpanelbruc",
    storageBucket: "adminpanelbruc.appspot.com",
    messagingSenderId: "611866549272",
    appId: "1:611866549272:web:e98cd7f24b14c06e"
  };
 
  firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routers />
      </Provider>
    );
  }
}

export default App;
