import React, {useEffect} from 'react';
import {StyleSheet, View, BackHandler, Alert} from 'react-native';
import 'react-native-gesture-handler';
import {useRecoilValue} from 'recoil';

import {dimensions, flexCenter} from '../../config/constants';
import {playerNameState} from '../../recoil/atoms';

import HomeCenter from './homeCenter';
import StepsGrid from './stepsGrid';
import HomeBox from './homeBox';
import UserDetail from './userDetail';
import Emulation from './emulation';

const Main = ({navigation}) => {
  const playerName = useRecoilValue(playerNameState);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Do you want to quit this game?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            // BackHandler.exitApp();
            return navigation.replace('GameSetup');
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.userDetailWrapper}>
          <UserDetail parent="palegreen" />
          <UserDetail parent="gold" />
        </View>

        <View style={{flex: 1}} />

        <View style={{flex: 8, flexDirection: 'row'}}>
          <View style={{flex: 2}}>
            <HomeBox parent="palegreen" />
          </View>
          <View style={{flex: 1}}>
            <StepsGrid parent="gold" />
          </View>
          <View style={{flex: 2}}>
            <HomeBox parent="gold" />
          </View>
        </View>

        <View style={{flex: 4, flexDirection: 'row'}}>
          <View style={{flex: 2}}>
            <StepsGrid rotate="90deg" parent="palegreen" />
          </View>
          <View style={{flex: 1}}>
            <HomeCenter />
          </View>
          <View style={{flex: 2}}>
            <StepsGrid rotate="90deg" parent="royalblue" />
          </View>
        </View>

        <View style={{flex: 8, flexDirection: 'row'}}>
          <View style={{flex: 2}}>
            <HomeBox parent="tomato" />
          </View>
          <View style={{flex: 1}}>
            <StepsGrid parent="tomato" />
          </View>
          <View style={{flex: 2}}>
            <HomeBox parent="royalblue" />
          </View>
        </View>

        <View style={{flex: 1}} />

        <View style={styles.userDetailWrapper}>
          <UserDetail parent="tomato" />
          <UserDetail parent="royalblue" />
        </View>
      </View>

      <View style={styles.emulationWrapper}>
        {playerName.toLowerCase() === 'mukul' && <Emulation />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, ...flexCenter},
  container: {
    width: dimensions.boardWidth,
    height: dimensions.boardHeight,
  },
  userDetailWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emulationWrapper: {
    marginTop: dimensions.stepsBox,
    width: dimensions.boardWidth,
    height: dimensions.homeBox / 2,
  },
});

export default Main;
