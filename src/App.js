import React from 'react';
import {RecoilRoot} from 'recoil';

import AppNavigator from './navigation/appNavigator';

const App = () => (
  <RecoilRoot>
    <AppNavigator />
  </RecoilRoot>
);

export default App;
