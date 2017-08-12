import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button,
  Image
} from 'react-native';


export default class Search extends Component {
  constructor(props) {
   super(props);
   this.state = {
     searchTerm: '',
     places: []
    };
 }


  getBrunch(searchTerm){
    return fetch(`http://localhost:3000/api?address=${searchTerm}`)
  .then((res) => res.json())
  .then((resJson) => {
    this.setState((prevState) => {
      return {
        places: resJson.businesses,
        favorites: [],
        name: '',
        image: '',
        address: '',
        phone:''
      }
    })
  })
    .catch((err) => {
      console.log(err);
    })

  }

  async savetoFavorites(place) {
    this.setState({
      name: place.name,
      image: place.image_url,
      address: place.location.city,
      phone: place.phone
    })
    try {
      let response = await fetch('http://localhost:3000/users/favorites', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                favorite:{
                                  name: this.state.name,
                                  image: this.state.image,
                                  address: this.state.address,
                                  phone: this.state.phone
                                }
                              })
                            });
                            let res = await response.text();

                            if (response.status >= 200 && response.status < 300) {
                              //if fav is saved, go to profile

                              const {navigate} = this.props.navigation;
                              navigate('Profile');
                              } else {
                                //if fav is not saved, stay on search page
                                let error = res;
                                throw error;
                              }
                            }  catch(errors) {

                            }

                          }



  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.headline}>It's BrunchTime!</Text>
        <View>
          <TextInput
            style={styles.searchForm}
            placeholder="location"
            returnKeyType="done"
            placeholderTextColor="rgba(rgba(127, 140, 141,.6))"
            onChangeText={(searchTerm) => this.setState({searchTerm})}
        value={this.state.searchTerm}
          />
          <TouchableOpacity style={styles.searchButton}
            onPress={this.getBrunch.bind(this, this.state.searchTerm)}
            >
            <Text style={styles.searchButtonText}>Search!</Text>
          </TouchableOpacity>

          <FlatList
            data={this.state.places}
            style={styles.listContainer}
            keyExtractor={(x, i) => i}
            renderItem={({ item }) =>
            <View style={styles.placeList}>
            <Text style={styles.placeText}>
              <Text style={styles.name}>{item.name}
                {"\n"}<Image
                style={styles.image}
              source={{url: item.image_url}}/>
            {"\n"}</Text>
              <Text style={styles.address}>{item.location.address1}{"\n"}</Text>
              <Text style={styles.address}>{item.location.city},</Text>
              <Text style={styles.address}>{item.location.state}{"\n"}</Text>
              <Text>{item.display_phone}{"\n"}</Text>
            </Text>
            <TouchableOpacity
              style={styles.save}
              onPress={this.savetoFavorites.bind(this)}
              ><Text style={styles.saveText}>Fav?</Text></TouchableOpacity>
              <Text style={styles.separator}>_______________________</Text>
            </View>
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
  width: 300,
  height: 300,

  },
  placeList: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',

  },
  placeText: {
    color: 'white',
    textAlign: 'center',
    flex: 4,
    justifyContent: 'center',
  },

  save: {
    backgroundColor: 'white',
    width: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveText: {
    fontSize: 12,
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 15,
    marginTop: 5
  },

  name: {
    fontSize: 20,
    paddingTop: 10,
    marginBottom: 10
  },
  address: {
    fontSize: 15,
  },
  separator: {
  color: 'white',
  margin: 5

   }

});
