import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  PixelRatio,
  ToastAndroid,
  AppState
} from 'react-native';
import { AdMobBanner, AdMobRewarded, AdMobInterstitial } from 'react-native-admob';
import firebase from 'firebase';

let f = 1;

const backImg = require('../../images/backgroundBlur.jpg');

const table = {
  row0: {
    cell0: {
      text: '｡◕‿◕｡',
      bgColor: '#5bc133',
      weight: 'bold'
    },
    cell1: {
      text: 'Played',
      bgColor: '#5bc133',
    },
    cell2: {
      text: 'Won',
      bgColor: '#5bc133'
    },
    cell3: {
      text: 'Lost',
      bgColor: '#5bc133'
    },
    cell4: {
      text: 'Drew',
      bgColor: '#5bc133'
    }
  },
  row1: {
    cell0: {
      text: 'Overall',
      bgColor: '#5bc133',
      weight: 'normal'
    },
    cell1: {
      text: 0,
      bgColor: '#6ed147',
    },
    cell2: {
      text: 0,
      bgColor: '#6ed147'
    },
    cell3: {
      text: 0,
      bgColor: '#6ed147'
    },
    cell4: {
      text: 0,
      bgColor: '#6ed147'
    }
  },
  row2: {
    cell0: {
      text: 'Scissors',
      bgColor: '#5bc133',
      weight: 'bold'
    },
    cell1: {
      text: 0,
      bgColor: '#6ed147',
    },
    cell2: {
      text: 0,
      bgColor: '#8ae069'
    },
    cell3: {
      text: 0,
      bgColor: '#8ae069'
    },
    cell4: {
      text: 0,
      bgColor: '#8ae069'
    }
  },
  row3: {
    cell0: {
      text: 'Rock',
      bgColor: '#5bc133',
      weight: 'normal'
    },
    cell1: {
      text: 0,
      bgColor: '#6ed147',
    },
    cell2: {
      text: 0,
      bgColor: '#8ae069'
    },
    cell3: {
      text: 0,
      bgColor: '#8ae069'
    },
    cell4: {
      text: 0,
      bgColor: '#8ae069'
    }
  },
  row4: {
    cell0: {
      text: 'Paper',
      bgColor: '#5bc133',
      weight: 'normal'
    },
    cell1: {
      text: 0,
      bgColor: '#6ed147',
    },
    cell2: {
      text: 0,
      bgColor: '#8ae069'
    },
    cell3: {
      text: 0,
      bgColor: '#8ae069'
    },
    cell4: {
      text: 0,
      bgColor: '#8ae069'
    }
  }
};

class StatsPage extends Component {

  constructor(props) {
    super(props);

    f = PixelRatio.getFontScale(); //Font Factor
    const gameStats = props.route.params.gameStats;
    this.host = props.route.params.host;
    this.uid = props.route.params.uid;

    table.row2.cell2.text = gameStats.scissors.won;
    table.row2.cell3.text = gameStats.scissors.lost;
    table.row2.cell4.text = gameStats.scissors.draw;

    table.row3.cell2.text = gameStats.rock.won;
    table.row3.cell3.text = gameStats.rock.lost;
    table.row3.cell4.text = gameStats.rock.draw;

    table.row4.cell2.text = gameStats.paper.won;
    table.row4.cell3.text = gameStats.paper.lost;
    table.row4.cell4.text = gameStats.paper.draw;

    table.row2.cell1.text = table.row2.cell2.text + table.row2.cell3.text + table.row2.cell4.text;
    table.row3.cell1.text = table.row3.cell2.text + table.row3.cell3.text + table.row3.cell4.text;
    table.row4.cell1.text = table.row4.cell2.text + table.row4.cell3.text + table.row4.cell4.text;

    table.row1.cell2.text = table.row2.cell2.text + table.row3.cell2.text + table.row4.cell2.text;
    table.row1.cell3.text = table.row2.cell3.text + table.row3.cell3.text + table.row4.cell3.text;
    table.row1.cell4.text = table.row2.cell4.text + table.row3.cell4.text + table.row4.cell4.text;

    table.row1.cell1.text = table.row1.cell2.text + table.row1.cell3.text + table.row1.cell4.text;

    AdMobRewarded.removeAllListeners();
    AdMobInterstitial.removeAllListeners();
    this.handleBack = this.handleBack.bind(this);
  }

  state= { appState: AppState.currentState }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', () => this.handleBack());
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState === "active" &&
      nextAppState.match(/inactive|background/)) {
        if (this.host == 1)
          firebase.database().ref('users/'+this.uid+'/game').update({ present1: 0 })
        else
          firebase.database().ref('users/'+this.uid+'/game').update({ present2: 0 })
      }
    this.setState({ appState: nextAppState });
  };
  

  handleBack() {
    if (this.host == 1)
      firebase.database().ref('users/'+this.uid+'/game').update({ present1: 0 })
    else
      firebase.database().ref('users/'+this.uid+'/game').update({ present2: 0 })
    AppState.removeEventListener("change", this._handleAppStateChange);
    this.props.navigation.navigate('homePage');
    return true;
  }

  renderRow(row, num) {
    //Row with 5 cells
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.cellStyle, { backgroundColor: row.cell0.bgColor, borderTopLeftRadius:num==0?20:0, borderBottomLeftRadius:num==4?20:0 }]}>
          <Text style={styles.textStyle}>{row.cell0.text}</Text>
        </View>
        <View style={[styles.cellStyle, { backgroundColor: row.cell1.bgColor }]}>
          <Text style={styles.textStyle}>{row.cell1.text}</Text>
        </View>
        <View style={[styles.cellStyle, { backgroundColor: row.cell2.bgColor }]}>
          <Text style={styles.textStyle}>{row.cell2.text}</Text>
        </View>
        <View style={[styles.cellStyle, { backgroundColor: row.cell3.bgColor }]}>
          <Text style={styles.textStyle}>{row.cell3.text}</Text>
        </View>
        <View style={[styles.cellStyle, { backgroundColor: row.cell4.bgColor, borderTopRightRadius:num==0?20:0, borderBottomRightRadius:num==4?20:0 }]}>
          <Text style={styles.textStyle}>{row.cell4.text}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ImageBackground source={backImg} style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <AdMobBanner
              adSize="smartbanner"
              adUnitID="ca-app-pub-5251664647281296/4009602742"
            />
          </View>
          <View>
            <AdMobBanner
              adSize="smartbanner"
              adUnitID="ca-app-pub-5251664647281296/7286502773"
            />
          </View>
        </View>
        <View style={{ height: '100%', width: '85%', padding: '1%', alignSelf: 'center' }}>
          <Text style={[styles.titleStyle, { fontFamily: 'serif', fontWeight: 'bold', color: '#444' }]}>
            Game Stats
          </Text>
          {this.renderRow(table.row0, 0)}
          {this.renderRow(table.row1, 1)}
          {this.renderRow(table.row2, 2)}
          {this.renderRow(table.row3, 3)}
          {this.renderRow(table.row4, 4)}
          <TouchableOpacity
          style={{
            backgroundColor: '#6ed147',
            borderColor: '#555',
            borderWidth: 1,
            borderRadius: 20,
            padding: '1%',
            width: '30%',
            marginTop: '3%',
            alignSelf: 'center'
          }}
          onPress={() => {
            if (this.host == 1)
              firebase.database().ref('users/'+this.uid+'/game').update({ present1: 0 })
            else
              firebase.database().ref('users/'+this.uid+'/game').update({ present2: 0 })
            AppState.removeEventListener("change", this._handleAppStateChange);
            this.props.navigation.navigate('homePage')}
            }
          >
            <Text style={[styles.titleStyle, { fontSize: f * 16, color: '#333' }]}>
              Let's Go  ᕕ(ᐛ)ᕗ
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  cellStyle: {
    flex: 1,
    alignSelf: 'stretch'
  },
  textStyle: {
    color: '#555',
    fontSize: f * 15,
    alignSelf: 'center',
    padding: '8%'
  },
  titleStyle: {
    alignSelf: 'center',
    fontSize: f * 21,
    marginBottom: '1%',
    textShadowColor: 'grey',
    textShadowOffset: { width: 1, height: 1 },
    fontStyle: 'italic'
  }
};

export default StatsPage;
