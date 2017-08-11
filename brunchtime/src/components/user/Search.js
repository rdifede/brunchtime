import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';


export default class Search extends Component {
  constructor(props) {
   super(props);
   this.state = {
     searchTerm: '',
     places: []
    };
 }

 // componentWillReceiveProps(nextProps){
 //   this.getBrunch(nextProps)
 // }
 //
  getBrunch(searchTerm){
    return fetch(`http://localhost:3000/api?address=${searchTerm}`)
  .then((res) => res.json())
  .then((resJson) => {
    this.setState((prevState) => {
      return {
        places: resJson.businesses
      }
    })
  })
    .catch((err) => {
      console.log(err);
    })

  }



  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.headline}>UserName, it's BrunchTime!</Text>
        <View>
          <TextInput
            style={styles.searchForm}
            placeholder="location"
            returnKeyType="go"
            placeholderTextColor="rgba(rgba(127, 140, 141,.6))"
            onChangeText={(searchTerm) => this.setState({searchTerm})}
        value={this.state.searchTerm}
          />
          <TouchableOpacity style={styles.searchButton}
            // onPress={() => this.getBrunch(this.state.searchTerm)}
            onPress={this.getBrunch.bind(this, this.state.searchTerm)}
            >
            <Text style={styles.searchButtonText}>Search!</Text>
          </TouchableOpacity>

          <FlatList
            data={this.state.places}
            style={styles.listContainer}
            keyExtractor={(x, i) => i}
            renderItem={({ item }) =>

            <Text style={styles.placeList}>
              {
                `
              ${item.name}
              ${item.location.address1}
              ${item.location.city}, ${item.location.state}
              Phone: ${item.display_phone}
              Rating: ${item.rating}`
              }
            </Text>
          }
        />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(155,89,182)',
    alignItems: 'center'
  },
  headline: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10
  },
  searchButton: {
    borderRadius: 5,
    width: 80,
    backgroundColor: 'rgba(189, 195, 199,1.0)',
    marginBottom: 5,
    alignItems: 'center'
  },
  searchForm: {
    backgroundColor:'rgba(236, 240, 241,.6)',
    minWidth: 150,
    borderRadius: 10,
    padding: 5,
    margin: 5,

  },
  searchButtonText: {
    color: 'black'
  },
  listContainer: {
    // flex: 1,
    // alignItems: 'center',

  },
  placeList: {
    color: 'white',
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    margin: 0
  }

});
