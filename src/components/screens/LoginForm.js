import React, { Component } from 'react';
import { Text, Image, View,
         KeyboardAvoidingView, PixelRatio,
         TextInput, ImageBackground, ToastAndroid,
         TouchableOpacity, Alert, Keyboard, BackHandler }
from 'react-native';
import firebase from 'firebase';
import { Spinner } from '../common';

const iconImg = require('../../images/Trans_RPS_icon.png');
const backBg = require('../../images/backgroundBlur.jpg');

let f = 1;

export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
  }

  state = { email: '', password: '', error: '', loading: false, loggedIn: true };

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
      .then(() => {
        firebase.database().ref('users/'+firebase.auth().currentUser.uid).update({ email: this.state.email })
        this.onLoginSuccess()
      })
      .catch(() => this.setState({ error: 'Sign Up Failed.', loading: false }));
    }
  }

  onLoginSuccess(user) {
    this.setState({
      email: '',
      password: '',
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
        <Image
          style={styles.logo}
          source={iconImg}
        />
        <View style={{ padding: '4%', width: '50%' }}>
         <Text style={styles.textStyle}>
          Welcome to{'\n'}
          Rock, Paper {'&'} Scissors:{'\n'}
          Evolution!
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
  }
};
