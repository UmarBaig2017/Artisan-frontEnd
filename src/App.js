import React, { Component } from 'react';
import Routers from './Route';
import {Provider} from 'react-redux';
import store from './store';
import firebase from "firebase";


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC1i5RwwQUisIInOhETWYMU9HQ7iayhJ50",
    authDomain: "pureartisanapp.firebaseapp.com",
    databaseURL: "https://pureartisanapp.firebaseio.com",
    projectId: "pureartisanapp",
    storageBucket: "pureartisanapp.appspot.com",
    messagingSenderId: "1020995126307",
    appId: "1:1020995126307:web:eef21aaffed8d474"
  };
  // Initialize Firebase
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
