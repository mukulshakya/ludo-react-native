import React from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import {useRecoilValue} from 'recoil';

import {dimensions} from '../../config/constants';
import {currentPlayerState} from '../../recoil/atoms';

import AvatarImg from '../../assets/avatar.png';
import Dice from './dice';

const UserDetail = ({parent}) => {
  const currentPlayer = useRecoilValue(currentPlayerState);

  const DiceWrapper = () => (
    <View style={styles.diceContainer}>
      <Dice />
    </View>
  );

  return (
    <View style={styles.container}>
      {currentPlayer === parent && ['gold', 'royalblue'].includes(parent) && (
        <DiceWrapper />
      )}
      <ImageBackground source={AvatarImg} style={styles.avatar} />
      {currentPlayer === parent && ['palegreen', 'tomato'].includes(parent) && (
        <DiceWrapper />
      )}
    </View>
  );
};

const avatarDimension = dimensions.stepsGridWidth / 2;
const avatarDimensionStyle = {width: avatarDimension, height: avatarDimension};
const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  avatar: {...avatarDimensionStyle, borderWidth: 1, overflow: 'hidden'},
  diceContainer: {
    marginHorizontal: avatarDimension / 4,
    ...avatarDimensionStyle,
  },
});

export default UserDetail;
