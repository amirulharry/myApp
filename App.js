/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import List from './List.js'
import firebase from 'react-native-firebase'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

   componentDidMount() {
    var config = {
      apiKey: "AIzaSyC093mcKJ8ilcbgOODnHk5Hyr72urQdTyA",
      authDomain: "exact-hackathon.firebaseapp.com",
      databaseURL: "https://exact-hackathon.firebaseio.com",
      projectId: "exact-hackathon",
      storageBucket: "exact-hackathon.appspot.com",
      messagingSenderId: "539869004879",
    };
    firebase.initializeApp(config);

    console.log('Component did mount2');

          firebase.messaging().requestPermission()
            .then(() => {
              console.log('Permission completed');
            });

          setTimeout(() => {
            firebase.messaging().getToken()
              .then(token => {

                firebase.database().ref("Token").push({
                  token: token
                }).then((data) => {

                  alert("save:" + token);
                }).catch((error) => {
                  //error callback
                  alert("can't save " + error);
                })

                this.setState({ token });
                alert(token);
              })
              .catch(err => {
                alert(err);
              });
          }, 3000);

    this.doThings;
  }
  
  render() {
    return (
      
      <View style={styles.container}>
          <Text style={styles.welcome}>Welcome!</Text>
          <List style={styles.list} />
            {/* <Text style={styles.instructions}>To get started, edit App.js</Text>   */}
          {/* <Text style={styles.instructions}>{instructions}</Text> */}
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  list: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
