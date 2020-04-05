import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  TextInput,
  ToastAndroid,
  BackHandler,
  PixelRatio,
  Modal,
  ScrollView
} from 'react-native';
import firebase from 'firebase';
import { AdMobBanner, AdMobRewarded, AdMobInterstitial } from 'react-native-admob';

const backImg = require('../../images/backgroundBlur.jpg');
const localImg = require('../../images/localChain.png');
const onlineImg = require('../../images/onlineChain.png');
const guideImg = require('../../images/guideChain.png');
const logoutImg = require('../../images/logoutChain.png');
const friendsImg = require('../../images/friendsChain.png');
const hostImg = require('../../images/host.png');
const joinImg = require('../../images/join.png');
const modImg = require('../../images/modalGreen.png');
const crossImg = require('../../images/cross.png');
const batImg = require('../../images/fight.png');

let f = 1;

class HomePage extends Component {

  state = {
    online: 0,
    myName: '',
    friends: {},
    modalVisible: false
  }

  componentDidMount() {
    f = PixelRatio.getFontScale();
    BackHandler.addEventListener('hardwareBackPress', () => this.handleBack());
    firebase.database().ref('users/'+firebase.auth().currentUser.uid).on('value', u => {
      if(u.val() && u.val() != null && u.val()['friends'] && u.val()['friends'] != null)
        this.setState({ friends: u.val()['friends'], myName: u.val().name })
    })
  }

  renderFriends()
  {
      let renderArray = []
      let friends = Object.keys(this.state.friends)

      for(let i=0; i<friends.length; i++)
              renderArray.push(
                  <TouchableOpacity
                    style={{ width: '100%', borderWidth: 1, borderRadius: 10, borderColor: '#ffffff50', marginBottom: '3%', backgroundColor: '#a0db8e' }}
                    onPress={this.joinPlay.bind(this,friends[i])}
                  >
                      <Text style={{ padding: 7, color: '#555', fontSize: f*16, textAlign: 'center' }}>{this.state.friends[friends[i]]}</Text>
                  </TouchableOpacity>
              )

    if(renderArray.length > 0)
      return renderArray
    return <Text style={{
      marginTop: '22%',
      backgroundColor: '#a0db8e90',
      borderRadius: 25,
      padding: 15,
      textAlign: 'center',
      color: '#fff',
      fontWeight: '700',
      fontSize: f * 15,
      textShadowColor: '#e64460',
      textShadowOffset: { width: 2, height: 2 },
      fontStyle: 'italic'
    }}>To Play,{'\n'}First add "Friends" </Text>
  }

  joinPlay(friendUid) {
    firebase.database().ref('users/'+friendUid).once('value', frnd => {
      if(!frnd.val().game || frnd.val().game == null) {
        ToastAndroid.show(this.state.friends[friendUid]+' is not yet hosting...', ToastAndroid.SHORT);
      } else if (frnd.val().game.present1 == 0) {
        ToastAndroid.show(this.state.friends[friendUid]+' is not yet hosting...', ToastAndroid.SHORT);
      } else if (frnd.val().game.present2 == 1 || frnd.val().game.present2 == 2) {
        ToastAndroid.show(this.state.friends[friendUid]+' is already playing...', ToastAndroid.SHORT);
      } else {
        AdMobInterstitial.setAdUnitID('ca-app-pub-5251664647281296/2800462853');
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd()).catch(
          () => {
            AdMobInterstitial.removeAllListeners();
            this.setState({ modalVisible: false, online: 0 });
            this.props.navigation.navigate('mainFrameOnline', { uid: friendUid, host: 0, myName: this.state.myName, hostName: this.state.friends[friendUid] })
          });
        ToastAndroid.show('Loading Game... (▀̿Ĺ̯▀̿ ̿)', ToastAndroid.LONG);
        AdMobInterstitial.addEventListener('adClosed',
          () => {
            AdMobInterstitial.removeAllListeners();
            this.setState({ modalVisible: false, online: 0 });
            this.props.navigation.navigate('mainFrameOnline', { uid: friendUid, host: 0, myName: this.state.myName, hostName: this.state.friends[friendUid] })
        })
      }
    })
  }

  onlineRender() {
    if (this.state.online === 0) {
      return (
        <Image source={onlineImg} style={styles.imageStyle} />
      );
    } else if (this.state.online === 1) {
      return (
        <View style={{ flex: 1, justifyContent: 'space-around' }}>

          <TouchableOpacity
            style={styles.basicStyle}
            onPress={() => this.setState({ online: 2, modalVisible: true })}
          >
            <Image source={hostImg} style={{ resizeMode: 'contain', width: '100%' }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.basicStyle}
            onPress={() => this.setState({ online: 3, modalVisible: true })}
          >
            <Image source={joinImg} style={{ resizeMode: 'contain', width: '100%' }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.basicStyle}
            onPress={() => this.setState({ online: 0 })}
          >
            <Text style={{ fontSize: f * 15, backgroundColor: '#444', color: '#a0db8e', padding: 5, borderRadius: 60 }}>  X  </Text>
          </TouchableOpacity>

        </View>
      );
    } 
  }

  modal() {
    if(this.state.online == 2) {
      return (
        <View style={{height: '80%',width: '45%', marginTop: '6%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
          <Image source={modImg} style={styles.imageStyle} />
          <TouchableOpacity style={{ position: 'absolute', left: '34%', top: '0%', height: '8%' }} onPress={() => this.setState({ modalVisible: false, online: 1 })}>
            <Image source={crossImg} style={{ resizeMode: 'contain', height: '100%' }} />
          </TouchableOpacity>
          <View style={{ height: '74%', width: '79%' }}>
            <Text
              style={{
                textShadowColor: 'grey',
                textShadowOffset: { width: 1, height: 1 },
                color: '#fdfdfd',
                fontSize: f * 15,
                textAlign: 'center',
                margin: '8%',
                marginRight: '10%',
                marginBottom: 0,
                fontFamily: 'serif',
                fontWeight: '700'
              }}
            >
              Ask your friend to{'\n'}"Join Game" with you!
            </Text>
            <TouchableOpacity
              style={{ alignItems: 'center', justifyContent: 'center', height: '60%' }}
              onPress={() => {
                AdMobInterstitial.setAdUnitID('ca-app-pub-5251664647281296/2800462853');
                AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd()).catch(
                  () => {
                    AdMobInterstitial.removeAllListeners();
                    this.setState({ modalVisible: false, online: 0 });
                    this.props.navigation.navigate('mainFrameOnline', {
                    uid: firebase.auth().currentUser.uid, host: 1 })
                  });
                ToastAndroid.show('Loading your Game... (▀̿Ĺ̯▀̿ ̿)', ToastAndroid.LONG);
                AdMobInterstitial.addEventListener('adClosed', () => {
                  AdMobInterstitial.removeAllListeners();
                  this.setState({ modalVisible: false, online: 0 });
                this.props.navigation.navigate('mainFrameOnline', {
                  uid: firebase.auth().currentUser.uid, host: 1 })
                });
              }}
            >
              <Image source={batImg} style={{ resizeMode: 'contain', width: '40%' }} />
            </TouchableOpacity>
          </View>
        </View>
      )
    } else if(this.state.online == 3) {
      return (
        <View style={{height: '80%',width: '45%', marginTop: '4%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
          <Image source={modImg} style={styles.imageStyle} />
          <TouchableOpacity style={{ position: 'absolute', left: '37%', top: '0%', height: '8%' }} onPress={() => this.setState({ modalVisible: false, online: 1 })}>
            <Image source={crossImg} style={{ resizeMode: 'contain', height: '100%' }} />
          </TouchableOpacity>
          <View style={{ height: '74%', width: '79%', padding: '5%', paddingRight: '6%'}}>
            <ScrollView>
              {this.renderFriends()}
            </ScrollView>
          </View>
        </View>
      )
    }
  }

  handleBack() {
    this.props.navigation.navigate('homePage');
    return true;
  }

  toLogout() {
    firebase.auth().signOut();
    this.props.navigation.navigate('login');
  }

  render() {
    return (
      <ImageBackground source={backImg} style={{ flex: 1, flexDirection: 'row' }} >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false, online: 1 })}
        >
          {this.modal()}
        </Modal>
        <TouchableOpacity
          style={[styles.bigImageContainerStyle, { left: '3%' }]}
          onPress={() => {
            this.setState({ online: 0 })
            this.props.navigation.navigate('guide')
          }}
        >
          <Image source={guideImg} style={styles.imageStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.smallImageContainerStyle, { left: '20%' }]}
          onPress={() => {
              AdMobInterstitial.setAdUnitID('ca-app-pub-5251664647281296/7281513786');
              AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd()).catch(
                () => {
                  AdMobInterstitial.removeAllListeners();
                  this.setState({ modalVisible: false, online: 0 });
                  this.props.navigation.navigate('mainFrameLocal')
                });
              ToastAndroid.show('Loading Game... (▀̿Ĺ̯▀̿ ̿)', ToastAndroid.LONG);
              AdMobInterstitial.addEventListener('adClosed',
              () => {
                AdMobInterstitial.removeAllListeners();
                this.setState({ modalVisible: false, online: 0 });
                this.props.navigation.navigate('mainFrameLocal')
              });
            }}
        >
          <Image source={localImg} style={styles.imageStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bigImageContainerStyle, { left: '40%' }]}
          onPress={() => this.setState({ online: 1 })}
        >
          {this.onlineRender()}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.smallImageContainerStyle, { left: '59%' }]}
          onPress={() => {
            this.setState({ online: 0 })
            this.props.navigation.navigate('friends')
          }}
        >
          <Image source={friendsImg} style={styles.imageStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.smallImageContainerStyle, { left: '80%' }]}
          onPress={() => this.toLogout()}
        >
          <Image source={logoutImg} style={styles.imageStyle} />
        </TouchableOpacity>
        <Text
        style={{
          position: 'absolute',
          textShadowColor: 'grey',
          textShadowOffset: { width: 1, height: 1 },
          color: '#2c7510',
          fontSize: f * 14,
          bottom: '9%',
          right: '4%'
        }}
        >
          Developed By
        </Text>
        <Text
          style={{
            position: 'absolute',
            textShadowColor: 'grey',
            textShadowOffset: { width: 1, height: 1 },
            color: 'black',
            fontSize: f * 18,
            bottom: '3%',
            right: '4%'
          }}
        >
          Mehul Poddar
        </Text>
      </ImageBackground>
    );
  }
}

const styles = {
  bigImageContainerStyle: {
    position: 'absolute',
    height: '80%',
    width: '18%',
    top: '0%'
  },
  smallImageContainerStyle: {
    position: 'absolute',
    height: '50%',
    width: '18%',
    top: '0%'
  },
  imageStyle: {
    resizeMode: 'stretch',
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  basicStyle: {
    padding: '1%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  input: {
    height: '20%',
    width: '100%',
    backgroundColor: '#FAD402B3',
    color: '#000',
    fontSize: f * 13,
    borderRadius: 10,
    paddingLeft: 10
  }
};

export default HomePage;
