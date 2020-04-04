import React, { Component } from 'react';
import { Text, Image, View,
         KeyboardAvoidingView, PixelRatio, Modal,
         TextInput, ImageBackground, ToastAndroid,
         TouchableOpacity, Alert, Keyboard, BackHandler }
from 'react-native';
import firebase from 'firebase';
import { Spinner } from '../common';

const iconImg = require('../../images/Trans_RPS_icon.png');
const backBg = require('../../images/backgroundBlur.jpg');
const greenModImg = require('../../images/modalGreen.png');

let f = 1;

export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
  }

  state = { modalVisible: false, name: '', email: '', password: '', error: '', loading: false, loggedIn: true };

  componentDidMount() {
    f = PixelRatio.getFontScale(); //Font Factor

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          this.onLoginSuccess(user);
      } else {
        this.setState({ loggedIn: false });
      }
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
  }

  modal() {
    return (
      <View style={{height: '75%',width: '40%', marginTop: '7%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
        <Image source={greenModImg} style={styles.imageStyle} />
        <View style={{ height: '74%', width: '79%', backgroundColor: 'grey'}}>
          <Text
            style={{
              textShadowColor: 'grey',
              textShadowOffset: { width: 1, height: 1 },
              color: '#fdfdfd',
              fontSize: f * 15,
              textAlign: 'center',
              marginLeft: '5%',
              marginRight: '10%',
              marginTop: '10%',
              marginBottom: '0%',
              fontFamily: 'serif',
              fontWeight: '700'
            }}
          >
            What's going to be your{'\n'}Game Name?
          </Text>

          <TextInput
           placeholder="Game Name"
           placeholderTextColor='#555'
           underlineColorAndroid='rgba(0,0,0,0)'
           autoCorrect={false}
           style={[styles.input, { fontSize: f*11, alignSelf: 'center', height: '20%', width: '80%', backgroundColor: '#87d4ac90', marginTop: '9%' }]}
           value={this.state.name}
           onChangeText={name => this.setState({ name })}
         />

          <TouchableOpacity
            onPress={() => {
              firebase.database().ref('users/'+firebase.auth().currentUser.uid).update({ name: this.state.name, email: this.state.email })
              this.setState({ modalVisible: false })
              this.onLoginSuccess()
            }}
            style={{ borderRadius: 30, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: '#87d4ac', width: '45%', marginTop: '2%' }}
          >
            <Text style={{ fontSize: f*15, margin: '5%', color: '#444' }}>Let's Begin!</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  onLogInPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });
    Keyboard.dismiss();
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onLoginSuccess.bind(this))
     .catch(() => this.setState({ error: 'Authentication Failed.', loading: false }));
  }

  onSignUpPress() {
    if (this.state.email === '' || this.state.password === '') {
      ToastAndroid.show('Enter Email & Password to Sign up', ToastAndroid.SHORT);
    } else {
      const { email, password } = this.state;

      this.setState({ error: '', loading: true });
      Keyboard.dismiss();
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => this.setState({ modalVisible: true, name: '' }))
      .catch(() => this.setState({ error: 'Sign Up Failed.', loading: false }));
    }
  }

  onLoginSuccess(user) {
    this.setState({
      loading: false,
      error: ''
    });
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    this.props.navigation.navigate('homePage');
  }

  handleBack() {
    ToastAndroid.show('Cannot go back to previous screen', ToastAndroid.SHORT);
    return true;
  }

  loadingSpinner() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
  }

  forgotPassword() {
    firebase.auth().sendPasswordResetEmail(this.state.email)
    .then(Alert.alert('Reset Email has been sent to your Email ID!'))
     .catch(this.forgotPasswordFail.bind(this));
  }

  forgotPasswordFail() {
    Alert.alert('Please enter a valid Email ID!');
  }

  render() {
    if (!this.state.loggedIn) {
   return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ImageBackground source={backBg} style={styles.backStyle}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false, online: 1 })}
        >
          {this.modal()}
        </Modal>
        <Image
          style={styles.logo}
          source={iconImg}
        />
        <View style={{ padding: '4%', width: '50%', marginTop: '2%' }}>
         <Text style={[styles.textStyle, { fontFamily: 'serif', fontWeight: 'medium' }]}>
          Welcome to{'\n'}
          RPS Evolution!
         </Text>

         <TextInput
           placeholder="Valid Email ID"
           placeholderTextColor='#555'
           returnKeyType="next"
           onSubmitEditing={() => this.passwordInput.focus()}
           underlineColorAndroid='rgba(0,0,0,0)'
           keyboardType="email-address"
           autoCapitalize="none"
           autoCorrect={false}
           style={styles.input}
           value={this.state.email}
           onChangeText={email => this.setState({ email })}
         />

         <TextInput
           placeholder="Password"
           placeholderTextColor='#555'
           underlineColorAndroid='rgba(0,0,0,0)'
           style={styles.input}
           secureTextEntry
           returnKeyType="go"
           ref={(input) => this.passwordInput = input }
           value={this.state.password}
           onChangeText={password => this.setState({ password })}
         />

        <TouchableOpacity onPress={this.forgotPassword.bind(this)}>
           <Text style={{ color: 'white' }}>Forgot password?</Text>
         </TouchableOpacity>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.logInContainer}
            onPress={this.onLogInPress.bind(this)}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.SignUpContainer}
            onPress={this.onSignUpPress.bind(this)}
          >
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
         </View>

         <Text style={styles.errorTextStyle}>
          {this.state.error}
         </Text>

         {this.loadingSpinner()}
       </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
 }
 return (
   <ImageBackground source={backBg} style={styles.spinnerStyle}>
    <Image source={iconImg} style={{ left: '10%' }} />
    <Spinner size='large' />
   </ImageBackground>
  );
}
}

const styles = {
  backStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  logo: {
    resizeMode: 'contain',
    top: '5%',
    height: '80%',
    width: '40%'
  },
  textStyle: {
    top: '5%',
    marginBottom: '15%',
    color: '#000',
    fontSize: f * 20,
    textAlign: 'center',
    textShadowColor: 'grey',
    textShadowOffset: { width: 1, height: 1 },
    fontStyle: 'italic'
  },
  input: {
    height: '12%',
    width: '100%',
    backgroundColor: '#FAD402B3',
    color: 'black',
    fontSize: f * 13,
    marginBottom: '3%',
    borderRadius: f * 10,
    paddingLeft: 10
  },
  logInContainer: {
    backgroundColor: '#e64460',
    paddingVertical: '2%',
    marginTop: '4%',
    borderRadius: f * 10,
    width: '40%',
    marginLeft: '5%'
  },
  SignUpContainer: {
    backgroundColor: '#e64460',
    paddingVertical: '2%',
    marginTop: '4%',
    marginLeft: '10%',
    borderRadius: f * 10,
    width: '40%'
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: f * 18
  },
  errorTextStyle: {
    fontSize: f * 15,
    alignSelf: 'center',
    color: 'red',
    margin: '2%'
  },
  spinnerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  imageStyle: {
    resizeMode: 'stretch',
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
};
