import Login from '../Login';
import Translate from '../Translate';
import Register from '../Register';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
    Translate: {
      screen: Translate,
    },
  },
  {
    initialRouteName: 'Translate',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
