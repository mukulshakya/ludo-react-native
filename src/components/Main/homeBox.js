import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {useRecoilValue} from 'recoil';

import {dimensions, flexCenter} from '../../config/constants';
import {
  allCoinState,
  currentPlayerState,
  currentPlayersListState,
} from '../../recoil/atoms';

import Coin from './coin';

// This component is for 4 blocks that stores COIN in initial state.
const HomeBox = ({parent}) => {
  const opacityAnim = React.useRef(new Animated.Value(1)).current;
  const coinState = useRecoilValue(allCoinState);
  const currentPlayer = useRecoilValue(currentPlayerState);
  const playersList = useRecoilValue(currentPlayersListState);

  const runAnimation = () => {
    Animated.timing(opacityAnim, {
      toValue: 0.7,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start(() => runAnimation());
    });
  };

  React.useEffect(() => {
    runAnimation();
  }, []);

  return (
    <Animated.View
      style={[
        styles.homeBox,
        {backgroundColor: parent},
        currentPlayer === parent && {opacity: opacityAnim},
      ]}>
      {Array(2)
        .fill()
        .map((_, i) => (
          <View key={i} style={styles.homeBoxInnerRow}>
            {Array(2)
              .fill()
              .map((_, j) => (
                <View key={j} style={styles.homeBoxInnerRowCol}>
                  <View style={styles.coinImageWrapper}>
                    {playersList.includes(parent) &&
                      coinState[parent][parent[0] + (2 * i + j)].position ===
                        'home' && (
                        <Coin parent={parent} index={parent[0] + (2 * i + j)} />
                      )}
                  </View>
                </View>
              ))}
          </View>
        ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  homeBox: {flex: 1},
  homeBoxInner: {
    borderColor: 'black',
    width: dimensions.homeBox / 2 - 2,
    height: dimensions.homeBox / 2 - 2,
    borderRadius: dimensions.homeBox,
    position: 'absolute',
  },
  homeBoxInnerRow: {flex: 1, flexDirection: 'row'},
  homeBoxInnerRowCol: {flex: 0.8, ...flexCenter},
  image: {
    width: dimensions.stepsBox - 10,
    height: dimensions.stepsBox - 5,
    resizeMode: 'cover',
  },
  coinImageWrapper: {
    width: dimensions.homeBox / 3,
    height: dimensions.homeBox / 3,
    borderColor: '#fff',
    borderRadius: dimensions.homeBox,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 99,
    ...flexCenter,
  },
});

export default HomeBox;
