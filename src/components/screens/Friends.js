import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  TextInput,
  BackHandler,
  PixelRatio,
  ToastAndroid,
  ScrollView
} from 'react-native';
import firebase from 'firebase';

const backImg = require('../../images/backgroundBlur.jpg');
const frndsImg = require('../../images/friendsIcon.png');

let f = 1;

class Friends extends Component {

  state = { name: '', email: '', friends: {}, users: {} }

  componentDidMount() {
    f = PixelRatio.getFontScale(); //Font Factor

    firebase.database().ref('users').on('value', users => {
      if(users.val() && users.val() != null) {
        let friends = users.val()[firebase.auth().currentUser.uid]['friends']
        if(friends && friends != null)
          this.setState({ users: users.val(), friends: friends });
        else
          this.setState({ users: users.val(), friends: {} });
      }
    });

    BackHandler.addEventListener('hardwareBackPress', () => this.handleBack());
  }

  onAddPress() {
    if (this.state.name === '' || this.state.email === '') {
      ToastAndroid.show('Add Friend Details', ToastAndroid.SHORT);
    } else if(this.state.email === this.state.users[firebase.auth().currentUser.uid].email )
      ToastAndroid.show('Don\'t friend yourself, Come on!', ToastAndroid.SHORT)
    else {
      temp = {}
      let userKeys = Object.keys(this.state.users) 
      for(let i=0; i<userKeys.length; i++)
        if(this.state.users[userKeys[i]].email == this.state.email) {
          temp[userKeys[i]] = this.state.name
          break
        }

      if(Object.keys(temp) == 0)
        ToastAndroid.show(this.state.email + ' is not on this game!', ToastAndroid.SHORT)
      else {
        firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/friends').update(temp)
        this.setState({ name: '', email: '' });
      }
    }
  }

  handleBack() {
    this.props.navigation.navigate('homePage');
    return true;
  }

  renderRows() {
    let renderArray = []
    let friends = Object.keys(this.state.friends) 

      for(let i=0; i<friends.length; i++)
        renderArray.push(
          <View style={{ width: 200, borderWidth: 1, borderRadius: 20, marginBottom: '3%', backgroundColor: '#24a463', borderLeftWidth: 3, borderRightWidth: 3, borderColor: '#ededed' }}>
            <Text style={[styles.buttonText, { fontSize: f * 18, padding: '2%' }]}>
              {this.state.friends[friends[i]]}
            </Text>
          </View>
        )

    if(renderArray.length > 0)
      return renderArray
    return <Text style={{
      marginTop: '60%',
      backgroundColor: '#24a46390',
      borderRadius: 25,
      padding: 15,
      textAlign: 'center',
      color: '#fff',
      fontWeight: '700',
      fontSize: f * 15,
      textShadowColor: '#e64460',
      textShadowOffset: { width: 2, height: 2 },
      fontStyle: 'italic'
    }}>ADD YOUR FIRST FRIEND!</Text>
  }

  render() {
    return (
      <ImageBackground
          source={backImg}
          style={{ width: '100%', height: '100%', flexDirection: 'row' }}
      >

        <View style={{ width: '50%', justifyContent: 'center' }}>
          <View style={{ height: '40%', marginTop: '5%', left: '5%' }}>
            <Image source={frndsImg} style={styles.imageStyle} />
          </View>
          <View style={{ width: '100%', justifyContent: 'center' }} >
          <TextInput
              placeholder="Friend's Email"
              placeholderTextColor='#555'
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCapitalize="none"
              style={styles.input}
              returnKeyType="go"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />

            <TextInput
              placeholder="Create a Nickname for Friend"
              placeholderTextColor='#555'
              returnKeyType="next"
              underlineColorAndroid='rgba(0,0,0,0)'
              keyboardType="default"
              autoCorrect={false}
              style={styles.input}
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
            />

            <TouchableOpacity
             style={styles.addContainer}
             onPress={this.onAddPress.bind(this)}
            >
              <Text style={styles.buttonText}>Add Friend</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ 
          width: '40%', borderLeftWidth: 3, borderBottomWidth: 3, justifyContent: 'center', alignItems: 'center',
          margin : '5%', borderColor: '#ffffff80', borderRadius: 10
          }}
        >
          <ScrollView>
            {this.renderRows()}
          </ScrollView>
        </View>

      </ImageBackground>
    );
  }
}

const styles = {
  input: {
    height: '20%',
    width: '70%',
    backgroundColor: '#d2eee0',
    color: '#24a463',
    fontSize: f * 13,
    marginBottom: '2%',
    borderRadius: f * 20,
    left: '20%',
    paddingLeft: 15,
    borderColor: '#24a463',
    borderLeftWidth: 3,
    borderRightWidth: 3
  },
  imageStyle: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },
  addContainer: {
    backgroundColor: '#24a463',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#d2eee0',
    width: '40%',
    paddingVertical: '1%',
    top: '3%',
    borderRadius: f * 20,
    left: '35%'
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: f * 15,
    textShadowColor: '#e64460',
    textShadowOffset: { width: 2, height: 2 },
    fontStyle: 'italic'
  },
  rowStyle: {
    position: 'absolute',
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    top: '3%'
  }
};

export default Friends;
