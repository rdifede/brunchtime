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
      this.state = { // track inputs for form
        inputs: {
          name: '',
          email: '',
          password: ''
        }
      }
    }

    // method to sign up
    signUp(e){
      e.preventDefault(); // prevent default form action
      // make request to server to create a new user
      axios.post(`${this.props.url}/users`, this.state.inputs)
        .then(res => { // the response will be the user
          // set the user
          this.props.setUser(res.data);
        })
        var {navigate} = this.props.navigation;
        navigate('Profile')
    }

    changeInput(e, input){
      const val = e.value;
      this.setState(prev => { // set the input in the state to the value
        prev.inputs[input] = val;
        return prev;
      });
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
          value={this.state.inputs.name}
          //turns the return key into a next button to go to the next field
          // onChangeText={e => this.changeInput(e, 'name')}
          onChangeText={e => this.changeInput(e, 'name')}
          // value={this.state.inputs.name}
          onSubmitEditing={()=> this.emailInput.focus()}
          //this tells the next button to direct focus on the email input after the
          //name is submitted

          placeholderTextColor="rgba(rgba(127, 140, 141,.6))"
        />
        <TextInput
          style={styles.input}
          placeholder="email address"
          returnKeyType="next"
          value={this.state.inputs.email}
          keyboardType="email-address"
          //gives the keyboard an @ symbol to assist in typing email addresses
          ref={(email)=> this.emailInput = email}
            onChangeText={e => this.changeInput(e, 'email')}
            // value={this.state.inputs.email}
          onSubmitEditing={()=> this.passwordInput.focus()}
          //this tells the next button to direct focus on the password input after the
          //email address is submitted

          placeholderTextColor="rgba(rgba(127, 140, 141,.6)"
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor="rgba(rgba(127, 140, 141,.6))"
          secureTextEntry
          returnKeyType="go"
          value={this.state.inputs.password}
            onChangeText={e => this.changeInput(e, 'password')}
            // value={this.state.inputs.password}
          onSubmitEditing={this.props.toggleMode}
          ref={(input)=> this.passwordInput = input}

          //this is the reference for the onSubmitEditing function

        />

        <TouchableOpacity
          style={styles.button}
          onPress={this.signUp.bind(this)}
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
