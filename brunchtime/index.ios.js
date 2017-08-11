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
import axios from 'axios';
import UserAuth from './src/components/login/UserAuth';

export default class Home extends Component {
  constructor(){
    super();
    // set up our state.
    this.state = {
      user: false, // default user is no user
      // the app needs to do a request, so there will be a loading time
      // we want to display something else while it does that
      mode: 'loading',
      url: 'http://localhost:3000',
    }
  }

  // once the component mounted, we want to initialize our user
  componentDidMount(){
    this.initUser();
  }

  // method to initialize our user
  initUser(){
    // get the token from the cookie
    const token = Cookies.get('token');

    // if there is a token
    if(token && token !== ''){
      // send a request to our API to validate the user
      axios.get(`${this.state.url}/users/validate`, {
        // include the token as a parameter
        params: {auth_token: token}})
        .then(res => { // the response will be the user
          // set the user in the state, and change the mode to content
          this.setState({user: res.data, mode: 'content'});
        })
        .catch(err => { // if there is an error
          Cookies.set('token', '') // take away the cookie
          // change the state so that there is no user and render the auth
          this.setState({user: false, mode: 'auth'});
        })
    } else { // if there is no token
      // we should render the auth forms
      this.setState({mode: 'auth'});
    }
  }

  // method to set a user
  setUser(user){
    // set a cookie with the user's token
    Cookies.set('token', user.token);
    // set state to have the user and the mode to content
    this.setState({user: user, mode: 'content'});
  }

  // method to log out
  logout(){
    // take away the cookie
    Cookies.set('token', '');
    // remove the user and set the mode to auth
    this.setState({user: false, mode: 'auth'});
  }

  // method that renders the view based on the mode in the state
  renderView(){
    if(this.state.mode === 'loading'){
      return(
        <Text>Loading!</Text>
      )
    } else if(this.state.mode === 'auth') {
      return (
        <UserAuth
          setUser={this.setUser.bind(this)}
          url={this.state.url}
        />
      )
    } else {
      return (
        <Profile logout={this.logout.bind(this)} user={this.state.user} />
      )
    }
  }

  render() {
    return (
    <View>
      { this.renderView() }
    </View>

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
    backgroundColor: 'red',
  }
});

AppRegistry.registerComponent('brunchtime', () => brunchtime);
