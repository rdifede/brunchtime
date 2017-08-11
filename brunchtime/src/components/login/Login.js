import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  TextInput,
TouchableHighlight,
StatusBar
} from 'react-native';
import axios from 'axios';


export default class Login extends Component {
  static navigationOptions = {
    title: 'Login!',
  };
  constructor(){
  super();
  // set default state
  this.state = {
    // we have 2 inputs that we will be changing
    inputs: {
      email: '',
      password: ''
    }
  }
}

// method to log in
login(e){
  e.preventDefault(); // prevent default form action
  // send request to make sure the email and password are correct
  axios.post(`${this.props.url}/login`, this.state.inputs)
    .then(res => { // set the user based off of the response
      this.props.setUser(res.data);
    })
    navigate('Profile')
}

changeInput(e, input){
  const val = e.target.value;
  this.setState(prev => { // set the input in the state to the value
    prev.inputs[input] = val;
    return prev;
  });
}

  render() {
    var {navigate} = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>BRUNCH TIME</Text>
          <Image
            style={styles.logo}
            source={require('../../images/mimosa.png')}/>
            <Text style={styles.subText}>For those who brunch.</Text>
        </View>
        <View>
          <StatusBar
            barStyle="dark-content"
          />
          <TextInput
            style={styles.input}
            placeholder="email address"
            returnKeyType="next"
            keyboardType="email-address"
            //gives the keyboard an @ symbol to assist in typing email addresses
            onSubmitEditing={()=> this.passwordInput.focus()}
            //this tells the next button to direct focus on the password input after the
            //email address is submitted
            onChangeText={e => this.changeInput(e, 'email')}
            placeholderTextColor="rgba(127, 140, 141,.8)"
          />

          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor="rgba(127, 140, 141,.8)"
            secureTextEntry
            returnKeyType="go"
            onChangeText={e => this.changeInput(e, 'password')}
            onSubmitEditing={this.props.toggleMode}

            ref={(input)=> this.passwordInput = input}
            //this is the reference for the onSubmitEditing function

          />

          <TouchableHighlight
            style={styles.button}
            onPress = {this.login.bind(this)}>
            <Text style={styles.buttonText}>
              Login
            </Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => navigate('SignUp')}
            style={styles.button}
            >
            <Text style={styles.buttonText}>
              Sign Up
            </Text>
          </TouchableHighlight>

        </View>
      </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9B59B6'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    marginTop: 10
  },
  logo: {
    width: 100,
    height: 100,
    margin: 20
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 50
  },
  subText: {
    fontSize: 15
  },
  input: {
    height: 45,
    backgroundColor: 'rgba(212,212,212,.6)',
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
    backgroundColor: 'rgba(52,73,94, .6)',
    margin: 7,
    borderRadius: 7,

  }
});
