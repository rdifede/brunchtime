import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default class Profile extends Component {
  componentDidMount(favorites){
    return fetch('http://localhost:3000/users/favorites')
  .then((res) => res.json())
  .then((resJson) => {
    this.setState((prevState) => {
      return {
        favorites: resJson,
      }
    })
  })
    .catch((err) => {
      console.log(err);
    })

  }

  render() {
    var {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>#BrunchLife</Text>
        <View>
          <Text style={styles.favoritesHeader}>All your favs!</Text>
          <Text style={styles.favorites}>

          </Text>
        </View>
        <TouchableOpacity
          style={styles.getBrunch}
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
    backgroundColor: 'rgb(155,89,182)',
  },
  headline: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  favorites: {
    color: 'white',
    fontSize: 15
  },
  favoritesHeader: {
    color: 'white',
    fontSize: 20
  },
  getBrunch: {
    flex: 2,
    justifyContent: 'flex-end',
    margin: 15
  }
});
