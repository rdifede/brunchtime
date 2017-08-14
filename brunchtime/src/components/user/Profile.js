import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Linking,
  FlatList
} from 'react-native';

import Search from './Search';

export default class Profile extends Component {

  constructor(props){
      super(props);
      // set up initial state
      this.state = {
          favorites: [],
          userName: this.props.navigation.state.params.name,
          userID: this.props.navigation.state.params.user_id,
          favID: this.props.navigation.state.params.favID
      }
    }

componentWillMount(){
  this.getFavs();
}
getFavs(){
  return fetch(`http://localhost:3000/users/${this.state.userID}/favorites`)
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


  async deleteFav(item) {
    try {
      let response = await fetch(`http://localhost:3000/users/${this.state.userID}/favorites/${item.id}`, {
                              method: 'DELETE',
                            });
                            let res = await response.text();
                            if (response.status >= 200 && response.status < 300) {

                              //if fav is saved, go to profile
                              const {navigate} = this.props.navigation;
                              navigate('Profile', {user_id: this.props.navigation.state.params.user_id, name: this.state.userName});
                              } else {
                                //if fav is not saved, stay on search page
                                let error = res;
                                throw error;
                              }
                            }  catch(errors) {
                            }
                          }




  render() {
    var {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.headline}>#BrunchLife</Text>
        <View>
          <TouchableOpacity
            style={styles.getBrunch}
            onPress={() => navigate('Search', { user_id: this.state.userID, name: this.state.userName})}>
            <Text style={styles.brunchText}>{this.state.userName}, let's get brunch!</Text>
          </TouchableOpacity>

          <View style={styles.favoritesContainer}>
            <Text style={styles.favoritesHeader}>All Your Favs!</Text>
            <FlatList
            data={this.state.favorites}
            keyExtractor={(x, i) => i}
            renderItem={({ item }) =>
            <View>
            <Text style={styles.favorites}
              >
              <Text>{item.name}</Text>
              {"\n"}
              <Text>{item.address}</Text>
              {"\n"}
              <Text>{item.phone}</Text>
              {"\n"}
            </Text>
            <TouchableOpacity
              onPress={(item)=> this.deleteFav.bind(this)}
              ><Text style={styles.favorites}>Remove</Text></TouchableOpacity>
            <Text style={styles.separator}>_______________________</Text>
            </View>
          }

          />

        </View>
        </View>


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
    fontSize: 45,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'SignPainter',
    marginTop: 10,
  },
  favorites: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'American Typewriter',

  },
  favoritesHeader: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'American Typewriter',
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    textDecorationLine: 'underline'
  },
  favoritesContainer: {
    width: 300,
    height: 500,
    marginLeft: 10,
    alignItems: 'flex-start'
  },
  getBrunch: {
    flex: 3,
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 15
  },
  brunchText: {
    fontSize: 20,
    fontFamily: 'American Typewriter',
    // fontWeight: 'bold',
    color: 'rgba(46, 204, 113,1.0)'
  },
  uberButton: {
    backgroundColor: 'black',
    width: 200,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginTop: 10,
    padding: 7,
  },
  uberButtonText: {
    color: 'white',
    // fontWeight: 'bold',
    fontFamily: 'American Typewriter'
  },
  separator: {
  color: 'white',
  margin: 5
}
});
