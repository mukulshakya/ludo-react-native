import React from 'react';
import {View} from 'react-native';

import StepsBox from './stepBox';

// This component is for 4 blocks that stores COIN in initial state.
const StepsGrid = ({rotate, parent}) => {
  const noOfRows = rotate ? 3 : 6;
  const noOfCols = rotate ? 6 : 3;

  return (
    <View style={{flex: 1}}>
      {Array(noOfRows)
        .fill()
        .map((_, i) => (
          <View key={i} style={{flex: 1, flexDirection: 'row'}}>
            {Array(noOfCols)
              .fill()
              .map((_, j) => (
                <View key={j} style={{borderWidth: 0, flex: 1}}>
                  <StepsBox
                    index={i + '' + j}
                    parent={parent}
                    rotate={rotate}
                  />
                </View>
              ))}
          </View>
        ))}
    </View>
  );
};

export default StepsGrid;
