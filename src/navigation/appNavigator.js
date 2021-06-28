import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, ActivityIndicator} from 'react-native';

import Main from '../components/Main';
import GameSetup from '../components/Initial/gameSetup';
import {flexCenter} from '../config/constants';

function Splash(props) {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace('GameSetup');
    }, 1000);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#7e57c2', ...flexCenter}}>
      <ActivityIndicator size="large" color="#424242" />
    </View>
  );
}

const Stack = createStackNavigator();
const AppContainer = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        options={{
          gestureEnabled: false,
          header: () => null,
        }}
        name="Splash"
        component={Splash}
      />
      <Stack.Screen
        options={{
          gestureEnabled: false,
          header: () => null,
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
        name="GameSetup"
        component={GameSetup}
      />
      <Stack.Screen
        options={{
          gestureEnabled: false,
          header: () => null,
          cardStyleInterpolator: ({current}) => ({
            cardStyle: {transform: [{scale: current.progress}]},
          }),
        }}
        name="Main"
        component={Main}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppContainer;
