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



export default class Login extends Component {
  static navigationOptions = {
    title: 'Login!',
  };
  constructor(){
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  async login() {
    try {
      let response = await fetch('http://localhost:3000/login', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                session:{
                                  email: this.state.email,
                                  password: this.state.password,
                                }
                              })
                            });
                            let res = await response.text();
                            if (response.status >= 200 && response.status < 300) {
                              //if user is authenticated, go to profile
                              console.log(res)
                              const {navigate} = this.props.navigation;
                              navigate('Profile', { user_id: JSON.parse(res).id, name: JSON.parse(res).name });
                              } else {
                                //if user is not authenticated, stay on login page
                                let error = res;
                                throw error;
                              }
                            }  catch(errors) {

                            }

                          }



  render() {
    let {navigate} = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          {/* <Text style={styles.title}>Brunch</Text> */}
          <Image
            style={styles.logo}
            source={require('../../images/BrunchTime.png')}/>
            {/* <Text style={styles.title2}>Time</Text> */}
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
            onChangeText={(e) => this.setState({email: e})}
            placeholderTextColor="rgba(127, 140, 141,.8)"
          />

          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor="rgba(127, 140, 141,.8)"
            secureTextEntry
            returnKeyType="done"
            onChangeText={(e) => this.setState({password: e})}
            onSubmitEditing={this.props.toggleMode}
            ref={(input)=> this.passwordInput = input}
            //this is the reference for the onSubmitEditing function in the email field

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
    width: 325,
    height: 100,
    // margin: 20
  },
  title: {
    color: 'white',
    fontSize: 25,
    marginTop: 50,
    width: 250,
    fontFamily: 'Zapfino',
    alignItems: 'center'
  },
  title2: {
    color: 'white',
    fontSize: 25,
    width: 150,
    fontFamily: 'Zapfino',
    alignItems: 'center'
  },
  subText: {
    fontSize: 25,
    fontFamily: 'SignPainter'
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
    textAlign: "center",
    fontFamily: 'American Typewriter'
  },
  button: {
    height: 35,
    backgroundColor: 'rgba(52,73,94, .6)',
    margin: 7,
    borderRadius: 7,

  }
});
