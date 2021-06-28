import React from 'react';
import {useRecoilValue} from 'recoil';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

import {allBlockState, playerNameState} from '../../recoil/atoms';
import {
  dimensions,
  markColorIndexes,
  markStarIndexes,
  colorMap,
  flexCenter,
} from '../../config/constants';

import StarOutline from '../../assets/starOutline.png';
import Coin from './coin';

/**
 * Component that holds the single step of the entire border steps grid.
 * @param {Object} props
 * @returns JSX
 */
const StepsBox = ({parent, index, rotate}) => {
  const playerName = useRecoilValue(playerNameState);
  const blockState = useRecoilValue(allBlockState);
  const parentKey = parent[0] + index;
  const coins = blockState[parentKey] ? blockState[parentKey] : [];
  const scaleCoin = coins.length > 2 ? 0.66 : 1;

  return (
    <View
      style={[
        styles.stepsBox,
        {
          backgroundColor: markColorIndexes[parent].markIndex.includes(index)
            ? parent
            : 'white',
        },
        rotate && {transform: [{rotate: rotate}]},
      ]}>
      {markStarIndexes.includes(parent[0] + index) && (
        <ImageBackground
          source={StarOutline}
          resizeMode="center"
          style={styles.starImageBg}
        />
      )}
      {playerName.toLowerCase() === 'mukul' && (
        <Text style={styles.stepsBoxText}>{parent[0] + index}</Text>
      )}

      <View
        style={[styles.coinWrapper, coins.length > 3 && {flexWrap: 'wrap'}]}>
        {coins.map((elem, i) => (
          <Coin
            key={i}
            parent={colorMap[elem[0]]}
            index={elem}
            scale={scaleCoin}
          />
        ))}
      </View>
    </View>
  );
};

const commonStyle = {
  width: dimensions.stepsBox,
  height: dimensions.stepsBox,
  flexDirection: 'row',
  ...flexCenter,
};
const styles = StyleSheet.create({
  stepsBox: {borderWidth: 0.5, flex: 1, ...flexCenter},
  stepsBoxText: {
    textAlign: 'center',
    fontSize: dimensions.stepsBox / 2.5,
    opacity: 0.3,
    position: 'absolute',
  },
  starImageBg: {...commonStyle, flexWrap: 'wrap', position: 'absolute'},
  coinWrapper: {...commonStyle, flex: 1},
});

export default StepsBox;
