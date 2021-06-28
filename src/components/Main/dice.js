import React, {useState, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  Animated,
  Easing,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Sound from 'react-native-sound';

import {currentDiceState, currentPlayerState} from '../../recoil/atoms';
import {dimensions, flexCenter} from '../../config/constants';

/**
 * Component for DICE.
 * @returns JSX
 */
const Dice = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [diceState, setDiceState] = useRecoilState(currentDiceState);
  const currentPlayer = useRecoilValue(currentPlayerState);
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  // Generates random dice value between 1 and 6
  const rotateDice = () =>
    setDiceState({
      //   num: 6,
      num: Math.ceil(Math.random() * 6),
      isLocked: true,
      lastRolledBy: currentPlayer,
    });

  const playDiceMoveSound = () => {
    const sound = new Sound('diceroll.mp3', Sound.MAIN_BUNDLE, error => {
      if (!error) sound.play(success => success && sound.release());
    });
  };

  // Event handler for dice onClick
  const onClick = () => {
    if (!isAnimating && !diceState.isLocked) {
      setDiceState({num: 0, isLocked: false, lastRolledBy: currentPlayer});
      setIsAnimating(true);

      playDiceMoveSound();

      setTimeout(() => {
        rotateDice();
        setIsAnimating(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (isAnimating) {
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }

    return () => rotateAnim.setValue(0);
  }, [isAnimating]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{transform: [{rotate: spin}]}}>
      <TouchableOpacity
        disabled={diceState.isLocked}
        onPress={onClick}
        activeOpacity={0.8}>
        <View
          style={[
            styles.wrapper,
            {backgroundColor: currentPlayer ? currentPlayer : 'orange'},
            diceState.num > 2 && {flexWrap: 'wrap'},
          ]}>
          {Array(diceState.num)
            .fill()
            .map((_, i) => (
              <View key={i} style={styles.diceNumWrapper}>
                <View style={styles.diceNum} />
              </View>
            ))}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const diceDimension = dimensions.stepsGridWidth / 2;
const diceNumDimension = diceDimension / 6;
const styles = StyleSheet.create({
  wrapper: {
    borderRadius: diceDimension / 5,
    borderWidth: 1,
    width: diceDimension + 2,
    height: diceDimension + 2,
    flexDirection: 'row',
    ...flexCenter,
  },
  diceNumWrapper: {
    width: diceDimension / 2,
    height: diceDimension / 3,
    ...flexCenter,
  },
  diceNum: {
    borderRadius: diceNumDimension,
    backgroundColor: 'black',
    width: diceNumDimension,
    height: diceNumDimension,
  },
});

export default Dice;
