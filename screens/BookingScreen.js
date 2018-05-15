import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, TouchableOpacity, Linking} from 'react-native';
import firebase from 'firebase';
import { List, ListItem, Badge } from 'react-native-elements';
import Colors from '../constants/Colors';

export default class BookingScreen extends React.Component {

  constructor() {
    super();

    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }

  static navigationOptions = {
    title: 'Bookings',
  };

  state = { bookings: [], filter: 'today' };

  componentWillMount() {
    console.log('Booking Screen componentWillMount');
    const user = firebase.auth().currentUser;

    firebase.database().ref('/bookings/').on('value', (snapshot) => {
      snapshot.forEach((s2) => {
        if (user.uid === s2.val().ownerId){
          let found = false;
          let currentlist = this.state.bookings;

          for (let i = 0; i < currentlist.length; i++) {
              if (currentlist[i].bookingId === s2.key) {
                  currentlist[i] = s2.val();
                  found = true;
                  break;
              }
          }

          if (found) {
            this.setState({ bookings: [...currentlist] });
          } else {
            this.setState({ bookings: [...this.state.bookings, s2.val()] });
          }

          // this.setState({ bookings: [...this.state.bookings, s2.val()] });
        }
      });
    }, (e) => {
      console.log(e);
    });
  }

  renderBookingsFilterHeader(){
    if (this.state.filter === 'today') {
      return (
        <View>
          <View style={{ flexDirection: 'row', height: 60, backgroundColor: Colors.red }}>

            <TouchableOpacity
              onPress={() => this.setState({ filter: 'today' })}
              style={styles.buttonStyleOn}>
                <Text style={styles.textStyle}>Today</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({ filter: 'month' })}
              style={styles.buttonStyleOff}>
                <Text style={styles.textStyle}>Month</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({ filter: 'all' })}
              style={styles.buttonStyleOff}>
                <Text style={styles.textStyle}>All</Text>
            </TouchableOpacity>

          </View>
        </View>
      );
    } else if (this.state.filter === 'month'){
      return (
        <View>
          <View style={{ flexDirection: 'row', height: 60, backgroundColor: Colors.red }}>

            <TouchableOpacity
              onPress={() => this.setState({ filter: 'today' })}
              style={styles.buttonStyleOff}>
                <Text style={styles.textStyle}>Today</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({ filter: 'month' })}
              style={styles.buttonStyleOn}>
                <Text style={styles.textStyle}>Month</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({ filter: 'all' })}
              style={styles.buttonStyleOff}>
                <Text style={styles.textStyle}>All</Text>
            </TouchableOpacity>

          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View style={{ flexDirection: 'row', height: 60, backgroundColor: Colors.red }}>

            <TouchableOpacity
              onPress={() => this.setState({ filter: 'today' })}
              style={styles.buttonStyleOff}>
                <Text style={styles.textStyle}>Today</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({ filter: 'month' })}
              style={styles.buttonStyleOff}>
                <Text style={styles.textStyle}>Month</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({ filter: 'all' })}
              style={styles.buttonStyleOn}>
                <Text style={styles.textStyle}>All</Text>
            </TouchableOpacity>

          </View>
        </View>
      );
    }


    // return (
    //   <View>
    //     <View style={{ flexDirection: 'row', height: 60, backgroundColor: '#076BD8' }}>
    //       <TouchableOpacity
    //         onPress={() => this.setState({ })}
    //         style={styles.buttonStyleOff}
    //       >
    //         // <Text style={styles.textStyle}>
    //           Today
    //         </Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         onPress={() => this.setState({ })}
    //         style={styles.buttonStyleOn}
    //       >
    //         <Text style={styles.textStyle}>
    //           Week
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // );
  }

  renderBookingList(){
      return this.state.bookings.map((booking, i) => {
        const time = parseInt(booking.time, 10);

        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth(); //January is 0!
        const year = today.getFullYear();

        const bookingDate = booking.date.split('-');

        if (this.state.filter === 'today'){
          if (day === Number(bookingDate[0]) && month === Number(bookingDate[1]) && year === Number(bookingDate[2])){
            return (
              <ListItem
              chevronColor='white'
              key={i}
              avatarStyle={{backgroundColor: 'white'}}
              title={booking.booker}
              subtitle={
                <View style={styles.subtitleViewContainer}>
                  <View style={{flex: 1}}>
                    <Text style={styles.ratingText}>{`Phone: ${booking.phone}`}</Text>

                    <View style={{flexDirection: 'row'}}>
                    <Badge containerStyle={{ backgroundColor: Colors.blue, marginTop: 5}}>
                    <Text style={styles.ratingTextBold}>{`Venue: ${booking.stadium}`}</Text>
                    </Badge>
                    </View>

                    <Text style={styles.ratingText}>{`Date: ${booking.date}`}</Text>

                    <Text style={styles.ratingText}>{`Time: ${time}:00 - ${time + 1}:00`}</Text>
                  </View>

                  <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        const urlToOpen = `tel:${booking.phone}`;
                        Linking.openURL(urlToOpen);
                      }}
                      style={{
                        borderRadius: 5,
                        flex: 1,
                        marginLeft: 15,
                        padding: 10,
                        backgroundColor: Colors.green,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Text style={styles.textStyle}>Call</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              }
              avatar={require('./../assets/icon.png')}
              component={TouchableHighlight}
              underlayColor="#f7f7f7"
              onPress={() => {
              }}
              />
            );
          }
        } else if (this.state.filter === 'month'){
          if (month === Number(bookingDate[1]) && year === Number(bookingDate[2])){
            return (
              <ListItem
              chevronColor='white'
              key={i}
              avatarStyle={{backgroundColor: 'white'}}
              title={booking.booker}
              subtitle={
                <View style={styles.subtitleViewContainer}>
                  <View style={{flex: 1}}>
                    <Text style={styles.ratingText}>{`Phone: ${booking.phone}`}</Text>

                    <View style={{flexDirection: 'row'}}>
                    <Badge containerStyle={{ backgroundColor: Colors.blue, marginTop: 5}}>
                    <Text style={styles.ratingTextBold}>{`Venue: ${booking.stadium}`}</Text>
                    </Badge>
                    </View>

                    <Text style={styles.ratingText}>{`Date: ${booking.date}`}</Text>

                    <Text style={styles.ratingText}>{`Time: ${time}:00 - ${time + 1}:00`}</Text>
                  </View>

                  <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        const urlToOpen = `tel:${booking.phone}`;
                        Linking.openURL(urlToOpen);
                      }}
                      style={{
                        borderRadius: 5,
                        flex: 1,
                        marginLeft: 15,
                        padding: 10,
                        backgroundColor: Colors.green,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Text style={styles.textStyle}>Call</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              }
              avatar={require('./../assets/icon.png')}
              component={TouchableHighlight}
              underlayColor="#f7f7f7"
              onPress={() => {
              }}
              />
            );
          }
        } else {
          return (
            <ListItem
            chevronColor='white'
            key={i}
            avatarStyle={{backgroundColor: 'white'}}
            title={booking.booker}
            subtitle={
              <View style={styles.subtitleViewContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.ratingText}>{`Phone: ${booking.phone}`}</Text>

                  <View style={{flexDirection: 'row'}}>
                  <Badge containerStyle={{ backgroundColor: Colors.blue, marginTop: 5}}>
                  <Text style={styles.ratingTextBold}>{`Venue: ${booking.stadium}`}</Text>
                  </Badge>
                  </View>

                  <Text style={styles.ratingText}>{`Date: ${booking.date}`}</Text>

                  <Text style={styles.ratingText}>{`Time: ${time}:00 - ${time + 1}:00`}</Text>
                </View>

                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      const urlToOpen = `tel:${booking.phone}`;
                      Linking.openURL(urlToOpen);
                    }}
                    style={{
                      borderRadius: 5,
                      flex: 1,
                      marginLeft: 15,
                      padding: 10,
                      backgroundColor: Colors.green,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Text style={styles.textStyle}>Call</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
            avatar={require('./../assets/icon.png')}
            component={TouchableHighlight}
            underlayColor="#f7f7f7"
            onPress={() => {
            }}
            />
          );
        }
      });
  }

  render() {
    const list = this.state.bookings === undefined
    ? (null)
    : this.renderBookingList();

    return (
      <ScrollView style={styles.container}>
        {this.renderBookingsFilterHeader()}
        <List>{list}</List>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyleOn: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 8,
    borderColor: '#fff',
  },
  buttonStyleOff: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitleViewContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  subtitleView: {
    flexDirection: 'row',
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingTextBold: {
    fontWeight:'bold',
    color: 'white',
  },
  ratingText: {
    paddingTop: 5,
    color: 'grey'
  },
  ratingTextHeader: {
    fontWeight:'bold',
    paddingTop: 5,
    color: 'grey'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
