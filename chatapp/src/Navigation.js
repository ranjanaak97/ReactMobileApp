import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Welcome from './pages/Welcome';

const AuthStackNavigator = createStackNavigator({
	Welcome: {
		screen: Welcome,
	},
	Login: {
		screen: Login,
	},
	Register: {
		screen: Register,
	}
}, { headerMode: 'none' });

const AppStackNavigator = createStackNavigator({
	Home: {
		screen: Home,
		/*navigationOptions: {
			title: 'My Friend List',
		}*/
	},
	Chat: {
		screen: Chat,
		/*navigationOptions: {
			title: 'Chat Room',
		}*/
	},
});
const SwitchNavigator = createSwitchNavigator(
  {
	AuthLoading: AuthStackNavigator,
	App: AppStackNavigator
  },
  { 
	initialRouteName: 'AuthLoading',
  });

const Navigation = createAppContainer(SwitchNavigator);
export default Navigation;