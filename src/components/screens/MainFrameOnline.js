import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  BackHandler,
  PixelRatio,
  Modal,
  AppState
} from 'react-native';
import firebase from 'firebase';
import TrackPlayer from 'react-native-track-player';
import { AdMobInterstitial, AdMobRewarded } from 'react-native-admob';

const background = require('../../images/background.jpg');
const chatImg = require('../../images/chat.png');
const chatNotifyImg = require('../../images/chatNotify.png');
const sciButton = require('../../images/sciButton.png');
const rockButton = require('../../images/rockButton.png');
const paperButton = require('../../images/paperButton.png');
const sciArrowImg = require('../../images/sciActiveArrow.png');
const sciInArrowImg = require('../../images/sciInactiveArrow.png');
const rockArrowImg = require('../../images/rockActiveArrow.png');
const rockInArrowImg = require('../../images/rockInactiveArrow.png');
const paperArrowImg = require('../../images/paperActiveArrow.png');
const paperInArrowImg = require('../../images/paperInactiveArrow.png');
const songImg = require('../../images/changeSong.png');
const noSongImg = require('../../images/noSong.png');
const speedImg = require('../../images/fastOn.png');
const noSpeedImg = require('../../images/fastOff.png');
const greenModImg = require('../../images/modalGreen.png');
const redModImg = require('../../images/modalRed.png');
const crossImg = require('../../images/cross.png');
const contImg = require('../../images/continue.png');
const adImg = require('../../images/ad.png');
const statsImg = require('../../images/stats.png');

const happy1 = require('../../images/happy1.png');
const happy2 = require('../../images/happy2.png');
const sad1 = require('../../images/sad1.png');
const sad2 = require('../../images/sad2.png');
const rage1 = require('../../images/rage1.png');
const rage2 = require('../../images/rage2.png');
const ready1 = require('../../images/ready1.png');
const ready2 = require('../../images/ready2.png');

const rockImg = require('../../images/Rocks/rock.png');
const bolImg = require('../../images/Rocks/boulder.png');
const monImg = require('../../images/Rocks/monument.png');
const hillImg = require('../../images/Rocks/hill.png');
const mountImg = require('../../images/Rocks/mountain.png');
const volImg = require('../../images/Rocks/volcano.png');
const metImg = require('../../images/Rocks/meteor.png');
const planImg = require('../../images/Rocks/planet.png');
const sunImg = require('../../images/Rocks/sun.png');
const giantImg = require('../../images/Rocks/giant.png');

const paperImg = require('../../images/Papers/paper.png');
const giftImg = require('../../images/Papers/gift.png');
const bookImg = require('../../images/Papers/book.png');
const cardImg = require('../../images/Papers/cardboard.png');
const foilImg = require('../../images/Papers/foil.png');
const sandImg = require('../../images/Papers/sandPaper.png');
const wallImg = require('../../images/Papers/wallpaper.png');
const furImg = require('../../images/Papers/fur.png');
const carpImg = require('../../images/Papers/carpet.png');
const phoenixImg = require('../../images/Papers/phoenix.png');

const sciImg = require('../../images/Scissors/scissors.png');
const scaImg = require('../../images/Scissors/scale.png');
const dagImg = require('../../images/Scissors/dagger.png');
const shearImg = require('../../images/Scissors/shears.png');
const swissImg = require('../../images/Scissors/swissKnife.png');
const hackImg = require('../../images/Scissors/hackSaw.png');
const shuriImg = require('../../images/Scissors/shuriken.png');
const swordImg = require('../../images/Scissors/sword.png');
const axeImg = require('../../images/Scissors/axe.png');
const scytheImg = require('../../images/Scissors/scythe.png');

let gameStats = {
  p1: {
    scissors: {
      won: 0,
      lost: 0,
      draw: 0
    },
    rock: {
      won: 0,
      lost: 0,
      draw: 0
    },
    paper: {
      won: 0,
      lost: 0,
      draw: 0
    }
  },
  p2: {
    scissors: {
      won: 0,
      lost: 0,
      draw: 0
    },
    rock: {
      won: 0,
      lost: 0,
      draw: 0
    },
    paper: {
      won: 0,
      lost: 0,
      draw: 0
    }
  }
};

const paper = [
  {
    name: 'Paper',
    atk: 10,
    img: paperImg
  },
  {
    name: 'Gift Wrap',
    atk: 12,
    img: giftImg
  },
  {
    name: 'Book',
    atk: 15,
    img: bookImg
  },
  {
    name: 'Cardboard',
    atk: 18,
    img: cardImg
  },
  {
    name: 'Foil Paper',
    atk: 21,
    img: foilImg
  },
  {
    name: 'Sand Paper',
    atk: 25,
    img: sandImg
  },
  {
    name: 'Wallpaper',
    atk: 27,
    img: wallImg
  },
  {
    name: 'Fur',
    atk: 30,
    img: furImg
  },
  {
    name: 'Carpet',
    atk: 32,
    img: carpImg
  },
  {
    name: 'Phoenix',
    atk: 36,
    img: phoenixImg
  }
];

const rock = [
  {
    name: 'Rock',
    atk: 11,
    img: rockImg
  },
  {
    name: 'Boulder',
    atk: 14,
    img: bolImg
  },
  {
    name: 'Monument',
    atk: 16,
    img: monImg
  },
  {
    name: 'Hill',
    atk: 19,
    img: hillImg
  },
  {
    name: 'Mountain',
    atk: 23,
    img: mountImg
  },
  {
    name: 'Volcano',
    atk: 28,
    img: volImg
  },
  {
    name: 'Meteor',
    atk: 33,
    img: metImg
  },
  {
    name: 'Planet',
    atk: 36,
    img: planImg
  },
  {
    name: 'Sun',
    atk: 40,
    img: sunImg
  },
  {
    name: 'Rock Giant',
    atk: 45,
    img: giantImg
  }
];

const scissors = [
  {
    name: 'Scissors',
    atk: 12,
    img: sciImg
  },
  {
    name: 'Metal Scale',
    atk: 15,
    img: scaImg
  },
  {
    name: 'Dagger',
    atk: 19,
    img: dagImg
  },
  {
    name: 'Shears',
    atk: 24,
    img: shearImg
  },
  {
    name: 'Swiss Knife',
    atk: 29,
    img: swissImg
  },
  {
    name: 'Hack Saw',
    atk: 35,
    img: hackImg
  },
  {
    name: 'Shuriken',
    atk: 40,
    img: shuriImg
  },
  {
    name: 'Sword',
    atk: 46,
    img: swordImg
  },
  {
    name: 'Axe',
    atk: 51,
    img: axeImg
  },
  {
    name: 'Scythe',
    atk: 58,
    img: scytheImg
  }
];

let middleAd = true;
let f = 1;
let delay = 1000;
let ps = 0;
let rs = 0;
let ss = 0;

class MainFrameOnline extends Component {

  constructor(props) {
    super(props);

    middleAd = true;
    f = 1;
    delay = 1000;
    ps = 0;
    rs = 0;
    ss = 0;

    this.host = props.route.params.host;
    this.uid = props.route.params.uid;

    gameStats = {
      p1: {
        scissors: {
          won: 0,
          lost: 0,
          draw: 0
        },
        rock: {
          won: 0,
          lost: 0,
          draw: 0
        },
        paper: {
          won: 0,
          lost: 0,
          draw: 0
        }
      },
      p2: {
        scissors: {
          won: 0,
          lost: 0,
          draw: 0
        },
        rock: {
          won: 0,
          lost: 0,
          draw: 0
        },
        paper: {
          won: 0,
          lost: 0,
          draw: 0
        }
      }
    };
    

    let tracks = [
      {
        id: 'track1',
        url: 'https://firebasestorage.googleapis.com/v0/b/rps-evolutions.appspot.com/o/GameMusic%2Ftrack1.mp3?alt=media&token=0dc67000-a402-4acb-a247-1745e9ff790a'
      },
      {
        id: 'track2',
        url: 'https://firebasestorage.googleapis.com/v0/b/rps-evolutions.appspot.com/o/GameMusic%2Ftrack2.mp3?alt=media&token=f7b54d6d-4f0a-4480-8e72-fc42e8ffd74a'
      },
      {
        id: 'track3',
        url: 'https://firebasestorage.googleapis.com/v0/b/rps-evolutions.appspot.com/o/GameMusic%2Ftrack3.mp3?alt=media&token=86aa47e6-4504-4993-9329-d154d755c167'
      },
      {
        id: 'track4',
        url: 'https://firebasestorage.googleapis.com/v0/b/rps-evolutions.appspot.com/o/GameMusic%2Ftrack4.mp3?alt=media&token=1231e587-3cc8-4b01-adf6-06c0a6084bb6'
      },
      {
        id: 'track5',
        url: 'https://firebasestorage.googleapis.com/v0/b/rps-evolutions.appspot.com/o/GameMusic%2Ftrack5.mp3?alt=media&token=1498e343-7de0-4f15-9ca8-3d911cb8b5f7'
      },
      {
        id: 'track6',
        url: 'https://firebasestorage.googleapis.com/v0/b/rps-evolutions.appspot.com/o/GameMusic%2Ftrack6.mp3?alt=media&token=7687e393-3574-4dd7-addc-6eb8675c2300'
      },
      {
        id: 'track7',
        url: 'https://firebasestorage.googleapis.com/v0/b/rps-evolutions.appspot.com/o/GameMusic%2Ftrack7.mp3?alt=media&token=6768c4bb-2432-44e7-b5de-d7381dfcb98a'
      },
      {
        id: 'track8',
        url: 'https://firebasestorage.googleapis.com/v0/b/rps-evolutions.appspot.com/o/GameMusic%2Ftrack8.mp3?alt=media&token=ebcdde62-82e2-41a0-9874-d9ae3162287c'
      },
      {
        id: 'track9',
        url: 'https://firebasestorage.googleapis.com/v0/b/rps-evolutions.appspot.com/o/GameMusic%2Ftrack9.mp3?alt=media&token=0d17de9a-1b15-4150-8f61-e49fc2eff843'
      },
      {
        id: 'track10',
        url: 'https://firebasestorage.googleapis.com/v0/b/rps-evolutions.appspot.com/o/GameMusic%2Ftrack10.mp3?alt=media&token=97487b72-dea4-4b50-a879-a490d50985f5'
      },
      {
        id: 'track11',
        url: 'https://firebasestorage.googleapis.com/v0/b/rps-evolutions.appspot.com/o/GameMusic%2Ftrack11.mp3?alt=media&token=a7931219-d902-4960-9ce8-db9115d27e03'
      },
    ]

    tracks.sort(() => Math.random() - 0.5);
    ToastAndroid.show('･ﾟ✧ Picking out your Music :･ﾟ✧', ToastAndroid.SHORT);

    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.add(tracks).then(function() {
        TrackPlayer.play();
      });
    });

    firebase.database().ref('users/'+this.uid+'/game').set({
      winner: 0,
      winMem: 0,
      supCh: 0,
      song1: songImg,
      song2: songImg,
      speed: noSpeedImg,
      inactive: false,
      gs: gameStats,
    
      batImg1: null,
      batImg2: null,
      winImg1: happy1,
      winImg2: happy2,
      ready1: 0,
      ready2: 0,
      msg1: '',
      msg2: '',
      msgStat1: 1,
      msgStat2: 1,
      msgOpen1: 0,
      msgOpen2: 0,
    
      hp1: 750,
      mana1: 0,
      pStat1: 0,
      rStat1: 0,
      sStat1: 0,
    
      hp2: 750,
      mana2: 0,
      pStat2: 0,
      rStat2: 0,
      sStat2: 0
    });

    AdMobRewarded.removeAllListeners();
    AdMobInterstitial.removeAllListeners();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);

    this.backButtonEvent = this.backButtonEvent.bind(this);
    this.adRewardHandler = this.adRewardHandler.bind(this);
    this.adLoadedHandler = this.adLoadedHandler.bind(this);
}

state = {
  appState: AppState.currentState,

  modalVisible: false,
  frame: greenModImg,
  msg: '',
  obj: undefined,
  callback: undefined,

  winner: 0,
  winMem: 0,
  supCh: 0,
  song1: songImg,
  song2: songImg,
  speed: noSpeedImg,
  inactive: false,
  gs: gameStats,

  batImg1: null,
  batImg2: null,
  winImg1: happy1,
  winImg2: happy2,
  ready1: 0,
  ready2: 0,
  msg1: '',
  msg2: '',
  msgStat1: 1,
  msgStat2: 1,
  msgOpen1: 0,
  msgOpen2: 0,

  hp1: 750,
  mana1: 0,
  pStat1: 0,
  rStat1: 0,
  sStat1: 0,

  hp2: 750,
  mana2: 0,
  pStat2: 0,
  rStat2: 0,
  sStat2: 0
};

componentDidMount() {
    f = PixelRatio.getFontScale(); //Font Factor
    AppState.addEventListener("change", this._handleAppStateChange);

    AdMobRewarded.addEventListener('rewarded', this.adRewardHandler);
    AdMobRewarded.addEventListener('adLoaded', this.adLoadedHandler);

    firebase.database().ref('users/'+this.uid+'/game').on('value', dataSnapshot => {
      this.setState(dataSnapshot.val(), () => {
        if (Math.round((this.state.hp1 + this.state.hp2) / 2) < 180 && Ad) {
          middleAd = false;
          AdMobInterstitial.setAdUnitID('ca-app-pub-5251664647281296/7948847756');
          AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
        }
        if(this.statDecider(14) != ps) {
          ps = this.statDecider(14)
          this.setState({
            modalVisible: true,
            frame: redModImg,
            msg: 'Opponent evolved their ' + paper[this.statDecider(3) - 1].name + ' to ' + paper[this.statDecider(3)].name
            + '\n\n:･ﾟ✧  ʕ ␥_␥ʔ  :･ﾟ✧',
            obj: paper[this.statDecider(3)].img
          });
        }
        else if(this.statDecider(15) != rs) {
          rs = this.statDecider(15)
          this.setState({
            modalVisible: true,
            frame: redModImg,
            msg: 'Opponent evolved their ' + rock[this.statDecider(4) - 1].name + ' to ' + rock[this.statDecider(4)].name
            + '\n\n:･ﾟ✧ ┌༼▀̿̿Ĺ̯̿̿▀̿༽┘ :･ﾟ✧',
            obj: rock[this.statDecider(4)].img
          });
        }
        else if(this.statDecider(16) != ss) {
          ss = this.statDecider(16)
          this.setState({
            modalVisible: true,
            frame: redModImg,
            msg: 'Opponent evolved their ' + scissors[this.statDecider(5) - 1].name + ' to ' + scissors[this.statDecider(5)].name
            + '\n\n:･ﾟ✧ ┌(★o☆)┘ :･ﾟ✧',
            obj: scissors[this.statDecider(5)].img
          });
        }
      });
      this.decider();
    })

  BackHandler.addEventListener('hardwareBackPress', this.backButtonEvent);
}

_handleAppStateChange = nextAppState => {
  if (
    this.state.appState.match(/inactive|background/) &&
    nextAppState === "active"
  ) {
    if (this.statDecider(-1) === songImg) {
      TrackPlayer.play()
    }
  } else if (
    this.state.appState === "active" &&
    nextAppState.match(/inactive|background/)) {
      TrackPlayer.pause()
    }
  this.setState({ appState: nextAppState });
};

adRewardHandler() {
  if (this.statDecider(-1) === songImg) {
    TrackPlayer.play()
  }
  let tempM = 0;
  if (this.host === 1) {
    tempM = this.state.mana1 + 5;
    firebase.database().ref('users/'+this.uid+'/game').update({ mana1: tempM });
  } else {
    tempM = this.state.mana2 + 5;
    firebase.database().ref('users/'+this.uid+'/game').update({ mana2: tempM });
  }
}

adLoadedHandler() {
  if (this.host === 1) {
    firebase.database().ref('users/'+this.uid+'/game').update({
      msg1: 'Server: Your opponent is watching an Ad to earn 5 mana...',
      msgStat2: 2
    });
  } else {
    firebase.database().ref('users/'+this.uid+'/game').update({
      msg2: 'Server: Your opponent is watching an Ad to earn 5 mana...',
      msgStat1: 2
    });
  }
}

backButtonEvent() {
  this.setState({
    modalVisible: true,
    frame: greenModImg,
    msg: 'Are you sure you want to go back? :O\n'
    + 'This page will miss you!',
    obj: contImg,
    callback: () => {
      TrackPlayer.stop()
      BackHandler.removeEventListener('hardwareBackPress', this.backButtonEvent);
      AppState.removeEventListener("change", this._handleAppStateChange);
      AdMobRewarded.removeAllListeners();
      AdMobInterstitial.removeAllListeners();
      this.props.navigation.navigate('homePage');
    }
  })
  return true;
}

  statDecider(y) {
    /*
    x:
      0 - ready
      1 - hp
      2 - mana
      3 - pStat
      4 - rStat
      5 - sStat
      6 - winImg
      7 - batImg
      8 - msgStat
      9 - msg
      10 - msgOpen
    x >= 11 - asking for opponent stats
    Subtract 11 from x for opp stat
    Things that are not required for requesting for opponent can be given negative values:
    -1 - song
    -2 - gs (gameStats)
    */

    let h = this.host;
    let x = y;

    if (y >= 11) {
      x -= 11;
      h = 1 - h; // makes opponent the host temporarily
    }

    if (h === 1) {
      switch (x) {
        case -1: return this.state.song1;
        case -2: return this.state.gs.p1;
        case 0: return this.state.ready1;
        case 1: return this.state.hp1;
        case 2: return this.state.mana1;
        case 3: return this.state.pStat1;
        case 4: return this.state.rStat1;
        case 5: return this.state.sStat1;
        case 6: return this.state.winImg1;
        case 7: return this.state.batImg1;
        case 8: return this.state.msgStat1;
        case 9: return this.state.msg1;
        case 10: return this.state.msgOpen1;
        default:
      }
    } else if (h === 0) {
      switch (x) {
        case -1: return this.state.song2;
        case -2: return this.state.gs.p2;
        case 0: return this.state.ready2;
        case 1: return this.state.hp2;
        case 2: return this.state.mana2;
        case 3: return this.state.pStat2;
        case 4: return this.state.rStat2;
        case 5: return this.state.sStat2;
        case 6: return this.state.winImg2;
        case 7: return this.state.batImg2;
        case 8: return this.state.msgStat2;
        case 9: return this.state.msg2;
        case 10: return this.state.msgOpen2;
        default:
      }
    }
  }

  modal() {
    return (
      <View style={{height: '75%',width: '40%', marginTop: '7%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
        <Image source={this.state.frame} style={styles.imageStyle} />
        <TouchableOpacity style={{ position: 'absolute', left: '34%', top: '0%', height: 20 }} onPress={() => this.setState({ modalVisible: false })}>
          <Image source={this.state.msg.includes("Game Over")?'':crossImg} style={{ resizeMode: 'contain', height: '100%' }} />
        </TouchableOpacity>
        <View style={{ height: '74%', width: '79%', backgroundColor: 'grey'}}>
          <Text
            style={{
              textShadowColor: 'grey',
              textShadowOffset: { width: 1, height: 1 },
              color: '#fdfdfd',
              fontSize: f * 14,
              textAlign: 'center',
              margin: '5%',
              marginRight: '10%',
              marginBottom: '0%',
              fontFamily: 'serif',
              fontWeight: '700'
            }}
          >
            {this.state.msg}
          </Text>
          <TouchableOpacity onPress={this.state.callback?this.state.callback.bind(this):''} style={{ alignItems: 'center', justifyContent: 'center', height: '60%' }}>
            <Image source={this.state.obj?this.state.obj:''} style={{ resizeMode: 'contain', width: '40%' }} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  manaChecker(bm) {
    // bm = base move (1, 2 or 3)
    switch (bm) {
      case 1: if (this.statDecider(2) >= 1) {
        return (
          <Image source={paperArrowImg} style={styles.arrowStyle} />
        );
      }
      return <Image source={paperInArrowImg} style={styles.arrowStyle} />;

      case 2: if (this.statDecider(2) >= 2) {
        return (
          <Image source={rockArrowImg} style={styles.arrowStyle} />
        );
      }
      return <Image source={rockInArrowImg} style={styles.arrowStyle} />;

      case 3: if (this.statDecider(2) >= 3) {
        return (
          <Image source={sciArrowImg} style={styles.arrowStyle} />
        );
      }
      return <Image source={sciInArrowImg} style={styles.arrowStyle} />;

      default:
    }
  }

  manaUser(bm) {
    // bm = base move (1, 2 or 3)

    let m = this.statDecider(2);

    switch (bm) {

      case 1: if (m >= 1) {
        const stat = this.statDecider(3);
        if (stat === 9) {
          this.setState({
            modalVisible: true,
            frame: greenModImg,
            msg: 'How much more do you want to Evolve?\nYou\'re maxed out!\n\n(▀̿Ĺ̯▀̿ ̿)',
            obj: undefined
          });
        } else {
          this.setState({
            modalVisible: true,
            frame: greenModImg,
            msg: 'You evolved your ' + paper[stat].name + ' to ' + paper[stat + 1].name
            + '\n\n:･ﾟ✧  ʕ ␥_␥ʔ  :･ﾟ✧',
            obj: paper[stat + 1].img
          });
          m -= 1;
          if (this.host === 1) {
            firebase.database().ref('users/'+this.uid+'/game').update({ mana1: m, pStat1: stat + 1 });
          } else {
            firebase.database().ref('users/'+this.uid+'/game').update({ mana2: m, pStat2: stat + 1 });
          }
        }
      } else {
        this.setState({
          modalVisible: true,
          frame: redModImg,
          msg: "Oops! You ain't got that kind of Mana."
          + 'You need at least 1.\n ¯\\_(ツ)_/¯\n'
          + 'Want to watch a Video to earn 5 mana?',
          obj: adImg,
          callback: () => {
            TrackPlayer.pause()
            ToastAndroid.show('Fetching Video...', ToastAndroid.LONG);
            AdMobRewarded.setAdUnitID('ca-app-pub-5251664647281296/9648656822');
            AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd()).catch(
              () => {
                if (this.statDecider(-1) === songImg) {
                  TrackPlayer.play()
                }
                ToastAndroid.show('Video not available currently :(', ToastAndroid.SHORT);
            });
          }
        })
      }
      break;

      case 2: if (m >= 2) {
        const stat = this.statDecider(4);
        if (stat === 9) {
          this.setState({
            modalVisible: true,
            frame: greenModImg,
            msg: 'How much more do you want to Evolve?\nYou\'re maxed out!\n\n(▀̿Ĺ̯▀̿ ̿)',
            obj: undefined
          });
        } else {
          this.setState({
            modalVisible: true,
            frame: greenModImg,
            msg: 'You evolved your ' + rock[stat].name + ' to ' + rock[stat + 1].name
            + '\n\n:･ﾟ✧ ┌༼▀̿̿Ĺ̯̿̿▀̿༽┘ :･ﾟ✧',
            obj: rock[stat + 1].img
          });
          m -= 2;
          if (this.host === 1) {
            firebase.database().ref('users/'+this.uid+'/game').update({ mana1: m, rStat1: stat + 1 });
          } else {
            firebase.database().ref('users/'+this.uid+'/game').update({ mana2: m, rStat2: stat + 1 });
          }
        }
      } else {
        this.setState({
          modalVisible: true,
          frame: redModImg,
          msg: "Oops! You ain't got that kind of Mana."
          + 'You need at least 2.\n ¯\\_(ツ)_/¯\n'
          + 'Want to watch a Video to earn 5 mana?',
          obj: adImg,
          callback: () => {
            TrackPlayer.pause()
            ToastAndroid.show('Fetching Video...', ToastAndroid.LONG);
            AdMobRewarded.setAdUnitID('ca-app-pub-5251664647281296/9648656822');
            AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd()).catch(
              () => {
                if (this.statDecider(-1) === songImg) {
                  TrackPlayer.play()
                }
                ToastAndroid.show('Video not available currently :(', ToastAndroid.SHORT);
            });
          }
        })
      }
      break;

      case 3: if (m >= 3) {
        const stat = this.statDecider(5);
        if (stat === 9) {
          this.setState({
            modalVisible: true,
            frame: greenModImg,
            msg: 'How much more do you want to Evolve?\nYou\'re maxed out!\n\n(▀̿Ĺ̯▀̿ ̿)',
            obj: undefined
          });
        } else {
          this.setState({
            modalVisible: true,
            frame: greenModImg,
            msg: 'You evolved your ' + scissors[stat].name + ' to ' + scissors[stat + 1].name
            + '\n\n:･ﾟ✧ ┌(★o☆)┘ :･ﾟ✧',
            obj: scissors[stat + 1].img
          });
          m -= 3;
          if (this.host === 1) {
            firebase.database().ref('users/'+this.uid+'/game').update({ mana1: m, sStat1: stat + 1 });
          } else {
            firebase.database().ref('users/'+this.uid+'/game').update({ mana2: m, sStat2: stat + 1 });
          }
        }
      } else {
        this.setState({
          modalVisible: true,
          frame: redModImg,
          msg: "Oops! You ain't got that kind of Mana."
          + 'You need at least 3.\n ¯\\_(ツ)_/¯\n'
          + 'Want to watch a Video to earn 5 mana?',
          obj: adImg,
          callback: () => {
            TrackPlayer.pause()
            ToastAndroid.show('Fetching Video...', ToastAndroid.LONG);
            AdMobRewarded.setAdUnitID('ca-app-pub-5251664647281296/9648656822');
            AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd()).catch(
              () => {
                if (this.statDecider(-1) === songImg) {
                  TrackPlayer.play()
                }
                ToastAndroid.show('Video not available currently :(', ToastAndroid.SHORT);
            });
          }
        })
      }
      break;

      default:
    }
  }

  chatRender() {
    if (this.statDecider(8) === 2) {
      return chatNotifyImg;
    }
    return chatImg;
  }

  chatHandler() {
    /*
    msgOpen:
      1 - open
      0 - closed

    msgStat:
      1 - send message
      2 - received message

    msg1: message sent by host
    msg2: message sent by non-host
    */

    if (this.statDecider(10) === 0) {
      // Only chat icon
      return (
        <TouchableOpacity
          style={styles.chatStyle}
          onPress={() => {
              if (this.host === 1) {
                firebase.database().ref('users/'+this.uid+'/game').update({ msgOpen1: 1 });
              } else {
                firebase.database().ref('users/'+this.uid+'/game').update({ msgOpen2: 1 });
              }
            }
          }
        >
          <Image source={this.chatRender()} style={{ resizeMode: 'contain', height: '100%' }} />
        </TouchableOpacity>
      );
    } else if (this.statDecider(10) === 1) {
      if (this.statDecider(8) === 1) {
        return (
          <View style={styles.chatTabStyle}>
            <TextInput
               placeholder="Trash Talk to the Enemy!"
               placeholderTextColor='#49c06290'
               multiline
               underlineColorAndroid='rgba(0,0,0,0)'
               style={[styles.input, { textAlign: 'center' }]}
               value={this.statDecider(19)==2?'':this.statDecider(9)}
               onChangeText={text => {
                 if (this.host === 1) {
                   firebase.database().ref('users/'+this.uid+'/game').update({ msg1: text });
                 } else {
                   firebase.database().ref('users/'+this.uid+'/game').update({ msg2: text });
                 }
                 this.forceUpdate();
                }
               }
            />

            <View style={styles.chatButtonsStyle}>
              <TouchableOpacity
                style={{ backgroundColor: '#333', borderRadius: 20,  width: '90%' }}
                onPress={() => {
                    ToastAndroid.showWithGravity('Message Sent', ToastAndroid.LONG, ToastAndroid.CENTER);
                    if (this.host === 1) {
                      firebase.database().ref('users/'+this.uid+'/game').update({ msgStat2: 2 });
                    } else {
                      firebase.database().ref('users/'+this.uid+'/game').update({ msgStat1: 2 });
                    }
                    this.forceUpdate();
                  }
                }
              >
                <Text style={[styles.textStyle, { color: '#49c062', alignSelf: 'center', padding: '4%' }]}>Send</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: '#333', borderRadius: 20,  width: '90%' }}
                onPress={() => {
                    if (this.host === 1) {
                      firebase.database().ref('users/'+this.uid+'/game').update({ msgOpen1: 0 });
                    } else {
                      firebase.database().ref('users/'+this.uid+'/game').update({ msgOpen2: 0 });
                    }
                  }
                }
              >
                <Text style={[styles.textStyle, { color: '#49c062', alignSelf: 'center', padding: '4%' }]}>Close</Text>
              </TouchableOpacity>
            </View>

          </View>
        );
      } else if (this.statDecider(8) === 2) {
        return (
          <View style={styles.chatTabStyle}>

            <View style={styles.input}>
              <Text style={{ color: '#49c062', fontSize: 18 }}>
                {this.statDecider(20)}
              </Text>
            </View>

            <View style={styles.chatButtonsStyle}>
              <TouchableOpacity
              style={{ backgroundColor: '#333', borderRadius: 20,  width: '90%' }}
                onPress={() => {
                    if (this.host === 1) {
                      firebase.database().ref('users/'+this.uid+'/game').update({ msg1: '', msgStat1: 1 });
                    } else {
                      firebase.database().ref('users/'+this.uid+'/game').update({ msg2: '', msgStat2: 1 });
                    }
                  }
                }
              >
                <Text style={[styles.textStyle, { color: '#49c062', alignSelf: 'center', padding: '4%' }]}>Reply</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: '#333', borderRadius: 20,  width: '90%' }}
                onPress={() => {
                    if (this.host === 1) {
                      firebase.database().ref('users/'+this.uid+'/game').update({ msgOpen1: 0 });
                    } else {
                      firebase.database().ref('users/'+this.uid+'/game').update({ msgOpen2: 0 });
                    }
                  }
                }
              >
                <Text style={[styles.textStyle, { color: '#49c062', alignSelf: 'center', padding: '4%' }]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
  }

  supChDisp(o, v) {
    // o = opponent stats request
    let h = this.host;

    if (h === 0) {
      h = 2;
    }

    if (o === 1) {
      if (h === 1) {
        h = 2;
      } else if (h === 2) {
        h = 1;
      }
    }

    if (h === this.state.supCh) {
      return v * 2;
    }
    return v;
  }

  decider() {
    // paper = 1, rock = 2, scissors = 3

    let tap1;
    let tap2;

    firebase.database().ref('users/'+this.uid+'/game').on('value', (dataSnapshot) => {
      tap1 = dataSnapshot.child('ready1').val();
      tap2 = dataSnapshot.child('ready2').val();
    });

    if (!(tap1 === 0 || tap2 === 0)) {
      let bi1 = null;
      let bi2 = null;
      let bn1 = '';
      let bn2 = '';
      let wi1 = null;
      let wi2 = null;
      let w = 0;
      let h1 = this.state.hp1;
      let h2 = this.state.hp2;
      let m1 = this.state.mana1;
      let m2 = this.state.mana2;
      let wm = this.state.winMem;
      let sc = this.state.supCh;
      let c = 1;

      switch (tap1) {
        case 1: bi1 = paper[this.state.pStat1].img;
                bn1 = paper[this.state.pStat1].name; break;
        case 2: bi1 = rock[this.state.rStat1].img;
                bn1 = rock[this.state.rStat1].name; break;
        case 3: bi1 = scissors[this.state.sStat1].img;
                bn1 = scissors[this.state.sStat1].name; break;
        default:
      }

      switch (tap2) {
        case 1: bi2 = paper[this.state.pStat2].img;
                bn2 = paper[this.state.pStat2].name; break;
        case 2: bi2 = rock[this.state.rStat2].img;
                bn2 = rock[this.state.rStat2].name; break;
        case 3: bi2 = scissors[this.state.sStat2].img;
                bn2 = scissors[this.state.sStat2].name; break;
        default:
      }

      if ((tap1 === 1 && tap2 === 2) || (tap1 === 2 && tap2 === 3) || (tap1 === 3 && tap2 === 1)) {
        w = 1;
        m1++;
        wi1 = happy1;
        wi2 = sad2;
        if (this.host === 1) {
          if (tap1 === 1) {
            gameStats.p1.paper.won += 1;
            gameStats.p2.rock.lost += 1;
          } else if (tap1 === 2) {
            gameStats.p1.rock.won += 1;
            gameStats.p2.scissors.lost += 1;
          } else {
            gameStats.p1.scissors.won += 1;
            gameStats.p2.paper.lost += 1;
          }
        }
      } else if (tap1 !== tap2) {
        w = 2;
        m2++;
        wi1 = sad1;
        wi2 = happy2;
        if (this.host === 1) {
          if (tap1 === 1) {
            gameStats.p1.paper.lost += 1;
            gameStats.p2.scissors.won += 1;
          } else if (tap1 === 2) {
            gameStats.p1.rock.lost += 1;
            gameStats.p2.paper.won += 1;
          } else {
            gameStats.p1.scissors.lost += 1;
            gameStats.p2.rock.won += 1;
          }
        }
      } else {
        w = 0;
        wi1 = happy1;
        wi2 = happy2;
        if (this.host === 1) {
          if (tap1 === 1) {
            gameStats.p1.paper.draw += 1;
            gameStats.p2.paper.draw += 1;
          } else if (tap1 === 2) {
            gameStats.p1.rock.draw += 1;
            gameStats.p2.rock.draw += 1;
          } else {
            gameStats.p1.scissors.draw += 1;
            gameStats.p2.scissors.draw += 1;
          }
        }
      }

      if (sc !== 0) {
        c = 2;
      }
      if (w === 1) {
        switch (tap1) {
          case 1: h2 -= c * paper[this.state.pStat1].atk; break;
          case 2: h2 -= c * rock[this.state.rStat1].atk; break;
          case 3: h2 -= c * scissors[this.state.sStat1].atk; break;
          default: h2 = 0;
        }
      } else if (w === 2) {
        switch (tap2) {
          case 1: h1 -= c * paper[this.state.pStat2].atk; break;
          case 2: h1 -= c * rock[this.state.rStat2].atk; break;
          case 3: h1 -= c * scissors[this.state.sStat2].atk; break;
          default: h1 = 0;
        }
      }

      if (w === wm) {
        if (wm === 1) {
          sc = 1;
          wi1 = rage1;
        } else if (wm === 2) {
          sc = 2;
          wi2 = rage2;
        }
      } else if (w === 0) {
        if (sc === 0) {
          wm = 0;
        } else {
          if (wm === 1) {
            wi1 = rage1;
          } else if (wm === 2) {
            wi2 = rage2;
          }
        }
      } else {
        sc = 0;
        wm = w;
      }

      if (h1 <= 0) {
        if (this.host === 1) {
          this.setState({
            modalVisible: true,
            frame: redModImg,
            msg: 'Game Over : YOU LOSE!\nWhat a great Battle!'
            + '\n\nLet us have a look at the statistics of your game!',
            obj: statsImg,
            callback: () => {
              TrackPlayer.pause()
              AdMobInterstitial.setAdUnitID('ca-app-pub-5251664647281296/6187762268');
              AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd()).catch(
                () => {
                  TrackPlayer.stop()
                  AdMobRewarded.removeAllListeners();
                  AdMobInterstitial.removeAllListeners();
                  BackHandler.removeEventListener('hardwareBackPress', this.backButtonEvent);
                  AppState.removeEventListener("change", this._handleAppStateChange);
                  this.setState({ modalVisible: false });
                  this.props.navigation.navigate('statsPage', { gameStats: this.statDecider(-2) });
              });
              ToastAndroid.show('Calculating Game Stats... (▀̿Ĺ̯▀̿ ̿)', ToastAndroid.LONG);
              AdMobInterstitial.addEventListener('adClosed',
                () => {
                  TrackPlayer.stop()
                  AdMobRewarded.removeAllListeners();
                  AdMobInterstitial.removeAllListeners();
                  BackHandler.removeEventListener('hardwareBackPress', this.backButtonEvent);
                  AppState.removeEventListener("change", this._handleAppStateChange);
                  this.setState({ modalVisible: false });
                  this.props.navigation.navigate('statsPage', { gameStats: this.statDecider(-2) });
                }
              );
            }
          })
        } else {
          this.setState({
            modalVisible: true,
            frame: redModImg,
            msg: 'Game Over : YOU WIN!\nWhat a great Battle!'
            + '\n\nLet us have a look at the statistics of your game!',
            obj: statsImg,
            callback: () => {
              TrackPlayer.pause()
              AdMobInterstitial.setAdUnitID('ca-app-pub-5251664647281296/6187762268');
              AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd()).catch(
                () => {
                  TrackPlayer.stop()
                  AdMobRewarded.removeAllListeners();
                  AdMobInterstitial.removeAllListeners();
                  BackHandler.removeEventListener('hardwareBackPress', this.backButtonEvent);
                  AppState.removeEventListener("change", this._handleAppStateChange);
                  this.setState({ modalVisible: false });
                  this.props.navigation.navigate('statsPage', { gameStats: this.statDecider(-2) });
              });
              ToastAndroid.show('Calculating Game Stats... (▀̿Ĺ̯▀̿ ̿)', ToastAndroid.LONG);
              AdMobInterstitial.addEventListener('adClosed',
                () => {
                  TrackPlayer.stop()
                  AdMobRewarded.removeAllListeners();
                  AdMobInterstitial.removeAllListeners();
                  BackHandler.removeEventListener('hardwareBackPress', this.backButtonEvent);
                  AppState.removeEventListener("change", this._handleAppStateChange);
                  this.setState({ modalVisible: false });
                  this.props.navigation.navigate('statsPage', { gameStats: this.statDecider(-2) });
                }
              );
            }
          })
        }
      } else if (h2 <= 0) {
        if (this.host === 0) {
          this.setState({
            modalVisible: true,
            frame: greenModImg,
            msg: 'Game Over : YOU LOSE!\nWhat a great Battle!'
            + '\n\nLet us have a look at the statistics of your game!',
            obj: statsImg,
            callback: () => {
              TrackPlayer.pause()
              AdMobInterstitial.setAdUnitID('ca-app-pub-5251664647281296/6187762268');
              AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd()).catch(
                () => {
                  TrackPlayer.stop()
                  AdMobRewarded.removeAllListeners();
                  AdMobInterstitial.removeAllListeners();
                  BackHandler.removeEventListener('hardwareBackPress', this.backButtonEvent);
                  AppState.removeEventListener("change", this._handleAppStateChange);
                  this.setState({ modalVisible: false });
                  this.props.navigation.navigate('statsPage', { gameStats: this.statDecider(-2) });
              });
              ToastAndroid.show('Calculating Game Stats... (▀̿Ĺ̯▀̿ ̿)', ToastAndroid.LONG);
              AdMobInterstitial.addEventListener('adClosed',
                () => {
                  TrackPlayer.stop()
                  AdMobRewarded.removeAllListeners();
                  AdMobInterstitial.removeAllListeners();
                  BackHandler.removeEventListener('hardwareBackPress', this.backButtonEvent);
                  AppState.removeEventListener("change", this._handleAppStateChange);
                  this.setState({ modalVisible: false });
                  this.props.navigation.navigate('statsPage', { gameStats: this.statDecider(-2) });
                }
              );
            }
          })
        } else {
          this.setState({
            modalVisible: true,
            frame: greenModImg,
            msg: 'Game Over : YOU WIN!\nWhat a great Battle!'
            + '\n\nLet us have a look at the statistics of your game!',
            obj: statsImg,
            callback: () => {
              TrackPlayer.pause()
              AdMobInterstitial.setAdUnitID('ca-app-pub-5251664647281296/6187762268');
              AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd()).catch(
                () => {
                  TrackPlayer.stop()
                  AdMobRewarded.removeAllListeners();
                  AdMobInterstitial.removeAllListeners();
                  BackHandler.removeEventListener('hardwareBackPress', this.backButtonEvent);
                  AppState.removeEventListener("change", this._handleAppStateChange);
                  this.setState({ modalVisible: false });
                  this.props.navigation.navigate('statsPage', { gameStats: this.statDecider(-2) });
              });
              ToastAndroid.show('Calculating Game Stats... (▀̿Ĺ̯▀̿ ̿)', ToastAndroid.LONG);
              AdMobInterstitial.addEventListener('adClosed',
                () => {
                  TrackPlayer.stop()
                  AdMobRewarded.removeAllListeners();
                  AdMobInterstitial.removeAllListeners();
                  BackHandler.removeEventListener('hardwareBackPress', this.backButtonEvent);
                  AppState.removeEventListener("change", this._handleAppStateChange);
                  this.setState({ modalVisible: false });
                  this.props.navigation.navigate('statsPage', { gameStats: this.statDecider(-2) });
                }
              );
            }
          })
        }
      }

      firebase.database().ref('users/'+this.uid+'/game').update({
        winner: w,
        winMem: wm,
        supCh: sc,
        inactive: this.state.delay == 0?false:true,

        ready1: 0,
        ready2: 0,

        hp1: h1,
        hp2: h2,
        mana1: m1,
        mana2: m2
      });

      if (this.host === 1) {
          firebase.database().ref('users/'+this.uid+'/game').update({ batImg1: bi1 });
          setTimeout(() => {
            firebase.database().ref('users/'+this.uid+'/game').update({ batImg2: bi2 });
            setTimeout(() => {
              if (w === 1) {
              } else if (w === 2) {
              }
              firebase.database().ref('users/'+this.uid+'/game').update({ winImg1: wi1, winImg2: wi2, gs: gameStats, inactive: false });
            }, delay);
          }, delay);
      } else {
          firebase.database().ref('users/'+this.uid+'/game').update({ batImg2: bi2 });
          setTimeout(() => {
            firebase.database().ref('users/'+this.uid+'/game').update({ batImg1: bi1 });
            setTimeout(() => {
            if (w === 2) {
            } else if (w === 1) {
            }
            firebase.database().ref('users/'+this.uid+'/game').update({ winImg1: wi1, winImg2: wi2, inactive: false });
          }, delay);
        }, delay);
      }
    } else if (this.host === 1 && tap1 !== 0) {
      firebase.database().ref('users/'+this.uid+'/game').update({
        winImg1: ready1,
        batImg1: null,
        batImg2: null
      });
    } else if (this.host === 0 && tap2 !== 0) {
      firebase.database().ref('users/'+this.uid+'/game').update({
        winImg2: ready2,
        batImg1: null,
        batImg2: null
      });
    }
  }

  songHandler(x) {
    if (this.host === 1) {
      if (x === songImg) {
        TrackPlayer.pause()
        firebase.database().ref('users/'+this.uid+'/game').update({ song1: noSongImg });
      } else {
        TrackPlayer.play()
        firebase.database().ref('users/'+this.uid+'/game').update({ song1: songImg });
      }
    } else {
      if (x === songImg) {
        TrackPlayer.pause()
        firebase.database().ref('users/'+this.uid+'/game').update({ song2: noSongImg });
      } else {
        TrackPlayer.play()
        firebase.database().ref('users/'+this.uid+'/game').update({ song2: songImg });
      }
    }
  }

  delayHandler() {
    if (delay === 1000) {
      delay = 0;
      firebase.database().ref('users/'+this.uid+'/game').update({ speed: speedImg });
    } else {
      delay = 1000;
      firebase.database().ref('users/'+this.uid+'/game').update({ speed: noSpeedImg });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }} >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.state.msg.includes("Game Over")?'':this.setState({ modalVisible: false })}
        >
          {this.modal()}
        </Modal>
        <ImageBackground source={background} style={{ flex: 1 }}>
          <View style={styles.statsStyle} >
            {/* Stats Area */}
            <TouchableOpacity
              style={styles.muteStyle}
              onPress={() => this.songHandler(this.statDecider(-1))}
            >
              <Image source={this.statDecider(-1)} style={{ resizeMode: 'contain', height: '100%' }} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.speedStyle}
              onPress={() => this.delayHandler()}
            >
              <Image source={this.state.speed} style={{ resizeMode: 'contain', height: '100%' }} />
            </TouchableOpacity>

            <View style={[styles.statsContainerStyle, { left: '18%', borderColor: '#0392cf', backgroundColor: '#0392cf30', width: '20%', padding: '5%' }]}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.textStyle, { color: 'black', fontSize: f * 13 }]}>HP : </Text>
                <Text style={[styles.textStyle, { color: 'black', position: 'absolute', fontSize: f * 13, right: 0 }]}>{this.state.hp1}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.textStyle, { color: 'black', fontSize: f * 13 }]}>MANA : </Text>
                <Text style={[styles.textStyle, { color: 'black', position: 'absolute', fontSize: f * 13, right: 0 }]}>{this.state.mana1}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.textStyle, { color: 'black', fontSize: f * 13 }]}>{scissors[this.state.sStat1].name} : </Text>
                <Text style={[styles.textStyle, { color: 'black', position: 'absolute', fontSize: f * 13, right: 0 }]}>{this.supChDisp(0, scissors[this.state.sStat1].atk)}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.textStyle, { color: 'black', fontSize: f * 13 }]}>{rock[this.state.rStat1].name} : </Text>
                <Text style={[styles.textStyle, { color: 'black', position: 'absolute', fontSize: f * 13, right: 0 }]}>{this.supChDisp(0, rock[this.state.rStat1].atk)}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.textStyle, { color: 'black', fontSize: f * 13 }]}>{paper[this.state.pStat1].name} : </Text>
                <Text style={[styles.textStyle, { color: 'black', position: 'absolute', fontSize: f * 13, right: 0 }]}>{this.supChDisp(0, paper[this.state.pStat1].atk)}</Text>
              </View>
            </View>

            <View style={[styles.statsContainerStyle, { left: '53%', borderColor: '#dd4466', backgroundColor: '#dd446640', width: '20%', padding: '5%' }]}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.textStyle, { color: 'black', fontSize: f * 13 }]}>HP : </Text>
                <Text style={[styles.textStyle, { color: 'black', position: 'absolute', fontSize: f * 13, right: 0 }]}>{this.state.hp2}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.textStyle, { color: 'black', fontSize: f * 13 }]}>MANA : </Text>
                <Text style={[styles.textStyle, { color: 'black', position: 'absolute', fontSize: f * 13, right: 0 }]}>{this.state.mana2}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.textStyle, { color: 'black', fontSize: f * 13 }]}>{scissors[this.state.sStat2].name} : </Text>
                <Text style={[styles.textStyle, { color: 'black', position: 'absolute', fontSize: f * 13, right: 0 }]}>{this.supChDisp(0, scissors[this.state.sStat2].atk)}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.textStyle, { color: 'black', fontSize: f * 13 }]}>{rock[this.state.rStat2].name} : </Text>
                <Text style={[styles.textStyle, { color: 'black', position: 'absolute', fontSize: f * 13, right: 0 }]}>{this.supChDisp(0, rock[this.state.rStat2].atk)}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.textStyle, { color: 'black', fontSize: f * 13 }]}>{paper[this.state.pStat2].name} : </Text>
                <Text style={[styles.textStyle, { color: 'black', position: 'absolute', fontSize: f * 13, right: 0 }]}>{this.supChDisp(0, paper[this.state.pStat2].atk)}</Text>
              </View>
            </View>
            {this.chatHandler()}
          </View>
          <View style={{ flex: 0.6, flexDirection: 'row' }}>
            {/* Bottom Area */}
            <View style={{ flex: 0.65 }} >
              {/* Left Bottom Area */}
              <View style={{ flex: 0.65 }}>
                {/* Characters Area */}
                <Image source={this.state.winImg1} style={styles.p1Style} />
                <Image source={this.state.winImg2} style={styles.p2Style} />
                <TouchableOpacity
                  style={{
                    resizeMode: 'contain',
                    position: 'absolute',
                    height: '40%',
                    width: '15%',
                    top: '25%',
                    left: '0%'
                  }}
                  onPress={() => this.manaUser(3)}
                >
                  {this.manaChecker(3)}
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                    resizeMode: 'contain',
                    position: 'absolute',
                    height: '40%',
                    width: '15%',
                    top: '68%',
                    left: '0%'
                  }}
                  onPress={() => this.manaUser(2)}
                >
                  {this.manaChecker(2)}
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                    resizeMode: 'contain',
                    position: 'absolute',
                    height: '40%',
                    width: '15%',
                    top: '110%',
                    left: '0%'
                  }}
                  onPress={() => this.manaUser(1)}
                >
                  {this.manaChecker(1)}
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.35 }}>
                {/* Weapon Area */}
                <Text style={[styles.pLabelStyle, { color: '#5577dd', left: '35%', fontFamily: 'serif', fontWeight: 'bold' }]}>HOST</Text>
                <Image source={this.state.batImg1} style={styles.p1WeaponStyle} />
                <Image source={this.state.batImg2} style={styles.p2WeaponStyle} />
                <Text style={[styles.pLabelStyle, { color: '#dd4466', left: '88%', bottom: '70%', fontFamily: 'serif', fontWeight: 'bold' }]}>FRIEND</Text>
              </View>
            </View>
            <View style={{ flex: 0.35, justifyContent: 'flex-end' }} >
              {/* Buttons Area */}

              <View style={{ width: '100%', height: '25%', flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{ width: '75%' }}
                  disabled={this.state.inactive}
                  onPress={() => {
                    if (this.host === 1) {
                      firebase.database().ref('users/'+this.uid+'/game').update({ ready1: 3 });
                    } else {
                      firebase.database().ref('users/'+this.uid+'/game').update({ ready2: 3 });
                    }
                    this.decider();
                  }}
                >
                  <Image source={sciButton} style={styles.buttonStyle} />
                  <View style={styles.textContainer}>
                    <Text style={[styles.textStyle, { color: 'black' }]}>
                      {scissors[this.statDecider(5)].name}
                    </Text>
                    <Text style={[styles.textStyle, { color: '#555' }]}>
                      ATK: {this.supChDisp(0, scissors[this.statDecider(5)].atk)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/*---------------------------------------------------------------*/}
              <View style={{ width: '100%', height: '25%', flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{ width: '75%' }}
                  disabled={this.state.inactive}
                  onPress={() => {
                    if (this.host === 1) {
                      firebase.database().ref('users/'+this.uid+'/game').update({ ready1: 2 });
                    } else {
                      firebase.database().ref('users/'+this.uid+'/game').update({ ready2: 2 });
                    }
                    this.decider();
                  }}
                >
                  <Image source={rockButton} style={styles.buttonStyle} />
                  <View style={styles.textContainer}>
                    <Text style={[styles.textStyle, { color: 'black' }]}>
                      {rock[this.statDecider(4)].name}
                    </Text>
                    <Text style={[styles.textStyle, { color: '#555' }]}>
                      ATK: {this.supChDisp(0, rock[this.statDecider(4)].atk)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/*---------------------------------------------------------------*/}
              <View style={{ width: '100%', height: '25%', flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{ width: '75%' }}
                  disabled={this.state.inactive}
                  onPress={() => {
                    if (this.host === 1) {
                      firebase.database().ref('users/'+this.uid+'/game').update({ ready1: 1 });
                    } else {
                      firebase.database().ref('users/'+this.uid+'/game').update({ ready2: 1 });
                    }
                    this.decider();
                  }}
                >
                  <Image source={paperButton} style={styles.buttonStyle} />
                  <View style={styles.textContainer}>
                    <Text style={[styles.textStyle, { color: 'black' }]}>
                      {paper[this.statDecider(3)].name}
                    </Text>
                    <Text style={[styles.textStyle, { color: '#555' }]}>
                      ATK: {this.supChDisp(0, paper[this.statDecider(3)].atk)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  p1Style: {
    resizeMode: 'contain',
    position: 'absolute',
    height: '100%',
    width: '50%',
    top: '5%',
    left: '16%'
  },
  p2Style: {
    resizeMode: 'contain',
    position: 'absolute',
    height: '100%',
    width: '50%',
    top: '0%',
    left: '73%'
  },
  p1WeaponStyle: {
    resizeMode: 'contain',
    position: 'absolute',
    height: '80%',
    width: '50%',
    bottom: '35%',
    left: '32%'
  },
  p2WeaponStyle: {
    resizeMode: 'contain',
    position: 'absolute',
    height: '80%',
    width: '50%',
    bottom: '35%',
    left: '52%'
  },
  imageStyle: {
    resizeMode: 'stretch',
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  buttonStyle: {
    resizeMode: 'stretch',
    position: 'absolute',
    width: '105%',
    height: '110%',
    left: '27%',
    bottom: '10%'
  },
  arrowStyle: {
    resizeMode: 'stretch',
    position: 'absolute',
    width: '90%',
    height: '100%',
    right: '0%'
  },
  textContainer: {
    flex: 1,
    left: '40%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '14%'
  },
  textStyle: {
    fontSize: f * 15,
    textShadowColor: 'grey',
    textShadowOffset: { width: 1, height: 1 },
    fontStyle: 'italic',
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
  statsContainerStyle: {
    position: 'absolute',
    top: '20%',
    borderWidth: 1,
    borderRadius: 15
  },
  statsStyle: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  pLabelStyle: {
    fontSize: f * 15,
    textShadowColor: 'grey',
    textShadowOffset: { width: 1, height: 1 },
    bottom: '65%',
    position: 'absolute',
    fontStyle: 'italic'
  },
  muteStyle: {
    position: 'absolute',
    top: '7%',
    left: '1%',
    height: '33%',
    width: '20%'
  },
  chatStyle: {
    position: 'absolute',
    top: '32%',
    left: '83%',
    height: '47%',
    width: '27%'
  },
  speedStyle: {
    position: 'absolute',
    top: '40%',
    left: '-4%',
    height: '31%',
    width: '21%'
  },
  chatButtonsStyle: {
    position: 'absolute',
    height: '100%',
    width: '20%',
    justifyContent: 'space-around',
    alignItems: 'center',
    right: '0%'
  },
  input: {
    position: 'absolute',
    height: '100%',
    width: '80%',
    backgroundColor: '#222',
    color: '#49c062',
    fontSize: f * 13,
    borderRadius: 10,
    paddingLeft: 15,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#49c062'
  },
  chatTabStyle: {
    position: 'absolute',
    width: '50%',
    height: '55%',
    right: '1%',
    top: '30%',
    flexDirection: 'row'
  }
};

export default MainFrameOnline;
