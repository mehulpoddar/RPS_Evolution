import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Dimensions, ImageBackground, Text, StatusBar } from 'react-native';
import Root from './src/components/Root';

class App extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAX8nmQMvF3RDEQK8riHMayoLmsO5BZkNQ",
        authDomain: "rps-evolutions.firebaseapp.com",
        databaseURL: "https://rps-evolutions.firebaseio.com",
        projectId: "rps-evolutions",
        storageBucket: "rps-evolutions.appspot.com",
        messagingSenderId: "530720960620",
        appId: "1:530720960620:web:55bd0d8a3e07fed6c3e849",
        measurementId: "G-6HK7YN155F"
      });
    }
  }

  fitScreen() {
    const { height, width } = Dimensions.get('window');
    const correctWidth = height * 1.75; //Aspect Ratio = 1.75

    if (width > correctWidth) {
      return (
        <View style={[styles.appStyle, { width: correctWidth }]}>
          <Root />
        </View>
      );
    }
    return (
      <View style={styles.appStyle}>
        <Root />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <StatusBar hidden />
        {this.fitScreen()}
      </View>
    );
  }
}

const styles = {
  appStyle: {
    width: '100%',
    height: '100%',
    alignSelf: 'center'
  }
};

export default App;
