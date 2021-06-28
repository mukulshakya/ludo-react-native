import React, {useState} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import 'react-native-gesture-handler';
import {useRecoilState, useRecoilValue} from 'recoil';
import _ from 'lodash';

import {
  currentPlayerState,
  currentDiceState,
  allBlockState,
  allCoinState,
  currentPlayersListState,
} from '../../recoil/atoms';
import {dimensions, flexCenter, colorMap} from '../../config/constants';

const Emulation = () => {
  const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerState);
  const [diceState, setDiceState] = useRecoilState(currentDiceState);
  const [blockState, setBlockState] = useRecoilState(allBlockState);
  const [coinState, setCoinState] = useRecoilState(allCoinState);
  const playersList = useRecoilValue(currentPlayersListState);
  const [text, setText] = useState('');

  const changePosition = () => {
    if (text.match(/^[pyrt][0-3]-[pyrt]\d{2}$/)) {
      const [coinKey, boxKey] = text.split('-');
      const parent = colorMap[coinKey[0]];
      if (!playersList.includes(parent)) return;
      const oldPosition = coinState[parent][coinKey].position;

      setCoinState({
        ...coinState,
        [parent]: {
          ...coinState[parent],
          [coinKey]: {position: boxKey, isTurnAvailable: false},
        },
      });

      const oldBlockState = _.cloneDeep(blockState);

      oldPosition &&
        !oldPosition.includes('home') &&
        oldBlockState[oldPosition].splice(
          oldBlockState[oldPosition].indexOf(coinKey),
          1,
        );

      setBlockState({
        ...oldBlockState,
        [boxKey]: [...new Set([...(oldBlockState[boxKey] || []), coinKey])],
      });

      setText('');
    } else console.log('Wrong input!');
  };

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <View style={{flexDirection: 'column', ...flexCenter}}>
        <View style={{flexDirection: 'row'}}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                width: dimensions.stepsBox,
                height: dimensions.stepsBox,
                backgroundColor: '#ccc',
                ...flexCenter,
              }}
              key={i}
              onPress={() => {
                setDiceState({
                  num: i,
                  isLocked: false,
                  lastRolledBy: currentPlayer,
                });
              }}>
              <Text>{i}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{flexDirection: 'row'}}>
          {playersList.map((elem, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setCurrentPlayer(elem);
              }}
              style={{backgroundColor: elem, padding: 2}}>
              <Text>{elem}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View>
        <Text>Enter (eg; p1-t40): </Text>
        <TextInput
          style={{
            height: dimensions.stepsBox,
            width: dimensions.stepsGridWidth,
            borderWidth: 1,
            paddingVertical: 0,
            paddingHorizontal: dimensions.stepsBox / 4,
          }}
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#ccc',
            padding: 5,
            ...flexCenter,
            borderWidth: 1,
          }}
          onPress={changePosition}>
          <Text>Set</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Emulation;
