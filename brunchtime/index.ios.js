/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './src/components/login/Login';
import SignupForm from './src/components/signup/SignupForm';
import Profile from './src/components/user/Profile';
import Search from './src/components/user/Search';
import { StackNavigator } from 'react-navigation';
import Cookies from './src/helpers/Cookies';
import UserAuth from './src/components/login/UserAuth';

export default class Home extends Component {


  render() {
    return (
    <Login />

    );
  }
}

const brunchtime = StackNavigator({
  Login: { screen: Login },
  SignUp: { screen: SignupForm },
  Profile: { screen: Profile },
  Search: { screen: Search }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('brunchtime', () => brunchtime);
