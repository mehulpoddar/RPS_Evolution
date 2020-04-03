import React from 'react';
import { Image, ScrollView, View, ImageBackground, PixelRatio, Text, Dimensions } from 'react-native';

const backImg = require('../../images/backgroundBlur.jpg');
const evolutionImg = require('../../images/guide/evolution.png');
const gameShotImg1 = require('../../images/guide/gameShot1.png');
const gameShotImg2 = require('../../images/guide/gameShot2.png');
const gameShotImg3 = require('../../images/guide/gameShot3.png');
const rageImg1 = require('../../images/rage1.png');
const rageImg2 = require('../../images/rage2.png');

const f = PixelRatio.getFontScale();
const h = Dimensions.get('window').height;
const w = Dimensions.get('window').width;

const slide1 = () => {
  return (
    <View>
      <View style={{
          width: w*0.8,
          height: h*0.9,
          marginTop: h*0.05,
          backgroundColor: '#eeeeee90',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          borderColor: '#444',
          borderWidth: 2,
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderRadius: 30,
          marginLeft: 10
        }}
      >
          <View style={{ flex: 0.7, flexDirection: 'row' }}>
            <Image source={evolutionImg} style={styles.imageStyle} />
          </View>
          <View style={{ flex: 0.3 }}>
            <Text style={[styles.textStyle, {fontWeight: 'medium'}]}>The usual ...</Text>
            <Text style={styles.textStyle}>... But here, you Evolve them!</Text>
          </View>
          <Text style={[styles.textStyle, { position: 'absolute', right: '4%', bottom: '4%', fontWeight: '600', fontSize: f*15}]}>1 / 5</Text>
      </View>
    </View>
  )
}

const slide2 = () => {
  return (
    <View>
      <View style={{
          width: w*0.8,
          height: h*0.9,
          marginTop: h*0.05,
          backgroundColor: '#eeeeee90',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          borderColor: '#444',
          borderWidth: 2,
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderRadius: 30,
          marginLeft: 10
        }}
      >
          <View style={{ flex: 0.6, padding: '2%', flexDirection: 'row' }}>
              <Image source={gameShotImg1} style={styles.imageStyle} />
          </View>
          <View style={{ flex: 0.4}}>
            <Text style={[styles.textStyle, {fontWeight: '600'}]}>How do you evolve?</Text>
            <Text style={styles.textStyle}>With Mana!</Text>
            <Text style={[styles.textStyle, { fontWeight: '600', textAlign: 'left', fontSize: f*15}]}>     <Text style={{ fontWeight: 'bold' }}>1 Mana :</Text> to evolve Paper</Text>
            <Text style={[styles.textStyle, { fontWeight: '600', textAlign: 'left', fontSize: f*15}]}>     <Text style={{ fontWeight: 'bold' }}>2 Mana :</Text> to evolve Rock</Text>
            <Text style={[styles.textStyle, { fontWeight: '600', textAlign: 'left', fontSize: f*15}]}>     <Text style={{ fontWeight: 'bold' }}>3 Mana :</Text> to evolve Scissors</Text>
          </View>
          <Text style={[styles.textStyle, { position: 'absolute', right: '4%', bottom: '4%', fontWeight: '600', fontSize: f*15}]}>2 / 5</Text>
      </View>
    </View>
  )
}

const slide3 = () => {
  return (
    <View>
      <View style={{
          width: w*0.8,
          height: h*0.9,
          marginTop: h*0.05,
          backgroundColor: '#eeeeee90',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          borderColor: '#444',
          borderWidth: 2,
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderRadius: 30,
          marginLeft: 10
        }}
      >
          <View style={{ flex: 0.6, padding: '2%', flexDirection: 'row' }}>
              <Image source={gameShotImg2} style={styles.imageStyle} />
          </View>
          <View style={{ flex: 0.4}}>
            <Text style={[styles.textStyle, {fontWeight: '600'}]}>How do you get Mana?</Text>
            <Text style={styles.textStyle}>Winning battle rounds!</Text>
            <Text style={[styles.textStyle, { fontWeight: '600', fontSize: f*15, marginTop: '2%'}]}>A Battle is both players playing their weapons.</Text>
            <Text style={[styles.textStyle, { fontWeight: '600', fontSize: f*15}]}>Each win gets you <Text style={{ fontWeight: 'bold' }}>1 Mana!</Text></Text>
          </View>
          <Text style={[styles.textStyle, { position: 'absolute', right: '4%', bottom: '4%', fontWeight: '600', fontSize: f*15}]}>3 / 5</Text>
      </View>
    </View>
  )
}

const slide4 = () => {
  return (
    <View>
      <View style={{
          width: w*0.8,
          height: h*0.9,
          marginTop: h*0.05,
          backgroundColor: '#eeeeee90',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          borderColor: '#444',
          borderWidth: 2,
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderRadius: 30,
          marginLeft: 10
        }}
      >
          <View style={{ flex: 0.6, flexDirection: 'row', padding: '2%' }}>
              <Image source={gameShotImg3} style={styles.imageStyle} />
          </View>
          <View style={{ flex: 0.4}}>
            <Text style={[styles.textStyle, {fontWeight: '600'}]}>Why do we Battle?</Text>
            <Text style={styles.textStyle}>To reduce Opponent Health!</Text>
      <Text style={[styles.textStyle, { fontWeight: '600', fontSize: f*15, marginTop: '2%'}]}>Each <Text style={{ fontWeight: 'bold' }}>win</Text> reduces opponent <Text style={{ fontWeight: 'bold' }}>Health (HP){'\n'}</Text>
            by weapon's <Text style={{ fontWeight: 'bold' }}>attack (ATK)</Text> value.</Text>
          </View>
          <Text style={[styles.textStyle, { position: 'absolute', right: '4%', bottom: '4%', fontWeight: '600', fontSize: f*15}]}>4 / 5</Text>
      </View>
    </View>
  )
}

const slide5 = () => {
  return (
    <View>
      <View style={{
          width: w*0.8,
          height: h*0.9,
          marginTop: h*0.05,
          backgroundColor: '#eeeeee90',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          borderColor: '#444',
          borderWidth: 2,
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderRadius: 30,
          marginLeft: 10,
          marginRight: 10
        }}
      >
          <View style={{ flex: 0.7, flexDirection: 'row' }}>
            <Image source={rageImg1} style={[styles.imageStyle, { width: '30%', height: '80%' }]} />
            <Image source={rageImg2} style={[styles.imageStyle, { width: '30%', height: '80%' }]} />
          </View>
          <View style={{ flex: 0.3 }}>
            <Text style={styles.textStyle}>Rage Mode!</Text>
            <Text style={[styles.textStyle, {fontWeight: 'medium'}]}>How do we <Text style={{ fontWeight: 'bold' }}>reach</Text> it? What <Text style={{ fontWeight: 'bold' }}>effect</Text> it has?</Text>
            <Text style={[styles.textStyle, {fontWeight: '900', fontStyle: 'italic'}]}>We'll leave that to you to explore!</Text>
          </View>
          <Text style={[styles.textStyle, { position: 'absolute', right: '4%', bottom: '4%', fontWeight: '600', fontSize: f*15}]}>5 / 5</Text>
      </View>
    </View>
  )
}

const Guide = () => {
  return (
    <ImageBackground source={backImg} style={{ flex: 1 }} >
      <ScrollView horizontal={true} style={{ flex: 1, marginBottom: '3%' }}>
        {slide1()}
        {slide2()}
        {slide3()}
        {slide4()}
        {slide5()}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = {
  imageStyle: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: '100%',
    height: '95%'
  },
  textStyle: {
    textAlign: 'center',
    fontSize: f * 18,
    color: '#444',
    fontFamily: 'serif',
    fontWeight: 'bold'
  }
};

export default Guide;
