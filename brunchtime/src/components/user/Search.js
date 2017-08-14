import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button,
  Image,
  Linking
} from 'react-native';


export default class Search extends Component {
  constructor(props) {
   super(props);
   this.state = {
     searchTerm: '',
     places: [],
     name: '',
     image: '',
     address: '',
     phone:'',


    };
 }

//get the brunch places list
  getBrunch(searchTerm){
    return fetch(`http://localhost:3000/api?address=${searchTerm}`)
  .then((res) => res.json())
  .then((resJson) => {
    this.setState((prevState) => {
      return {
        places: resJson.businesses,
        userName: this.props.navigation.state.params.name

      }
    })
  })
    .catch((err) => {
      console.log(err);
    })

  }


//saves a place to favorites
  async savetoFavorites(item) {
    try {
      let response = await fetch('http://localhost:3000/users/favorites', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                favorite:{
                                  name: item.name,
                                  image: item.image_url,
                                  address: item.location.city,
                                  phone: item.display_phone,
                                  user_id: this.props.navigation.state.params.user_id
                                }
                              })
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

//enables the user to search by their current location
            currentLocation(){
                navigator.geolocation.getCurrentPosition(
                                  (position) => {
                                    var searchTerm = JSON.stringify(position);
                                    this.setState({searchTerm});

                                  },
                                  (error) => alert(error.message),
                                  {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
                                );
              }

//generates the uber link to request a ride
    getUber(url){
        Linking.openURL(url)
        }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Mimosas Await!</Text>
        <View>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={this.currentLocation.bind(this)}
            ><Text style={styles.locationButtonText}>Use Current Location</Text></TouchableOpacity>
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
              source={{url: item.image_url}}/>{"\n"}
            </Text>
              <Text style={styles.address}>{"\n"}{item.location.address1}{"\n"}</Text>
              <Text style={styles.address}>{item.location.city},</Text>
              <Text style={styles.address}>{item.location.state}{"\n"}</Text>
              <Text>{item.display_phone}</Text>
            </Text>
            <TouchableOpacity
              style={styles.save}
              onPress={this.savetoFavorites.bind(this, item)}
              ><Text style={styles.saveText}>Fav?</Text></TouchableOpacity>
              <TouchableOpacity
              style={styles.uberButton}
                onPress={() => this.getUber(`https://m.uber.com/ul/?client_id=2DmY-4EzrkSO7O5pQjb_8KT__JCxd4GU&action=setPickup&pickup=my_location&dropoff=${item.location.address1}${item.location.city}${item.location.state}${item.location.zip_code}`)}
                ><Text style={styles.uberButtonText}>Request an Uber!</Text></TouchableOpacity>
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
    alignItems: 'center',

  },
  headline: {
    color: 'rgba(241, 196, 15,1.0)',
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    padding: 5,
    fontFamily: 'SignPainter'
  },
  searchButton: {
    borderRadius: 5,
    width: 80,
    backgroundColor: 'rgba(189, 195, 199,1.0)',
    marginBottom: 5,
    alignItems: 'center',
  },
  searchForm: {
    backgroundColor:'rgba(236, 240, 241,.6)',
    minWidth: 150,
    borderRadius: 10,
    padding: 5,
    margin: 5,

  },
  searchButtonText: {
    color: 'black',
    fontFamily: 'American Typewriter'
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
    fontFamily: 'American Typewriter',
    marginTop: 10
  },

  save: {
    backgroundColor: 'white',
    width: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3
  },
  saveText: {
    fontSize: 12,
    fontFamily: 'American Typewriter'
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 15,
    marginTop: 7,
    marginBottom: 20
  },

  name: {
    fontSize: 20,
    paddingTop: 10,
  },
  address: {
    fontSize: 15,
  },
  separator: {
  color: 'white',
  margin: 5

},
locationButton: {
  borderRadius: 5,
  width: 165,
  backgroundColor: 'rgba(189, 195, 199,1.0)',
  marginBottom: 5,
  marginTop: 5,
  alignItems: 'center'
},
locationButtonText: {
  fontFamily: 'American Typewriter'
},
uberButton: {
  backgroundColor: 'black',
  width: 120,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 5,
  padding: 2
},
uberButtonText: {
  color: 'white',
  fontSize: 12,
  fontFamily: 'American Typewriter'
},

});
