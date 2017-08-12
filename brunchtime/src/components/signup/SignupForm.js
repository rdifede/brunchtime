import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import axios from 'axios';

export default class SignupForm extends Component {
  static navigationOptions = {
    title: "Join Us!",
  };

  constructor(){
      super();
      // set up initial state
      this.state = {

          name: '',
          email: '',
          password: ''
      }
    }

    // method to sign up
    async onRegisterPressed() {
      try {
        let response = await fetch('http://localhost:3000/users', {
                                method: 'POST',
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  user:{
                                    name: this.state.name,
                                    email: this.state.email,
                                    password: this.state.password,

                                  }
                                })

                              });
                              let res = await response.text();
                              if (response.status >= 200 && response.status < 300) {
                                //if user is authenticated, go to profile
                                const {navigate} = this.props.navigation;
                                navigate('Profile');
                                } else {
                                  //if user is not authenticated, stay on login page
                                  let error = res;
                                  throw error;
                                }
                              }  catch(errors) {

                              }

                            }

  render() {

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
        />
        <TextInput
          style={styles.input}
          placeholder="name"
          returnKeyType="next"

          //turns the return key into a next button to go to the next field
          // onChangeText={e => this.changeInput(e, 'name')}
          onChangeText={(e) => this.setState({name: e})}
          // value={this.state.name}
          onSubmitEditing={()=> this.emailInput.focus()}
          //this tells the next button to direct focus on the email input after the
          //name is submitted

          placeholderTextColor="rgba(127, 140, 141,.6)"
        />
        <TextInput
          style={styles.input}
          placeholder="email address"
          returnKeyType="next"

          keyboardType="email-address"
          //gives the keyboard an @ symbol to assist in typing email addresses
          ref={(email)=> this.emailInput = email}
            onChangeText={(e) => this.setState({email: e})}
            // value={this.state.email}
          onSubmitEditing={()=> this.passwordInput.focus()}
          //this tells the next button to direct focus on the password input after the
          //email address is submitted

          placeholderTextColor="rgba(127, 140, 141,.6)"
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor="rgba(127, 140, 141,.6)"
          secureTextEntry
          returnKeyType="go"
            onChangeText={(e) => this.setState({password: e})}
          ref={(input)=> this.passwordInput = input}

          //this is the reference for the onSubmitEditing function

        />

        <TouchableOpacity
          style={styles.button}
          onPress={this.onRegisterPressed.bind(this)}
          >
          <Text style={styles.buttonText}>
            Sign Up
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(189, 195, 199,1.0)'

  },
  input: {
    height: 45,
    backgroundColor: 'rgba(236, 240, 241,.6)',
    margin: 5,
    fontSize: 15,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    padding: 7,
    flex: 1,
    textAlign: "center"
  },
  button: {
    height: 35,
    backgroundColor: 'rgba(155,89,182, .6)',
    margin: 7,
    borderRadius: 7,

  }
});
