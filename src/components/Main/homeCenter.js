import React from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import {useRecoilValue} from 'recoil';

import {allBlockState} from '../../recoil/atoms';
import {dimensions, flexCenter} from '../../config/constants';

import HomeCenterBg from '../../assets/homeCenter.png';
import Coin from './coin';

const ViewFlex1 = () => <View style={{flex: 1}} />;

/**
 * Component for showing the coins in winning state in HomeCenter.
 * @param {Object} props
 * @returns JSX
 */
const HomeCenterCoins = ({parent}) => {
  const blockState = useRecoilValue(allBlockState);
  const key = `${parent[0]}-won`;

  return (
    <>
      {blockState &&
        blockState[key] &&
        blockState[key].map((item, i) => (
          <Coin
            key={i}
            parent={parent}
            index={item}
            className="haveWon"
            scale="0.66"
          />
        ))}
    </>
  );
};

/**
 * Component for the center of the board that stores COIN in winning state.
 * @returns JSX
 */
const HomeCenter = () => {
  return (
    <ImageBackground source={HomeCenterBg} style={styles.image}>
      <View style={styles.coinRow}>
        <ViewFlex1 />
        <View style={[styles.coinView, {paddingVertical: 5}]}>
          <HomeCenterCoins parent="gold" />
        </View>
        <ViewFlex1 />
      </View>

      <View style={styles.coinRow}>
        <View style={[styles.coinView, {transform: [{rotate: '90deg'}]}]}>
          <HomeCenterCoins parent="palegreen" />
        </View>
        <ViewFlex1 />
        <View style={[styles.coinView, {transform: [{rotate: '90deg'}]}]}>
          <HomeCenterCoins parent="royalblue" />
        </View>
      </View>

      <View style={styles.coinRow}>
        <ViewFlex1 />
        <View style={[styles.coinView, {paddingVertical: 5}]}>
          <HomeCenterCoins parent="tomato" />
        </View>
        <ViewFlex1 />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: dimensions.stepsGridWidth,
    height: dimensions.stepsGridWidth,
    backgroundColor: 'red',
  },
  coinView: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    ...flexCenter,
  },
  coinRow: {flex: 1, flexDirection: 'row'},
});

export default HomeCenter;
