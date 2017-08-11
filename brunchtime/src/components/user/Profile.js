import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default class Profile extends Component {
  render() {
    var {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>All Your #Favs</Text>
        <TouchableOpacity
          onPress={() => navigate('Search')}>
          <Text>Let's Get Brunch!</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headline: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
