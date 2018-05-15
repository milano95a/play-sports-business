import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import firebase from 'firebase';
import BookingDetail from './BookingDetail';

// make
class BookingList extends Component {
  constructor() {
    super();
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }

  state = { bookings: [] };

  componentWillMount() {
    firebase.database().ref('/bookings/').on('value', (snapshot) => {
      snapshot.forEach((s2) => {
        this.setState({ bookings: [...this.state.bookings, s2.val()] });
        // console.log(this.state.stadiums);
      });
    }, (e) => {
      console.log(e);
    });
  }

  booking = {
    userName: 'Jon Doe',
    phone: '+998909009090',
    date: '02-04-2018',
    from: '7:00',
    to: '9:00'
  };

  renderAlbums() {
    return <BookingDetail booking={this.booking} />;
  }

  render() {
    this.renderAlbums();

    return (
      <ScrollView>
        {this.renderAlbums()}
      </ScrollView>
    );
  }
}

export default BookingList;
