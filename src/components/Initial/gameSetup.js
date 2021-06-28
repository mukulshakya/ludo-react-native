import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {useRecoilState, useResetRecoilState} from 'recoil';

import {dimensions, flexCenter, playerOrder} from '../../config/constants';
import * as states from '../../recoil/atoms';

/**
 * This component is being called from GameSetup, and handles the player count buttons.
 * @param {Object} props
 * @returns JSX
 */
function PlayerButton({count, setCounts, navigation}) {
  const setCurrentPlayer = useRecoilState(states.currentPlayerState)[1];
  const setCurrentPlayersList = useRecoilState(
    states.currentPlayersListState,
  )[1];

  const resetBlockState = useResetRecoilState(states.allBlockState);
  const resetCoinState = useResetRecoilState(states.allCoinState);
  const resetDiceState = useResetRecoilState(states.currentDiceState);

  // Event handler for button onClick.
  const handleClick = () => {
    setCounts([count]);

    const randomNum = Math.floor(Math.random() * 2);
    const playersList =
      count === 2
        ? [playerOrder[randomNum], playerOrder[randomNum + 2]]
        : count === 3
        ? playerOrder.slice(randomNum, randomNum + 3)
        : [...playerOrder];

    // reset previous states
    resetBlockState();
    resetCoinState();
    resetDiceState();

    setCurrentPlayersList([...playersList]);
    setCurrentPlayer(playersList[0]);

    setTimeout(() => {
      navigation.replace('Main');
    }, 500);
  };

  return (
    <TouchableOpacity onPress={handleClick} style={styles.playerButton}>
      <Text style={styles.playerCountText}>{count}</Text>
    </TouchableOpacity>
  );
}

/**
 * This component handles the screen where user can choose the players count.
 * @returns JSX
 */
const GameSetup = ({navigation}) => {
  const [counts, setCounts] = useState([2, 3, 4]);
  const [name, setName] = useRecoilState(states.playerNameState);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading1}>Welcome to LUDO</Text>
        <TextInput
          style={styles.nameTextInput}
          placeholder="Hey There, Your Name?"
          placeholderTextColor="rgba(255,255,255, 0.5)"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.heading2}>Choose players</Text>
        <View style={styles.playerButtonContainer}>
          {counts.map(i => (
            <PlayerButton
              key={i}
              count={i}
              setCounts={setCounts}
              navigation={navigation}
            />
          ))}
        </View>
        <View style={{height: dimensions.stepsBox * 2}}>
          {counts.length === 1 && (
            <ActivityIndicator color="white" size={dimensions.stepsBox * 2} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#212121',
  },
  innerContainer: {
    height: dimensions.boardWidth,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  heading1: {
    color: 'white',
    fontSize: dimensions.homeBox / 4,
  },
  heading2: {
    color: 'white',
    fontSize: dimensions.homeBox / 6,
  },
  nameTextInput: {
    borderWidth: 1,
    borderColor: 'white',
    width: dimensions.boardWidth / 2,
    borderRadius: dimensions.boardWidth / 2,
    paddingHorizontal: dimensions.stepsBox / 2,
    color: 'white',
  },
  playerButtonContainer: {
    flexDirection: 'row',
    width: dimensions.boardWidth / 1.5,
    justifyContent: 'space-evenly',
  },
  playerButton: {
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: dimensions.stepsBox / 4,
    borderRadius: dimensions.stepsBox,
    flex: 1,
    marginHorizontal: dimensions.stepsBox / 3,
    ...flexCenter,
  },
  playerCountText: {
    color: 'white',
    fontSize: dimensions.homeBox / 8,
  },
});

export default GameSetup;
